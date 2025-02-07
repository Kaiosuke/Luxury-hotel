import { Router } from "express";
import { OptionSchema } from "../../schemas/index.js";
import OptionController from "../controllers/OptionController.js";
import { verifyAdmin } from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
const route = Router();

route.get("/", OptionController.getAll);

route.get("/:id", OptionController.getById);

route.post(
  "/create",
  verifyAdmin,
  validateBody(OptionSchema),
  OptionController.create
);

route.patch("/update/:id", verifyAdmin, OptionController.update);

route.delete("/delete/:id", verifyAdmin, OptionController.delete);

route.patch("/restore/:id", verifyAdmin, OptionController.restore);

route.delete("/delete/force/:id", verifyAdmin, OptionController.forceDelete);

export default route;
