import userRouter from "./user.js";
import roomTypeRouter from "./roomType.js";

const routes = (app) => {
  app.use("/users", userRouter);
  app.use("/room-types", roomTypeRouter);
};

export default routes;
