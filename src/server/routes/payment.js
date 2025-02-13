import { Router } from "express";
import { PaymentSchema } from "../../schemas/index.js";
import PaymentController from "../controllers/PaymentController.js";
import { verifyAdmin } from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
const route = Router();

route.get("/", PaymentController.getAll);

route.get("/:id", PaymentController.getById);

route.post(
  "/create",
  verifyAdmin,
  validateBody(PaymentSchema),
  PaymentController.create
);

route.patch("/update/:id", verifyAdmin, PaymentController.update);

route.delete("/delete/:id", verifyAdmin, PaymentController.delete);

route.patch("/restore/:id", verifyAdmin, PaymentController.restore);

route.delete("/delete/force/:id", verifyAdmin, PaymentController.forceDelete);

export default route;
