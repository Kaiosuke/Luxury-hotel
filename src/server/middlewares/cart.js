import User from "../models/User.js";
import Cart from "../models/Cart.js";
import { verifyToken } from "./auth.js";
import { getData, getDataById } from "../services/getService.js";

const verifyCartAdminAndUser = async (req, res, next) => {
  try {
    await verifyToken(req, res, async () => {
      const user = await getDataById(User, req.user.user);

      const findCart = await getData(Cart, "userId", user._id);

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      if (!findCart) {
        return res.status(404).json({ message: "Cart not found!" });
      }

      if (user.role === "admin") {
        return next();
      }

      if (
        user.role === "user" &&
        findCart.userId.toString() === user._id.toString()
      ) {
        return next();
      }
    });
  } catch (error) {
    return handleError500(res, error);
  }
};

export { verifyCartAdminAndUser };
