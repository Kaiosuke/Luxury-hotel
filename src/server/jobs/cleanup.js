import cron from "node-cron";
import Cart from "../models/Cart.js";
import Option from "../models/Option.js";
import View from "../models/View.js";
import CategoryRoom from "../models/CategoryRoom.js";
import Review from "../models/Review.js";
import Food from "../models/Food.js";
import Room from "../models/Room.js";
import RoomType from "../models/RoomType.js";
import TypeBed from "../models/TypeBed.js";
import User from "../models/User.js";

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

const cleanupDeleted = () => {
  cron.schedule("*/1440 * * * *", async () => {
    const expiredTime = new Date(Date.now() - 60 * 24 * 30 * 60 * 1000);

    await Cart.deleteMany({
      deleted: true,
      deletedAt: { $lt: expiredTime },
    });

    await CategoryRoom.deleteMany({
      deleted: true,
      deletedAt: { $lt: expiredTime },
    });
    await Food.deleteMany({
      deleted: true,
      deletedAt: { $lt: expiredTime },
    });
    await Option.deleteMany({
      deleted: true,
      deletedAt: { $lt: expiredTime },
    });
    await Review.deleteMany({
      deleted: true,
      deletedAt: { $lt: expiredTime },
    });
    await Room.deleteMany({
      deleted: true,
      deletedAt: { $lt: expiredTime },
    });
    await RoomType.deleteMany({
      deleted: true,
      deletedAt: { $lt: expiredTime },
    });
    await TypeBed.deleteMany({
      deleted: true,
      deletedAt: { $lt: expiredTime },
    });
    await User.deleteMany({
      deleted: true,
      deletedAt: { $lt: expiredTime },
    });
    await View.deleteMany({
      deleted: true,
      deletedAt: { $lt: expiredTime },
    });
    console.log("Expired deleted.");
  });
};

export { cleanupCart, cleanupDeleted };
