import { Router } from "express";
import { TypeBedSchema } from "../../schemas/index.js";
import TypeBedController from "../controllers/TypeBedController.js";
import { verifyAdmin } from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
const route = Router();

route.get("/", TypeBedController.getAll);

route.get("/:id", TypeBedController.getById);

route.post(
  "/create",
  verifyAdmin,
  validateBody(TypeBedSchema),
  TypeBedController.create
);

route.patch("/update/:id", verifyAdmin, TypeBedController.update);

route.delete("/delete/:id", verifyAdmin, TypeBedController.delete);

route.patch("/restore/:id", verifyAdmin, TypeBedController.restore);

route.delete("/delete/force/:id", verifyAdmin, TypeBedController.forceDelete);

export default route;
