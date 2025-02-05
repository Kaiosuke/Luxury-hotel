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

import { create } from "../services/postService.js";

import User from "../models/User.js";
import { get } from "../services/getService.js";

const refreshTokens = [];

const AuthController = {
  register: async (req, res) => {
    try {
      const email = await get(User, req.body.email);

      if (email) {
        return handleError409(res, "Email already exists!");
      }

      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = await create(User, { ...req.body, password: hash });

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
      { expiresIn: "1d" }
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
      const user = await get(User, req.body.email);

      if (!user) {
        return handleError404(res);
      }

      const isValidPassword = bcrypt.compare(req.body.password, user.password);

      if (!isValidPassword) {
        return handleError401(res, "Invalid password");
      }

      const accessToken = AuthController.generateAccessToken(user);

      const refreshToken = AuthController.generateRefreshToken(user);

      refreshTokens.push(refreshToken);

      res.cookies("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      const { password, ...others } = user._doc;

      return handleSuccess200(res, { others, accessToken });
    } catch (error) {
      return handleError500(res, error);
    }
  },

  refreshToken: () => {},
};

export default AuthController;
