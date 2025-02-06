import userRoute from "./user.js";
import roomTypeRoute from "./roomType.js";
import authRoute from "./auth.js";
import viewRoute from "./view.js";
import typeBedRoute from "./typeBed.js";
import categoryRoomRoute from "./CategoryRoom.js";

const routes = (app) => {
  app.use("/auth", authRoute);
  app.use("/users", userRoute);
  app.use("/views", viewRoute);
  app.use("/type-beds", typeBedRoute);
  app.use("/category-rooms", categoryRoomRoute);
  app.use("/room-types", roomTypeRoute);
};

export default routes;
