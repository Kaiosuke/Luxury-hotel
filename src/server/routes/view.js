import { Router } from "express";
import ViewController from "../controllers/ViewController.js";
import { verifyAdmin } from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { ViewSchema } from "../../schemas/index.js";
const route = Router();

route.get("/", ViewController.getAll);

route.get("/:id", ViewController.getById);

route.post(
  "/create",
  verifyAdmin,
  validateBody(ViewSchema),
  ViewController.create
);

route.patch("/update/:id", verifyAdmin, ViewController.update);

route.delete("/delete/:id", verifyAdmin, ViewController.delete);

route.patch("/restore/:id", verifyAdmin, ViewController.restore);

route.delete("/delete/force/:id", verifyAdmin, ViewController.forceDelete);

export default route;
