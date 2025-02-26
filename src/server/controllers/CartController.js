import {
  handleError404,
  handleError404WithData,
  handleError409,
  handleError500,
  handleSuccess200,
  handleSuccess201,
} from "../../utils/helpers/handleStatusCode.js";
import env from "../config/envConfig.js";
import Cart from "../models/Cart.js";
import Option from "../models/Option.js";
import Payment from "../models/Payment.js";
import Room from "../models/Room.js";
import RoomType from "../models/RoomType.js";
import User from "../models/User.js";

import { deleteData, forceDeleteData } from "../services/deleteService.js";
import { getData, getDataById } from "../services/getService.js";
import {
  findByIdAndPullData,
  findByIdAndPushData,
  findByIdAndUpdateData,
  restoreData,
} from "../services/patchService.js";
import { createData } from "../services/postService.js";

const CartController = {
  getAll: async (req, res) => {
    try {
      const search = req.query.search || "";

      const carts = await Cart.aggregate([
        {
          $addFields: {
            userId: { $toObjectId: "$userId" },
          },
        },
        {
          $lookup: {
            from: "roomtypes",
            localField: "roomTypeId",
            foreignField: "_id",
            as: "roomType",
          },
        },
        {
          $unwind: "$roomType",
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $lookup: {
            from: "rooms",
            localField: "roomId",
            foreignField: "_id",
            as: "room",
          },
        },
        {
          $unwind: "$room",
        },
        {
          $lookup: {
            from: "options",
            localField: "optionId",
            foreignField: "_id",
            as: "option",
          },
        },
        {
          $unwind: "$option",
        },
        {
          $match: {
            "user.username": { $regex: search.trim(), $options: "i" },
          },
        },
        {
          $project: {
            _id: 1,
            status: 1,
            roomTypeId: 1,
            userId: 1,
            optionId: 1,
            roomId: 1,
            price: 1,
            totalPrice: 1,
            bookedDates: 1,
            "user.username": 1,
            "roomType.title": 1,
            "roomType.price": 1,
            "roomType.thumbnail": 1,
            "room.roomNumber": 1,
            "option.title": 1,
            "option.price": 1,
          },
        },
      ]);

      return handleSuccess200(res, carts);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  getAllForUser: async (req, res) => {
    try {
      const { id } = req.params;

      const findUser = await getDataById(User, id);

      if (!findUser) {
        return handleError404WithData(res, "user");
      }

      const carts = await Cart.aggregate([
        {
          $addFields: {
            userId: { $toObjectId: "$userId" },
          },
        },
        {
          $lookup: {
            from: "roomtypes",
            localField: "roomTypeId",
            foreignField: "_id",
            as: "roomType",
          },
        },
        {
          $unwind: "$roomType",
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $lookup: {
            from: "rooms",
            localField: "roomId",
            foreignField: "_id",
            as: "room",
          },
        },
        {
          $unwind: "$room",
        },
        {
          $lookup: {
            from: "options",
            localField: "optionId",
            foreignField: "_id",
            as: "option",
          },
        },
        {
          $unwind: "$option",
        },
        {
          $match: {
            userId: findUser._id,
          },
        },
        {
          $project: {
            _id: 1,
            status: 1,
            roomTypeId: 1,
            userId: 1,
            optionId: 1,
            roomId: 1,
            price: 1,
            totalPrice: 1,
            bookedDates: 1,
            "user.username": 1,
            "roomType.title": 1,
            "roomType.price": 1,
            "roomType.thumbnail": 1,
            "room.roomNumber": 1,
            "option.title": 1,
            "option.price": 1,
          },
        },
      ]);

      return handleSuccess200(res, carts);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  getAllDeleted: async (req, res) => {
    try {
      const search = req.query.search || "";

      const carts = await Cart.find({ deleted: true }, null, {
        withDeleted: true,
      })
        .populate("userId", "username")
        .populate("roomTypeId", "title")
        .populate("roomId", "roomNumber")
        .populate("optionId", "title");

      return handleSuccess200(res, carts);
    } catch (error) {
      return handleError500(res, req);
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const cart = await getDataById(Cart, id, []);
      if (!cart) {
        return handleError404(res);
      }

      return handleSuccess200(res, cart);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  getByUser: async (req, res) => {
    try {
      const { id } = req.params;

      const cart = await getDataById(Cart, id, []);
      if (!cart) {
        return handleError404(res);
      }

      return handleSuccess200(res, cart);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const { optionId, userId, roomId, roomTypeId } = req.body;

      const findOption = await getDataById(Option, optionId);
      if (!findOption) {
        return handleError404WithData(res, "option");
      }

      const findUser = await getDataById(User, userId);
      if (!findUser) {
        return handleError404WithData(res, "user");
      }

      const findRoom = await getDataById(Room, roomId);
      if (!findRoom) {
        return handleError404WithData(res, "room");
      }

      const findRoomType = await getDataById(RoomType, roomTypeId);
      if (!findRoomType) {
        return handleError404WithData(res, "roomType");
      }

      const newCart = await createData(Cart, req.body, [
        { optionId: "title" },
        { userId: "username" },
        { roomId: "roomNumber" },
        { roomTypeId: "title" },
      ]);

      await findByIdAndPushData(Option, optionId, "carts", newCart._id);

      await findByIdAndPushData(User, userId, "carts", newCart._id);

      await findByIdAndPushData(Room, roomId, "carts", newCart._id);

      await findByIdAndPushData(RoomType, roomTypeId, "carts", newCart._id);

      const cart = await Cart.aggregate([
        {
          $addFields: {
            userId: { $toObjectId: "$userId" },
          },
        },
        {
          $lookup: {
            from: "roomtypes",
            localField: "roomTypeId",
            foreignField: "_id",
            as: "roomType",
          },
        },
        {
          $unwind: "$roomType",
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $lookup: {
            from: "rooms",
            localField: "roomId",
            foreignField: "_id",
            as: "room",
          },
        },
        {
          $unwind: "$room",
        },
        {
          $lookup: {
            from: "options",
            localField: "optionId",
            foreignField: "_id",
            as: "option",
          },
        },
        {
          $unwind: "$option",
        },
        {
          $match: {
            _id: newCart._id,
          },
        },
        {
          $project: {
            _id: 1,
            status: 1,
            roomTypeId: 1,
            userId: 1,
            optionId: 1,
            roomId: 1,
            price: 1,
            totalPrice: 1,
            bookedDates: 1,
            "user.username": 1,
            "roomType.title": 1,
            "roomType.price": 1,
            "roomType.thumbnail": 1,
            "room.roomNumber": 1,
            "option.title": 1,
            "option.price": 1,
          },
        },
      ]);

      return handleSuccess201(res, cart[0]);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { optionId, userId, roomId, roomTypeId } = req.body;

      const findCart = await getDataById(Cart, id);

      if (!findCart) {
        return handleError404(res);
      }

      if (optionId && userId && roomId && roomTypeId) {
        const findOption = await getDataById(Option, optionId);
        if (!findOption) {
          return handleError404WithData(res, "option");
        }

        const findUser = await getDataById(User, userId);
        if (!findUser) {
          return handleError404WithData(res, "user");
        }

        const findRoom = await getDataById(Room, roomId);
        if (!findRoom) {
          return handleError404WithData(res, "room");
        }

        const findRoomType = await getDataById(RoomType, roomTypeId);
        if (!findRoomType) {
          return handleError404WithData(res, "roomType");
        }

        const updateCart = await findByIdAndUpdateData(Cart, id, req.body);

        if (optionId !== updateCart.optionId) {
          await findByIdAndPullData(Option, findCart.optionId, "carts", id);

          await findByIdAndPushData(Option, optionId, "carts", id);
        }

        if (userId !== updateCart.userId) {
          await findByIdAndPullData(User, findCart.userId, "carts", id);

          await findByIdAndPushData(User, userId, "carts", id);
        }

        if (roomId !== updateCart.roomId) {
          await findByIdAndPullData(Room, findCart.roomId, "carts", id);

          await findByIdAndPushData(Room, roomId, "carts", id);
        }

        if (roomTypeId !== updateCart.roomTypeId) {
          await findByIdAndPullData(RoomType, findCart.roomTypeId, "carts", id);

          await findByIdAndPushData(RoomType, roomTypeId, "carts", id);
        }
      } else {
        await findByIdAndUpdateData(Cart, id, req.body);
      }

      const cart = await Cart.aggregate([
        {
          $addFields: {
            userId: { $toObjectId: "$userId" },
          },
        },
        {
          $lookup: {
            from: "roomtypes",
            localField: "roomTypeId",
            foreignField: "_id",
            as: "roomType",
          },
        },
        {
          $unwind: "$roomType",
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $lookup: {
            from: "rooms",
            localField: "roomId",
            foreignField: "_id",
            as: "room",
          },
        },
        {
          $unwind: "$room",
        },
        {
          $lookup: {
            from: "options",
            localField: "optionId",
            foreignField: "_id",
            as: "option",
          },
        },
        {
          $unwind: "$option",
        },
        {
          $match: {
            _id: findCart._id,
          },
        },
        {
          $project: {
            _id: 1,
            status: 1,
            roomTypeId: 1,
            userId: 1,
            optionId: 1,
            roomId: 1,
            price: 1,
            totalPrice: 1,
            bookedDates: 1,
            "user.username": 1,
            "roomType.title": 1,
            "roomType.price": 1,
            "roomType.thumbnail": 1,
            "room.roomNumber": 1,
            "option.title": 1,
            "option.price": 1,
          },
        },
      ]);

      return handleSuccess200(res, cart[0]);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const findCart = await getDataById(Cart, id);

      if (!findCart) {
        return handleError404(res);
      }

      const findPayment = await getData(Payment, "cartId", findCart._id);
      if (findPayment) {
        return handleError409(
          res,
          "Payment conflict, cannot be deleted due to other constraints"
        );
      }

      await findByIdAndPullData(Option, findCart.optionId, "carts", id);
      await findByIdAndPullData(User, findCart.userId, "carts", id);
      await findByIdAndPullData(Room, findCart.roomId, "carts", id);
      await findByIdAndPullData(RoomType, findCart.roomTypeId, "carts", id);

      await deleteData(Cart, id);

      return handleSuccess200(res, id);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  userDelete: async (req, res) => {
    try {
      const { id } = req.params;

      const findCart = await getDataById(Cart, id);

      if (!findCart) {
        return handleError404(res);
      }

      await findByIdAndPullData(Option, findCart.optionId, "carts", id);
      await findByIdAndPullData(User, findCart.userId, "carts", id);
      await findByIdAndPullData(Room, findCart.roomId, "carts", id);
      await findByIdAndPullData(RoomType, findCart.roomTypeId, "carts", id);

      await forceDeleteData(Cart, id);

      return handleSuccess200(res, id);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  restore: async (req, res) => {
    try {
      const { id } = req.params;
      const restoreCart = await restoreData(Cart, id);

      if (!restoreCart.matchedCount) {
        return handleError404(res);
      }

      const findCart = await getDataById(Cart, id);

      const findOption = await findByIdAndPushData(
        Option,
        findCart.optionId,
        "carts",
        id
      );

      if (!findOption) {
        findCart.optionId = env.DEFAULT_OPTION;
        await findByIdAndPushData(Option, env.DEFAULT_OPTION, "carts", id);
      }

      const findUser = await findByIdAndPushData(
        User,
        findCart.userId,
        "carts",
        id
      );

      if (!findUser) {
        findCart.userId = env.DEFAULT_USER;
        await findByIdAndPushData(User, env.DEFAULT_USER, "carts", id);
      }

      const findRoom = await findByIdAndPushData(
        Room,
        findCart.roomId,
        "carts",
        id
      );

      if (!findRoom) {
        findCart.roomId = env.DEFAULT_ROOM;
        await findByIdAndPushData(Room, env.DEFAULT_ROOM, "carts", id);
      }

      const findRoomType = await findByIdAndPushData(
        RoomType,
        findCart.roomTypeId,
        "carts",
        id
      );

      if (!findRoomType) {
        findCart.roomTypeId = env.DEFAULT_ROOM_TYPE;
        await findByIdAndPushData(RoomType, env.DEFAULT_ROOM_TYPE, "carts", id);
      }
      findCart.save();

      const cart = await Cart.aggregate([
        {
          $addFields: {
            userId: { $toObjectId: "$userId" },
          },
        },
        {
          $lookup: {
            from: "roomtypes",
            localField: "roomTypeId",
            foreignField: "_id",
            as: "roomType",
          },
        },
        {
          $unwind: "$roomType",
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $lookup: {
            from: "rooms",
            localField: "roomId",
            foreignField: "_id",
            as: "room",
          },
        },
        {
          $unwind: "$room",
        },
        {
          $lookup: {
            from: "options",
            localField: "optionId",
            foreignField: "_id",
            as: "option",
          },
        },
        {
          $unwind: "$option",
        },
        {
          $match: {
            _id: findCart._id,
          },
        },
        {
          $project: {
            _id: 1,
            status: 1,
            roomTypeId: 1,
            userId: 1,
            optionId: 1,
            roomId: 1,
            price: 1,
            totalPrice: 1,
            bookedDates: 1,
            "user.username": 1,
            "roomType.title": 1,
            "roomType.price": 1,
            "roomType.thumbnail": 1,
            "room.roomNumber": 1,
            "option.title": 1,
            "option.price": 1,
          },
        },
      ]);

      return handleSuccess200(res, cart[0]);
    } catch (error) {
      return handleError500(res, error);
    }
  },
  forceDelete: async (req, res) => {
    try {
      const { id } = req.params;

      const findCart = await Cart.findOne({ _id: id, deleted: true }, null, {
        withDeleted: true,
      });

      if (!findCart) {
        return handleError404(res);
      }

      await forceDeleteData(Cart, id);

      return handleSuccess200(res, id);
    } catch (error) {
      return handleError500(res, error);
    }
  },
};

export default CartController;
