import { Router } from "express";
import { RoomTypesSchema } from "../../schemas/index.js";
import RoomTypeController from "../controllers/RoomTypeController.js";
import { verifyAdmin } from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
const route = Router();

route.get("/", RoomTypeController.getAll);

route.get("/:id", RoomTypeController.getById);

route.post(
  "/create",
  verifyAdmin,
  validateBody(RoomTypesSchema),
  RoomTypeController.create
);

route.patch("/update/:id", verifyAdmin, RoomTypeController.update);

route.delete("/delete/:id", verifyAdmin, RoomTypeController.delete);

route.patch("/restore/:id", verifyAdmin, RoomTypeController.restore);

route.delete("/delete/force/:id", verifyAdmin, RoomTypeController.forceDelete);

export default route;
