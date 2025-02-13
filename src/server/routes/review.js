import { Router } from "express";
import { ReviewSchema } from "../../schemas/index.js";
import ReviewController from "../controllers/ReviewController.js";
import { verifyAdmin } from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
const route = Router();

route.get("/", ReviewController.getAll);

route.get("/:id", ReviewController.getById);

route.post(
  "/create",
  verifyAdmin,
  validateBody(ReviewSchema),
  ReviewController.create
);

route.patch("/update/:id", verifyAdmin, ReviewController.update);

route.delete("/delete/:id", verifyAdmin, ReviewController.delete);

route.patch("/restore/:id", verifyAdmin, ReviewController.restore);

route.delete("/delete/force/:id", verifyAdmin, ReviewController.forceDelete);

export default route;
