import { Router } from "express";
import { CategoryRoomSchema } from "../../schemas/index.js";
import CategoryRoomController from "../controllers/CategoryRoomController.js";
import { verifyAdmin } from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
const route = Router();

route.get("/", CategoryRoomController.getAll);
route.get("/deleted", CategoryRoomController.getAllDeleted);
route.get("/:id", CategoryRoomController.getById);

route.post(
  "/create",
  verifyAdmin,
  validateBody(CategoryRoomSchema),
  CategoryRoomController.create
);

route.patch("/update/:id", verifyAdmin, CategoryRoomController.update);

route.delete("/delete/:id", verifyAdmin, CategoryRoomController.delete);

route.patch("/restore/:id", verifyAdmin, CategoryRoomController.restore);

route.delete(
  "/delete/force/:id",
  verifyAdmin,
  CategoryRoomController.forceDelete
);

export default route;
