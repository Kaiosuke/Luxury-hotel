import { Router } from "express";
import UserController from "../controllers/UserController.js";
import {
  verifyToken,
  verifyAdmin,
  verifyAdminAuth,
} from "../middlewares/auth.js";
const route = Router();

route.get("/", UserController.getAll);
route.get("/:id", UserController.getById);
route.patch("/update/:id", verifyAdmin, UserController.update);

route.delete("/delete/:id", verifyAdminAuth, UserController.delete);

route.patch("/restore/:id", verifyAdminAuth, UserController.restore);

route.delete("/delete/force/:id", verifyAdminAuth, UserController.forceDelete);

export default route;
