import {
  handleError403,
  handleError404,
  handleError409,
  handleError500,
  handleSuccess200,
} from "../../utils/helpers/handleStatusCode.js";
import env from "../config/envConfig.js";
import Cart from "../models/Cart.js";
import Review from "../models/Review.js";
import User from "../models/User.js";

import bcrypt from "bcryptjs";

import { deleteData, forceDeleteData } from "../services/deleteService.js";
import {
  getAllUserDeleted,
  getData,
  getDataById,
} from "../services/getService.js";
import {
  findByIdAndUpdateData,
  restoreData,
} from "../services/patchService.js";
import { createData } from "../services/postService.js";

const UserController = {
  getAll: async (req, res) => {
    try {
      const search = req.query.search || "";
      const users = await User.aggregate([
        {
          $lookup: {
            from: "carts",
            localField: "_id",
            foreignField: "userId",
            as: "carts",
          },
        },

        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "userId",
            as: "reviews",
          },
        },

        {
          $match: {
            username: { $regex: search.trim(), $options: "i" },
          },
        },
        {
          $project: {
            _id: 1,
            username: 1,
            email: 1,
            address: 1,
            city: 1,
            country: 1,
            phoneNumber: 1,
            price: 1,
            role: 1,
            carts: 1,
            reviews: 1,
          },
        },
      ]);
      return handleSuccess200(res, users);
    } catch (error) {
      console.log(error);
      return handleError500(res, req);
    }
  },

  getAllDeleted: async (req, res) => {
    try {
      const search = req.query.search || "";
      let users = await getAllUserDeleted(
        User,
        [{ carts: "title" }, { reviews: "title" }],
        search
      );

      users.filter((user) => user.username.includes(search));

      return handleSuccess200(res, users);
    } catch (error) {
      console.log(error);
      return handleError500(res, req);
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const findUser = await getDataById(User, id);

      if (!findUser) {
        return handleError404(res);
      }

      const users = await User.aggregate([
        {
          $lookup: {
            from: "carts",
            localField: "_id",
            foreignField: "userId",
            as: "carts",
          },
        },

        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "userId",
            as: "reviews",
          },
        },

        {
          $match: {
            _id: findUser._id,
          },
        },
        {
          $project: {
            _id: 1,
            username: 1,
            email: 1,
            address: 1,
            city: 1,
            country: 1,
            phoneNumber: 1,
            price: 1,
            role: 1,
            carts: 1,
            reviews: 1,
          },
        },
      ]);

      return handleSuccess200(res, users[0]);
    } catch (error) {
      return handleError500(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const email = await getData(User, "email", req.body.email);

      if (email) {
        return handleError409(res, "Email already exists!");
      }

      const defaultPassword = "123456";

      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(defaultPassword, salt);

      const newUser = await createData(User, { ...req.body, password: hash });

      const users = await User.aggregate([
        {
          $lookup: {
            from: "carts",
            localField: "_id",
            foreignField: "userId",
            as: "carts",
          },
        },

        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "userId",
            as: "reviews",
          },
        },

        {
          $match: {
            _id: newUser._id,
          },
        },
        {
          $project: {
            _id: 1,
            username: 1,
            email: 1,
            address: 1,
            city: 1,
            country: 1,
            phoneNumber: 1,
            price: 1,
            role: 1,
            carts: 1,
            reviews: 1,
          },
        },
      ]);

      return handleSuccess200(res, users[0]);
    } catch (error) {
      handleError500(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const findUser = await getDataById(User, id);
      const isAdmin = await getDataById(User, req.user.user);

      if (!findUser) {
        return handleError404(res);
      }

      if (
        isAdmin.role === "admin" &&
        (findUser.role === "admin" || findUser.role === "ceo")
      ) {
        return handleError403(res);
      }
      const updateUser = await findByIdAndUpdateData(User, id, req.body);

      const users = await User.aggregate([
        {
          $lookup: {
            from: "carts",
            localField: "_id",
            foreignField: "userId",
            as: "carts",
          },
        },

        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "userId",
            as: "reviews",
          },
        },

        {
          $match: {
            _id: updateUser._id,
          },
        },
        {
          $project: {
            _id: 1,
            username: 1,
            email: 1,
            address: 1,
            city: 1,
            country: 1,
            phoneNumber: 1,
            price: 1,
            role: 1,
            carts: 1,
            reviews: 1,
          },
        },
      ]);

      return handleSuccess200(res, users[0]);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  userUpdate: async (req, res) => {
    try {
      const { id } = req.params;
      const findUser = await getDataById(User, id);
      const isUser = await getDataById(User, req.user.user);

      if (!findUser) {
        return handleError404(res);
      }

      if (findUser._id.toString() !== isUser._id.toString()) {
        return handleError403(res);
      }

      const updateUser = await findByIdAndUpdateData(User, id);

      const users = await User.aggregate([
        {
          $lookup: {
            from: "carts",
            localField: "_id",
            foreignField: "userId",
            as: "carts",
          },
        },

        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "userId",
            as: "reviews",
          },
        },

        {
          $match: {
            _id: updateUser._id,
          },
        },
        {
          $project: {
            _id: 1,
            username: 1,
            email: 1,
            address: 1,
            city: 1,
            country: 1,
            phoneNumber: 1,
            price: 1,
            role: 1,
            carts: 1,
            reviews: 1,
          },
        },
      ]);

      return handleSuccess200(res, users[0]);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const findUser = await getDataById(User, id);
      const isAdmin = await getDataById(User, req.user.user);

      if (!findUser) {
        return handleError404(res);
      }

      if (findUser._id.toString() === env.DEFAULT_USER) {
        return handleError409(res, "You cannot delete an uncategorized!");
      }

      if (findUser.role === "ceo") {
        return handleError403(res);
      }

      if (isAdmin.role === "admin" && findUser.role === "admin") {
        return handleError403(res);
      }

      const findCart = await getData(Cart, "userId", findUser._id);
      if (findCart) {
        return handleError409(
          res,
          "Cart conflict, cannot be deleted due to other constraints"
        );
      }

      const findReview = await getData(Review, "userId", findUser._id);
      if (findReview) {
        return handleError409(
          res,
          "Review conflict, cannot be deleted due to other constraints"
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

      const users = await User.aggregate([
        {
          $lookup: {
            from: "carts",
            localField: "_id",
            foreignField: "userId",
            as: "carts",
          },
        },

        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "userId",
            as: "reviews",
          },
        },

        {
          $match: {
            _id: findUser._id,
          },
        },
        {
          $project: {
            _id: 1,
            username: 1,
            email: 1,
            address: 1,
            city: 1,
            country: 1,
            phoneNumber: 1,
            price: 1,
            role: 1,
            carts: 1,
            reviews: 1,
          },
        },
      ]);

      return handleSuccess200(res, users[0]);
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
