import { Router } from "express";
import RoomType from "../models/RoomType.js";
const route = Router();

route.get("/", async (req, res) => {
  try {
    const data = await RoomType.find({});
    return res.status(200).send(data);
  } catch (error) {
    return res.send(error);
  }
});

export default route;
