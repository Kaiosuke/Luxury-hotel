import jwt from "jsonwebtoken";
import env from "../config/envConfig.js";
import User from "../models/User.js";
import { getDataById } from "../services/getService.js";

const verifyToken = async (req, res, next) => {
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
};

const verifyAdmin = (req, res, next) => {
  return verifyToken(req, res, async () => {
    const user = await getDataById(User, req.user.user);

    if (user.role === "admin" || user.role === "ceo") {
      next();
    } else {
      return res.status(403).json("You don't have permission!");
    }
  });
};

const verifyCeo = (req, res, next) => {
  return verifyToken(req, res, async () => {
    const user = await getDataById(User, req.user.user);
    if (user.role === "ceo") {
      next();
    } else {
      return res.status(403).json("You don't have permission!");
    }
  });
};

export { verifyToken, verifyAdmin, verifyCeo };
