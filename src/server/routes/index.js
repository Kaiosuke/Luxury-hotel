import userRoute from "./user.js";
import roomTypeRoute from "./roomType.js";
import authRoute from "./auth.js";
import viewRoute from "./view.js";
import typeBedRoute from "./typeBed.js";
import categoryRoomRoute from "./categoryRoom.js";
import roomRouter from "./room.js";
import cartRouter from "./cart.js";
import foodRoute from "./food.js";
import optionRoute from "./option.js";
import reviewRoute from "./review.js";
import paymentRoute from "./payment.js";

const routes = (app) => {
  app.use("/auth", authRoute);
  app.use("/users", userRoute);
  app.use("/views", viewRoute);
  app.use("/type-beds", typeBedRoute);
  app.use("/category-rooms", categoryRoomRoute);
  app.use("/rooms", roomRouter);
  app.use("/carts", cartRouter);
  app.use("/room-types", roomTypeRoute);
  app.use("/foods", foodRoute);
  app.use("/options", optionRoute);
  app.use("/reviews", reviewRoute);
  app.use("/payments", paymentRoute);
};

export default routes;
