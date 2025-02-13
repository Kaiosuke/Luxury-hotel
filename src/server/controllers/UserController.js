import {
  handleError404,
  handleError409,
  handleError500,
  handleSuccess200,
} from "../../utils/helpers/handleStatusCode.js";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Payment from "../models/Payment.js";
import Review from "../models/Review.js";

import { getAllData, getData, getDataById } from "../services/getService.js";
import {
  findByIdAndUpdateData,
  restoreData,
} from "../services/patchService.js";
import { deleteData, forceDeleteData } from "../services/deleteService.js";

const UserController = {
  getAll: async (req, res) => {
    try {
      const users = await getAllData(User, [
        { carts: "title" },
        { reviews: "title" },
        { payments: "title" },
      ]);
      if (!users.length) {
        return handleError404(res);
      }
      return handleSuccess200(res, users);
    } catch (error) {
      return handleError500(res, req);
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await getDataById(User, id, [
        { carts: "title" },
        { reviews: "title" },
        { payments: "title" },
      ]);
      if (!user) {
        return handleError404(res);
      }
      return handleSuccess200(res, user);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const findUser = await getDataById(User, id, [
        { carts: "title" },
        { reviews: "title" },
        { payments: "title" },
      ]);
      if (!findUser) {
        return handleError404(res);
      }
      const updateUser = await findByIdAndUpdateData(User, id, req.body);

      const { password, ...others } = updateUser._doc;

      return handleSuccess200(res, others);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const findUser = await getDataById(User, id);

      if (!findUser) {
        return handleError404(res);
      }

      if (findUser.role === "ceo") {
        return res.status(403).json("You don't have permission!");
      }

      const findCart = await getData(Cart, "userId", findUser._id);
      if (findCart) {
        return handleError409(
          res,
          "Data conflict, cannot be deleted due to other constraints"
        );
      }

      const findPayment = await getData(Payment, "userId", findUser._id);
      if (findPayment) {
        return handleError409(
          res,
          "Data conflict, cannot be deleted due to other constraints"
        );
      }

      const findReview = await getData(Review, "userId", findUser._id);
      if (findReview) {
        return handleError409(
          res,
          "Data conflict, cannot be deleted due to other constraints"
        );
      }

      await deleteData(User, id);

      return handleSuccess200(res, id);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  restore: async (req, res) => {
    try {
      const { id } = req.params;
      const restoreUser = await restoreData(User, id);

      if (!restoreUser.matchedCount) {
        return handleError404(res);
      }

      const findUser = await getDataById(User, id);

      const { password, ...others } = findUser._doc;

      return handleSuccess200(res, others);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  forceDelete: async (req, res) => {
    const { id } = req.params;

    const findUser = await User.findOne({ _id: id, deleted: true }, null, {
      withDeleted: true,
    });

    if (!findUser) {
      return handleError404(res);
    }
    await forceDeleteData(User, id);

    return handleSuccess200(res, findUser);
  },
};

export default UserController;
