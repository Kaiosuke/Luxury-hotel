import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { verifyAdmin } from "../middlewares/auth.js";
const route = Router();

route.get("/", UserController.getAll);
route.get("/:id", UserController.getById);
route.patch("/update/:id", verifyAdmin, UserController.update);

route.delete("/delete/:id", verifyAdmin, UserController.delete);

route.patch("/restore/:id", verifyAdmin, UserController.restore);

route.delete("/delete/force/:id", verifyAdmin, UserController.forceDelete);

export default route;
