import { Router } from "express";
import { CartSchema } from "../../schemas/index.js";
import CartController from "../controllers/CartController.js";
import { verifyAdmin } from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
const route = Router();

route.get("/", CartController.getAll);
route.get("/:id", CartController.getAllForUser);
route.get("/deleted", CartController.getAllDeleted);
route.get("/:id", CartController.getById);

route.post(
  "/create",
  verifyAdmin,
  validateBody(CartSchema),
  CartController.create
);

route.patch("/update/:id", verifyAdmin, CartController.update);

route.delete("/delete/:id", verifyAdmin, CartController.delete);

route.patch("/restore/:id", verifyAdmin, CartController.restore);

route.delete("/delete/force/:id", verifyAdmin, CartController.forceDelete);

export default route;
