import { Router } from "express";
import PaymentController from "../controllers/PaymentController.js";
const route = Router();

route.post("/", PaymentController.payment);
route.post("/callback", PaymentController.callback);
route.post("/order-status/:id", PaymentController.orderStatus);

export default route;
