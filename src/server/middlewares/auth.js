import jwt from "jsonwebtoken";
import env from "../config/envConfig.js";
import User from "../models/User.js";
import { getDataById } from "../services/getService.js";
import {
  handleError403,
  handleError500,
} from "../../utils/helpers/handleStatusCode.js";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "You're not authenticated!" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        console.log("JWT Verify Error:", err);
        return res.status(401).json({ message: "Token is not valid!" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return handleError500(res, error);
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    await verifyToken(req, res, async () => {
      const user = await getDataById(User, req.user.user);
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      if (user.role === "admin" || user.role === "ceo") {
        next();
      } else {
        return handleError403(res);
      }
    });
  } catch (error) {
    return handleError500(res, error);
  }
};

const verifyAdminAuth = async (req, res, next) => {
  try {
    await verifyToken(req, res, async () => {
      const user = await getDataById(User, req.user.user);

      const targetUser = await User.findOne({ _id: req.params.id }, null, {
        withDeleted: true,
      });

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      if (!targetUser) {
        return res.status(404).json({ message: "User not found!" });
      }

      if (user.role === "ceo") {
        return next();
      }

      if (user.role === "admin" && targetUser.role === "user") {
        return next();
      }

      if (
        user.role === "admin" &&
        (targetUser.role === "admin" || targetUser.role === "ceo")
      ) {
        return handleError403(res);
      }
    });
  } catch (error) {
    return handleError500(res, error);
  }
};

const verifyCeo = async (req, res, next) => {
  try {
    await verifyToken(req, res, async () => {
      const user = await getDataById(User, req.user.user);

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      if (user.role === "ceo") {
        next();
      } else {
        return handleError403(res);
      }
    });
  } catch (error) {
    return handleError500(res, error);
  }
};

export { verifyToken, verifyAdmin, verifyAdminAuth, verifyCeo };
