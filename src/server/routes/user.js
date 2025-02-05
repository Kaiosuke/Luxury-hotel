import { Router } from "express";
import UserController from "../controllers/UserController.js";
const route = Router();

route.get("", UserController.getAll);
route.get("/:id", UserController.getById);

export default route;
