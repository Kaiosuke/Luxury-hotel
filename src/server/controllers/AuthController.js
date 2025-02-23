import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../config/envConfig.js";

import {
  handleError401,
  handleError404,
  handleError409,
  handleError500,
  handleSuccess200,
} from "../../utils/helpers/handleStatusCode.js";

import { createData } from "../services/postService.js";
import { getData } from "../services/getService.js";

import User from "../models/User.js";

let refreshTokens = [];

const AuthController = {
  register: async (req, res) => {
    try {
      const email = await getData(User, "email", req.body.email);

      if (email) {
        return handleError409(res, "Email already exists!");
      }

      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = await createData(User, { ...req.body, password: hash }, [
        { carts: "title" },
        { reviews: "title" },
        { payments: "title" },
      ]);

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
      { expiresIn: "20s" }
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
        return handleError401(res, "Invalid password");
      }

      const accessToken = AuthController.generateAccessToken(findUser);

      const refreshToken = AuthController.generateRefreshToken(findUser);

      refreshTokens.push(refreshToken);

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

    if (!refreshTokens.includes(refreshToken)) {
      return res.status(401).json("Refresh Token is not valid!");
    }
    jwt.verify(refreshToken, env.REFRESH_TOKEN, async (err, user) => {
      if (err) {
        return res.status(401).json(err);
      }
      const newUser = await User.findById(user.user);

      const newAccessToken = AuthController.generateAccessToken(newUser);
      const newRefreshToken = AuthController.generateRefreshToken(newUser);

      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      refreshTokens.push(newRefreshToken);

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
      res.clearCookie("refreshToken");
      refreshTokens = refreshTokens.filter(
        (token) => token !== req.cookies.refreshToken
      );
      return handleSuccess200(res);
    } catch (error) {
      return handleError500(res, error);
    }
  },
};

export default AuthController;
