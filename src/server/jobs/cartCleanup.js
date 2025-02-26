import cron from "node-cron";
import Cart from "../models/Cart.js";

const cleanupCart = () => {
  cron.schedule("*/5 * * * *", async () => {
    const expiredTime = new Date(Date.now() - 15 * 60 * 1000);
    await Cart.deleteMany({
      status: "pending",
      createdAt: { $lt: expiredTime },
    });
    console.log("Expired cart deleted.");
  });
};

export default cleanupCart;
