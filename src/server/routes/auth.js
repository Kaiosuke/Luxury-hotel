import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import { validateBody } from "../middlewares/validateBody.js";
import { LoginSchema, RegisterSchema } from "../../schemas/index.js";

const route = Router();

route.post("/register", validateBody(RegisterSchema), AuthController.register);

route.post("/login", validateBody(LoginSchema), AuthController.login);
route.post("/logout", AuthController.logout);

route.post("/refresh-token", AuthController.refreshToken);

route.post("/change-password/:id", AuthController.changePassword);
route.post("/forgot-password", AuthController.forgotPassword);
route.post("/reset-password/:token", AuthController.resetPassword);

export default route;
