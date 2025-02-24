import { Router } from "express";
import { ReviewSchema } from "../../schemas/index.js";
import ReviewController from "../controllers/ReviewController.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.js";
import { verifyReviewAdminAndUser } from "../middlewares/review.js";
import { validateBody } from "../middlewares/validateBody.js";
const route = Router();

route.get("/", ReviewController.getAll);
route.get("/room-type/:id", ReviewController.roomTypeGetAll);
route.get("/deleted", ReviewController.getAllDeleted);
route.get("/:id", ReviewController.getById);

route.post(
  "/create",
  verifyToken,
  validateBody(ReviewSchema),
  ReviewController.create
);

route.patch("/update/:id", verifyReviewAdminAndUser, ReviewController.update);

route.delete("/delete/:id", verifyReviewAdminAndUser, ReviewController.delete);

route.patch("/restore/:id", verifyAdmin, ReviewController.restore);

route.delete("/delete/force/:id", verifyAdmin, ReviewController.forceDelete);

export default route;
