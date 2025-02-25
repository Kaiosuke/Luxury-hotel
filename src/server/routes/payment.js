import { Router } from "express";
import PaymentController from "../controllers/PaymentController.js";
const route = Router();

route.post("/callback/:id", PaymentController.callback);
route.post("/:id", PaymentController.payment);
route.post("/order-status/:id", PaymentController.orderStatus);

export default route;
