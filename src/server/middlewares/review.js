import User from "../models/User.js";
import Review from "../models/Review.js";
import { verifyToken } from "./auth.js";
import { getData, getDataById } from "../services/getService.js";
import {
  handleError403,
  handleError500,
} from "../../utils/helpers/handleStatusCode.js";

const verifyReviewAdminAndUser = async (req, res, next) => {
  try {
    await verifyToken(req, res, async () => {
      const user = await getDataById(User, req.user.user);

      const finReview = await getDataById(Review, req.params.id);

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
      return handleError403(res);
    });
  } catch (error) {
    return handleError500(res, error);
  }
};

export { verifyReviewAdminAndUser };
