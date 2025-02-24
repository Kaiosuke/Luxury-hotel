import User from "../models/User.js";
import Review from "../models/Review.js";
import { verifyToken } from "./auth.js";
import { getData, getDataById } from "../services/getService.js";

const verifyReviewAdminAndUser = async (req, res, next) => {
  try {
    await verifyToken(req, res, async () => {
      const user = await getDataById(User, req.user.user);

      const finReview = await getData(Review, "userId", user._id);

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      if (!finReview) {
        return res.status(404).json({ message: "Comment not found!" });
      }

      if (user.role === "admin" || user.role === "ceo") {
        return next();
      }

      if (
        user.role === "user" &&
        finReview.userId.toString() === user._id.toString()
      ) {
        return next();
      }
    });
  } catch (error) {
    return handleError500(res, error);
  }
};

export { verifyReviewAdminAndUser };
