import { Router } from "express";
import { sendInfo } from "../controllers/sendMailController.js";
const route = Router();

route.post("/info", sendInfo.sendInfo);

export default route;
