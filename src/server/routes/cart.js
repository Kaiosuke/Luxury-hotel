import { Router } from "express";
import { CartSchema } from "../../schemas/index.js";
import CartController from "../controllers/CartController.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { verifyCartAdminAndUser } from "../middlewares/cart.js";
const route = Router();

route.get("/", CartController.getAll);
route.get("/deleted", CartController.getAllDeleted);
route.get("/user/:id", CartController.getAllForUser);
route.get("/:id", CartController.getById);

route.post(
  "/create",
  verifyToken,
  validateBody(CartSchema),
  CartController.create
);

route.patch("/update/:id", verifyCartAdminAndUser, CartController.update);

route.delete("/delete/:id", verifyAdmin, CartController.delete);

route.patch("/restore/:id", verifyAdmin, CartController.restore);

route.delete("/delete/force/:id", verifyAdmin, CartController.forceDelete);
route.delete("/user/delete/force/:id", verifyToken, CartController.userDelete);

export default route;
