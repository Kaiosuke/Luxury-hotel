import jwt from "jsonwebtoken";
import env from "../config/envConfig.js";
import User from "../models/User.js";
import { getDataById } from "../services/getService.js";
import { handleError500 } from "../../utils/helpers/handleStatusCode.js";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const accessToken = token.split(" ")[1];

      jwt.verify(accessToken, env.ACCESS_TOKEN, (err, user) => {
        if (err) {
          return res.status(401).json("Token is not valid!");
        }

        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You're not authenticated!");
    }
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
        return res.status(403).json("You don't have permission!");
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
        return res.status(403).json("You don't have permission!");
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
        return res.status(403).json("You don't have permission!");
      }
    });
  } catch (error) {
    return handleError500(res, error);
  }
};

export { verifyToken, verifyAdmin, verifyAdminAuth, verifyCeo };
