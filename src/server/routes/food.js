import { Router } from "express";
import FoodController from "../controllers/FoodController.js";
import { verifyAdmin } from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { FoodSchema } from "../../schemas/index.js";
const route = Router();

route.get("/", FoodController.getAll);

route.get("/:id", FoodController.getById);

route.post(
  "/create",
  verifyAdmin,
  validateBody(FoodSchema),
  FoodController.create
);

route.patch("/update/:id", verifyAdmin, FoodController.update);

route.delete("/delete/:id", verifyAdmin, FoodController.delete);

route.patch("/restore/:id", verifyAdmin, FoodController.restore);

route.delete("/delete/force/:id", verifyAdmin, FoodController.forceDelete);

export default route;
