import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../config/envConfig.js";
import redis from "../config/redisClient.js";

import {
  handleError401,
  handleError404,
  handleError404WithData,
  handleError409,
  handleError500,
  handleSuccess200,
} from "../../utils/helpers/handleStatusCode.js";

import { createData } from "../services/postService.js";
import { getData, getDataById } from "../services/getService.js";

import User from "../models/User.js";
import { sendResetPassword } from "./sendMailController.js";

const AuthController = {
  register: async (req, res) => {
    try {
      const email = await getData(User, "email", req.body.email);

      if (email) {
        return handleError409(res, "Email already exists!");
      }

      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = await createData(User, { ...req.body, password: hash });

      const { password, ...others } = newUser._doc;

      return handleSuccess200(res, others);
    } catch (error) {
      handleError500(res, error);
    }
  },

  generateAccessToken: (user) => {
    return jwt.sign(
      {
        user: user._id,
      },
      env.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        user: user._id,
      },
      env.REFRESH_TOKEN,

      { expiresIn: "365d" }
    );
  },

  login: async (req, res) => {
    try {
      const findUser = await getData(User, "email", req.body.email);

      if (!findUser) {
        return handleError404(res);
      }
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        findUser.password
      );

      if (!isValidPassword) {
        return handleError401(res, "Invalid Password");
      }

      const accessToken = AuthController.generateAccessToken(findUser);
      const refreshToken = AuthController.generateRefreshToken(findUser);

      await redis.set(
        findUser._id.toString(),
        refreshToken,
        "EX",
        365 * 24 * 60 * 60
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      const { password, ...user } = findUser._doc;
      return handleSuccess200(res, { ...user, accessToken });
    } catch (error) {
      return handleError500(res, error);
    }
  },

  refreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const userId = await redis.keys("*");
    let userKey = null;
    for (let id of userId) {
      const storedToken = await redis.get(id);
      if (storedToken === refreshToken) {
        userKey = id;
        break;
      }
    }
    if (!userKey) {
      return res.status(403).json("Refresh Token is not valid!");
    }
    jwt.verify(refreshToken, env.REFRESH_TOKEN, async (err, user) => {
      if (err) {
        return res.status(401).json(err);
      }
      const newUser = await User.findById(user.user);

      const newAccessToken = AuthController.generateAccessToken(newUser);
      const newRefreshToken = AuthController.generateRefreshToken(newUser);

      await redis.del(userKey);
      await redis.set(userKey, newRefreshToken, "EX", 365 * 24 * 60 * 60);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      return res.status(200).json({ newAccessToken });
    });
    if (!refreshToken) {
      return res.status(401).json("You're not authenticated");
    }
  },

  logout: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return handleError401(res, "You're not authenticated");
      }

      const userId = await redis.keys("*");
      for (let id of userId) {
        const storedToken = await redis.get(id);
        if (storedToken === refreshToken) {
          await redis.del(id);
          break;
        }
      }

      res.clearCookie("refreshToken");
      return handleSuccess200(res, "Logged out successfully");
    } catch (error) {
      return handleError500(res, error);
    }
  },

  changePassword: async (req, res) => {
    try {
      const { id } = req.params;
      const { password, newPassword } = req.body;

      const user = await getDataById(User, id);

      if (!user) {
        return handleError404WithData(res, "User");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return handleError401(res, "Invalid password");
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);

      user.password = hash;

      await user.save();
      return res.status(200).json({ message: "Change password success" });
    } catch (error) {
      return handleError500(res, error);
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await getData(User, "email", email);
      if (!user) {
        return handleError404WithData(res, "User!");
      }

      const token = jwt.sign({ id: user._id }, env.ACCESS_TOKEN, {
        expiresIn: "15m",
      });

      user.resetToken = token;
      user.resetTokenExpire = Date.now() + 15 * 60 * 1000;

      await user.save();

      await sendResetPassword(email, token);
      return res
        .status(200)
        .json({ message: "Password reset code sent to email" });
    } catch (error) {
      return handleError500(res, error);
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;

      const decode = jwt.verify(token, env.ACCESS_TOKEN);

      const user = await getDataById(User, decode.id);

      if (
        !user ||
        user.resetToken !== token ||
        user.resetTokenExpire.getTime() < Date.now()
      ) {
        return res.status(400).json({ message: "Token is invalid or expired" });
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);

      user.password = hash;
      user.resetToken = null;
      user.resetTokenExpire = null;
      await user.save();

      return res
        .status(200)
        .json({ message: "Password was reset successfully" });
    } catch (error) {
      return handleError500(res, error);
    }
  },
};

export default AuthController;
