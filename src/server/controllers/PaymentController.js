import {
  handleError404,
  handleError404WithData,
  handleError500,
  handleSuccess200,
  handleSuccess201,
} from "../../utils/helpers/handleStatusCode.js";
import {
  getAllData,
  getAllDataDeleted,
  getDataById,
} from "../services/getService.js";
import env from "../config/envConfig.js";
import Payment from "../models/Payment.js";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import { createData } from "../services/postService.js";
import {
  findByIdAndPullData,
  findByIdAndPushData,
  findByIdAndUpdateData,
  restoreData,
} from "../services/patchService.js";
import { deleteData, forceDeleteData } from "../services/deleteService.js";

const PaymentController = {
  getAll: async (req, res) => {
    try {
      const search = req.query.search || "";
      const payments = await getAllData(
        Payment,
        [{ userId: "username" }, { cartId: "" }],
        search.trim()
      );

      return handleSuccess200(res, payments);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  getAllDeleted: async (req, res) => {
    try {
      const search = req.query.search || "";

      const payments = await getAllDataDeleted(
        Option,
        [{ userId: "username" }, { cartId: "" }],
        search.trim()
      );

      return handleSuccess200(res, payments);
    } catch (error) {
      return handleError500(res, req);
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const payment = await getDataById(Payment, id, [
        { userId: "username" },
        { carr: "" },
      ]);
      if (!payment) {
        return handleError404(res);
      }
      return handleSuccess200(res, payment);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const { userId, cartId } = req.body;

      const findUser = await getDataById(User, userId);
      if (!findUser) {
        return handleError404WithData(res, "user");
      }

      const findCart = await getDataById(Cart, cartId);
      if (!findCart) {
        return handleError404WithData(res, "cart");
      }

      const newPayment = await createData(Payment, req.body, [
        { userId: "username" },
        { cartId: "" },
      ]);

      await findByIdAndPushData(User, userId, "payments", newPayment._id);
      await findByIdAndPushData(Cart, cartId, "payments", newPayment._id);

      return handleSuccess201(res, newPayment);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { userId, cartId } = req.body;

      const findPayment = await getDataById(Payment, id);
      if (!findPayment) {
        return handleError404(res);
      }

      const findUser = await getDataById(User, userId);
      if (!findUser) {
        return handleError404WithData(res, "user");
      }

      const findCart = await getDataById(Cart, cartId);
      if (!findCart) {
        return handleError404WithData(res, "cart");
      }

      const updatePayment = await findByIdAndUpdateData(Payment, id, req.body, [
        { userId: "username" },
        { cartId: "" },
      ]);

      if (findPayment.userId !== userId) {
        await findByIdAndPullData(
          User,
          findPayment.userId,
          "payments",
          updatePayment._id
        );
        await findByIdAndPushData(User, userId, "payments", updatePayment._id);
      }

      if (findPayment.cartId !== cartId) {
        await findByIdAndPullData(
          Cart,
          findPayment.cartId,
          "payments",
          updatePayment._id
        );
        await findByIdAndPushData(Cart, cartId, "payments", updatePayment._id);
      }

      await handleSuccess201(res, updatePayment);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const findPayment = await getDataById(Payment, id);
      if (!findPayment) {
        return handleError404(res);
      }
      await deleteData(Payment, id);
      await findByIdAndPullData(
        User,
        findPayment.userId,
        "payments",
        findPayment._id
      );

      await findByIdAndPullData(
        Cart,
        findPayment.cartId,
        "payments",
        findPayment._id
      );
      return handleSuccess200(res, id);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  restore: async (req, res) => {
    try {
      const { id } = req.params;

      const restorePayment = await restoreData(Payment, id);

      if (!restorePayment.matchedCount) {
        return handleError404(res);
      }

      const findPayment = await getDataById(Payment, id, [
        { userId: "username" },
        { cartId: "" },
      ]);

      const findUser = await findByIdAndPushData(
        User,
        findPayment.userId,
        "payments",
        findPayment._id
      );

      if (!findUser) {
        findPayment.userId = env.DEFAULT_USER;
        await findByIdAndPushData(
          User,
          env.DEFAULT_USER,
          "payments",
          findPayment._id
        );
      }

      const findCart = await findByIdAndPushData(
        Cart,
        findPayment.cartId,
        "payments",
        findPayment._id
      );
      if (!findCart) {
        findPayment.cartId = env.DEFAULT_CART;
        await findByIdAndPushData(
          Cart,
          env.DEFAULT_CART,
          "payments",
          findPayment._id
        );
      }

      findPayment.save();
      return handleSuccess200(res, findPayment);
    } catch (error) {
      return handleError500(res, error);
    }
  },
  forceDelete: async (req, res) => {
    try {
      const { id } = req.params;

      const findPayment = await Payment.findOne(
        { _id: id, deleted: true },
        null,
        {
          withDeleted: true,
        }
      );

      if (!findPayment) {
        return handleError404(res);
      }

      await forceDeleteData(Payment, id);

      return handleSuccess200(res, id);
    } catch (error) {
      return handleError500(res, error);
    }
  },
};

export default PaymentController;
