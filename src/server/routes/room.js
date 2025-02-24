import { Router } from "express";
import { RoomSchema } from "../../schemas/index.js";
import RoomController from "../controllers/RoomController.js";
import { verifyAdmin } from "../middlewares/auth.js";
import { verifyCartAdminAndUser } from "../middlewares/cart.js";
import { validateBody } from "../middlewares/validateBody.js";
const route = Router();

route.get("/", RoomController.getAll);
route.get("/deleted", RoomController.getAllDeleted);
route.get("/:id", RoomController.getById);

route.post(
  "/create",
  verifyAdmin,
  validateBody(RoomSchema),
  RoomController.create
);

route.patch("/update/:id", verifyCartAdminAndUser, RoomController.update);

route.delete("/delete/:id", verifyAdmin, RoomController.delete);

route.patch("/restore/:id", verifyAdmin, RoomController.restore);

route.delete("/delete/force/:id", verifyAdmin, RoomController.forceDelete);

export default route;
