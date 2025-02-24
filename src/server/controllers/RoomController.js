import {
  handleError404,
  handleError404WithData,
  handleError409,
  handleError500,
  handleSuccess200,
  handleSuccess201,
} from "../../utils/helpers/handleStatusCode.js";
import env from "../config/envConfig.js";
import {
  getAllData,
  getAllDataDeleted,
  getData,
  getDataById,
} from "../services/getService.js";
import Room from "../models/Room.js";
import RoomType from "../models/RoomType.js";
import Cart from "../models/Cart.js";
import { createData } from "../services/postService.js";
import {
  findByIdAndPullData,
  findByIdAndPushData,
  findByIdAndUpdateData,
  restoreData,
} from "../services/patchService.js";
import { deleteData, forceDeleteData } from "../services/deleteService.js";

const RoomController = {
  getAll: async (req, res) => {
    try {
      const search = req.query.search || "";

      const rooms = await Room.aggregate([
        {
          $addFields: {
            roomTypeId: { $toObjectId: "$roomTypeId" },
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
        { $unwind: "$roomType" },
        {
          $lookup: {
            from: "carts",
            localField: "_id",
            foreignField: "roomId",
            as: "carts",
          },
        },
        {
          $addFields: {
            bookedDates: {
              $reduce: {
                input: "$carts",
                initialValue: [],
                in: {
                  $concatArrays: [
                    "$$value",
                    [{ $ifNull: ["$$this.bookedDates", {}] }],
                  ],
                },
              },
            },
          },
        },
        {
          $match: {
            "roomType.title": { $regex: search.trim(), $options: "i" },
          },
        },
        {
          $project: {
            _id: 1,
            roomNumber: 1,
            roomTypeId: 1,
            floor: 1,
            status: 1,
            bookedDates: 1,
            carts: { $map: { input: "$carts", as: "cart", in: "$$cart._id" } },
            "roomType.title": 1,
          },
        },
      ]);

      return handleSuccess200(res, rooms);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  getAllDeleted: async (req, res) => {
    try {
      const search = req.query.search || " ";

      let rooms = await Room.find({ deleted: true }, null, {
        withDeleted: true,
      }).populate("roomTypeId", "title");

      rooms = rooms.filter(
        (room) =>
          room.roomTypeId &&
          room.roomTypeId.title
            .toLowerCase()
            .includes(search.toLowerCase().trim())
      );

      return handleSuccess200(res, rooms);
    } catch (error) {
      console.log(error);
      return handleError500(res, req);
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const findRoom = await Room.findById(id);

      const room = await Room.aggregate([
        {
          $addFields: {
            roomTypeId: { $toObjectId: "$roomTypeId" },
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
          $match: {
            _id: findRoom._id,
          },
        },
        {
          $project: {
            _id: 1,
            roomNumber: 1,
            roomTypeId: 1,
            floor: 1,
            status: 1,
            bookedDates: 1,
            carts: 1,
            "roomType.title": 1,
          },
        },
      ]);
      if (!room) {
        return handleError404(res);
      }
      return handleSuccess200(res, room[0]);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const { roomTypeId } = req.body;

      const findRoomType = await getDataById(RoomType, roomTypeId);
      if (!findRoomType) {
        return handleError404WithData(res, "roomType");
      }

      const newRoom = await createData(Room, req.body);

      await findByIdAndPushData(RoomType, roomTypeId, "rooms", newRoom._id);

      const room = await Room.aggregate([
        {
          $addFields: {
            roomTypeId: { $toObjectId: "$roomTypeId" },
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
          $match: {
            _id: newRoom._id,
          },
        },
        {
          $project: {
            _id: 1,
            roomNumber: 1,
            roomTypeId: 1,
            floor: 1,
            status: 1,
            bookedDates: 1,
            carts: 1,
            "roomType.title": 1,
          },
        },
      ]);

      return handleSuccess201(res, room[0]);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { roomTypeId } = req.body;

      const findRoom = await getDataById(Room, id);
      if (!findRoom) {
        return handleError404(res);
      }

      const findRoomType = await getDataById(RoomType, roomTypeId);
      if (!findRoomType) {
        return handleError404WithData(res, "roomType");
      }

      const updateRoom = await findByIdAndUpdateData(Room, id, req.body);

      if (findRoom.roomTypeId !== roomTypeId) {
        await findByIdAndPullData(
          RoomType,
          findRoom.roomTypeId,
          "rooms",
          updateRoom._id
        );
        await findByIdAndPushData(
          RoomType,
          roomTypeId,
          "rooms",
          updateRoom._id
        );
      }

      const room = await Room.aggregate([
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
          $match: {
            _id: findRoom._id,
          },
        },
        {
          $project: {
            _id: 1,
            roomNumber: 1,
            roomTypeId: 1,
            floor: 1,
            status: 1,
            bookedDates: 1,
            carts: 1,
            "roomType.title": 1,
          },
        },
      ]);

      await handleSuccess201(res, room[0]);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const findRoom = await getDataById(Room, id);
      if (!findRoom) {
        return handleError404(res);
      }

      if (findRoom._id.toString() === env.DEFAULT_ROOM) {
        return handleError409(res, "You cannot delete an uncategorized!");
      }

      // await Cart.updateMany(
      //   { _id: { $in: findRoom.carts } },
      //   { $set: { roomTypeId: env.DEFAULT_ROOM } }
      // );

      // await Room.updateOne(
      //   { _id: env.DEFAULT_ROOM },
      //   { $push: { carts: { $each: findRoom.carts } } }
      // );

      const findCart = await getData(Cart, "roomId", id);

      if (findCart) {
        return handleError409(
          res,
          "Cart type conflict, cannot be deleted due to other constraints"
        );
      }

      await deleteData(Room, id);

      await findByIdAndPullData(
        RoomType,
        findRoom.roomTypeId,
        "rooms",
        findRoom._id
      );

      return handleSuccess200(res, id);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  restore: async (req, res) => {
    try {
      const { id } = req.params;

      const restoreRoom = await restoreData(Room, id);

      if (!restoreRoom.matchedCount) {
        return handleError404(res);
      }

      const findRoom = await getDataById(Room, id);

      const findRoomType = await findByIdAndPushData(
        RoomType,
        findRoom.roomTypeId,
        "rooms",
        findRoom._id
      );

      if (!findRoomType) {
        findRoom.roomTypeId = env.DEFAULT_ROOM_TYPE;
        await findByIdAndPushData(
          RoomType,
          env.DEFAULT_ROOM_TYPE,
          "rooms",
          findRoom._id
        );
      }
      findRoom.save();
      const room = await Room.aggregate([
        {
          $addFields: {
            roomTypeId: { $toObjectId: "$roomTypeId" },
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
          $match: {
            _id: findRoom._id,
          },
        },
        {
          $project: {
            _id: 1,
            roomNumber: 1,
            roomTypeId: 1,
            floor: 1,
            status: 1,
            bookedDates: 1,
            carts: 1,
            "roomType.title": 1,
          },
        },
      ]);

      return handleSuccess200(res, room[0]);
    } catch (error) {
      return handleError500(res, error);
    }
  },
  forceDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const findRoom = await Room.findOne({ _id: id, deleted: true }, null, {
        withDeleted: true,
      });

      if (!findRoom) {
        return handleError404(res);
      }

      await forceDeleteData(Room, id);

      return handleSuccess200(res, id);
    } catch (error) {
      return handleError500(res, error);
    }
  },
};

export default RoomController;
