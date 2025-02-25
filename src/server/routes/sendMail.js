import { Router } from "express";
import sendMailController from "../controllers/sendMailController.js";
const route = Router();

route.post("/info", sendMailController.sendInfo);

export default route;
