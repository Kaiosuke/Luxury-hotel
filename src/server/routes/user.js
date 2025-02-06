import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.js";
const route = Router();

route.get("/", verifyAdmin, UserController.getAll);
route.get("/:id", UserController.getById);

export default route;
