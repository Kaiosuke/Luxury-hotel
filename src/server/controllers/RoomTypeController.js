import {
  handleError404,
  handleError404WithData,
  handleError409,
  handleError500,
  handleSuccess200,
  handleSuccess201,
} from "../../utils/helpers/handleStatusCode.js";
import env from "../config/envConfig.js";
import CategoryRoom from "../models/CategoryRoom.js";
import RoomType from "../models/RoomType.js";
import Room from "../models/Room.js";
import TypeBed from "../models/TypeBed.js";
import Review from "../models/Review.js";
import View from "../models/View.js";
import Cart from "../models/Cart.js";
import { deleteData, forceDeleteData } from "../services/deleteService.js";
import {
  getAllData,
  getAllDataDeleted,
  getData,
  getDataById,
} from "../services/getService.js";
import {
  findByIdAndPullData,
  findByIdAndPushData,
  findByIdAndUpdateData,
  restoreData,
} from "../services/patchService.js";
import { createData } from "../services/postService.js";

const RoomTypeController = {
  getAll: async (req, res) => {
    try {
      const roomTypes = await getAllData(RoomType, [
        { viewId: "title" },
        { typeBedId: "title" },
        { categoryRoomId: "title" },
      ]);

      if (!roomTypes.length) {
        return handleError404(res);
      }

      return handleSuccess200(res, roomTypes);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  getAllDeleted: async (req, res) => {
    try {
      const roomTypes = await getAllDataDeleted(RoomType, [
        { viewId: "title" },
        { typeBedId: "title" },
        { categoryRoomId: "title" },
      ]);
      if (!roomTypes.length) {
        return handleError404(res);
      }
      return handleSuccess200(res, roomTypes);
    } catch (error) {
      return handleError500(res, req);
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const roomType = await getDataById(RoomType, id, [
        { viewId: "title" },
        { typeBedId: "title" },
        { categoryRoomId: "title" },
      ]);

      if (!roomType) {
        return handleError404(res);
      }
      return handleSuccess200(res, roomType);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const { viewId, categoryRoomId, typeBedId } = req.body;

      const findView = await getDataById(View, viewId);
      const findTypeBed = await getDataById(TypeBed, typeBedId);
      const findCategoryRoom = await getDataById(CategoryRoom, categoryRoomId);

      if (!findView) {
        return handleError404WithData(res, "view");
      }

      if (!findTypeBed) {
        return handleError404WithData(res, "type bed");
      }

      if (!findCategoryRoom) {
        return handleError404WithData(res, "category room");
      }

      const newRoomType = await createData(RoomType, req.body, [
        { viewId: "title" },
        { typeBedId: "title" },
        { categoryRoomId: "title" },
      ]);

      await findByIdAndPushData(View, viewId, "roomTypes", newRoomType._id);
      await findByIdAndPushData(
        TypeBed,
        typeBedId,
        "roomTypes",
        newRoomType._id
      );
      await findByIdAndPushData(
        CategoryRoom,
        categoryRoomId,
        "roomTypes",
        newRoomType._id
      );

      return handleSuccess201(res, newRoomType);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { viewId, categoryRoomId, typeBedId } = req.body;

      const findRoomType = await getDataById(RoomType, id);

      if (!findRoomType) {
        return handleError404(res);
      }

      const findView = await getDataById(View, viewId);
      const findTypeBed = await getDataById(TypeBed, typeBedId);
      const findCategoryRoom = await getDataById(CategoryRoom, categoryRoomId);

      if (!findView) {
        return handleError404WithData(res, "view");
      }

      if (!findTypeBed) {
        return handleError404WithData(res, "type bed");
      }

      if (!findCategoryRoom) {
        return handleError404WithData(res, "category room");
      }

      const updateRoomType = await findByIdAndUpdateData(
        RoomType,
        id,
        req.body,
        [
          { viewId: "title" },
          { typeBedId: "title" },
          { categoryRoomId: "title" },
        ]
      );

      if (viewId !== findRoomType.viewId.toString()) {
        await findByIdAndPullData(
          View,
          findRoomType.viewId,
          "roomTypes",
          updateRoomType._id
        );

        await findByIdAndPushData(
          View,
          updateRoomType.viewId,
          "roomTypes",
          updateRoomType._id
        );
      }

      if (typeBedId !== findRoomType.typeBedId.toString()) {
        await findByIdAndPullData(
          TypeBed,
          findRoomType.typeBedId,
          "roomTypes",
          updateRoomType._id
        );

        await findByIdAndPushData(
          TypeBed,
          updateRoomType.typeBedId,
          "roomTypes",
          updateRoomType._id
        );
      }

      if (categoryRoomId !== findRoomType.categoryRoomId.toString()) {
        await findByIdAndPullData(
          CategoryRoom,
          findRoomType.categoryRoomId,
          "roomTypes",
          updateRoomType._id
        );

        await findByIdAndPushData(
          CategoryRoom,
          updateRoomType.categoryRoomId,
          "roomTypes",
          updateRoomType._id
        );
      }

      return handleSuccess200(res, updateRoomType);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const findRoomType = await getDataById(RoomType, id);

      if (!findRoomType) {
        return handleError404(res);
      }

      if (findRoomType._id.toString() === env.DEFAULT_ROOM_TYPE) {
        return handleError409(res, "You cannot delete an uncategorized!");
      }

      const findRoom = await getData(Room, "roomTypeId", findRoomType._id);
      if (findRoom) {
        return handleError409(
          res,
          "Room conflict, cannot be deleted due to other constraints"
        );
      }

      await findByIdAndPullData(View, findRoomType.viewId, "roomTypes", id);

      await findByIdAndPullData(
        TypeBed,
        findRoomType.typeBedId,
        "roomTypes",
        id
      );

      await findByIdAndPullData(
        CategoryRoom,
        findRoomType.categoryRoomId,
        "roomTypes",
        id
      );

      // await Review.updateMany(
      //   { _id: { $in: findRoomType.reviews } },
      //   { $set: { roomTypeId: env.DEFAULT_ROOM_TYPE } }
      // );

      // await RoomType.updateOne(
      //   { _id: env.DEFAULT_ROOM_TYPE },
      //   { $push: { reviews: { $each: findRoomType.reviews } } }
      // );

      // await Cart.updateMany(
      //   { _id: { $in: findRoomType.carts } },
      //   { $set: { roomTypeId: env.DEFAULT_ROOM_TYPE } }
      // );

      // await RoomType.updateOne(
      //   { _id: env.DEFAULT_ROOM_TYPE },
      //   { $push: { carts: { $each: findRoomType.carts } } }
      // );

      const findReview = await getData(Review, "roomTypeId", id);

      if (findReview) {
        return handleError409(
          res,
          "Review type conflict, cannot be deleted due to other constraints"
        );
      }

      const findCart = await getData(Cart, "roomTypeId", id);

      if (findCart) {
        return handleError409(
          res,
          "Cart type conflict, cannot be deleted due to other constraints"
        );
      }

      await deleteData(RoomType, id);

      return handleSuccess200(res, id);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  restore: async (req, res) => {
    try {
      const { id } = req.params;

      const restoreRoomType = await restoreData(RoomType, id);

      if (!restoreRoomType.matchedCount) {
        return handleError404(res);
      }

      const findRoomType = await getDataById(RoomType, id);

      const findView = await findByIdAndPushData(
        View,
        findRoomType.viewId,
        "roomTypes",
        id
      );

      if (!findView) {
        findRoomType.viewId = env.DEFAULT_VIEW;
        await findByIdAndPushData(View, env.DEFAULT_VIEW, "roomTypes", id);
      }

      const findTypeBed = await findByIdAndPushData(
        TypeBed,
        findRoomType.typeBedId,
        "roomTypes",
        id
      );

      if (!findTypeBed) {
        findRoomType.typeBedId = env.DEFAULT_TYPE_BED;
        await findByIdAndPushData(
          TypeBed,
          env.DEFAULT_TYPE_BED,
          "roomTypes",
          id
        );
      }

      const findCategoryRoom = await findByIdAndPushData(
        CategoryRoom,
        findRoomType.categoryRoomId,
        "roomTypes",
        id
      );

      if (!findCategoryRoom) {
        findRoomType.categoryRoomId = env.DEFAULT_CATEGORY_ROOM;
        await findByIdAndPushData(
          CategoryRoom,
          env.DEFAULT_CATEGORY_ROOM,
          "roomTypes",
          id
        );
      }

      findRoomType.save();
      return handleSuccess200(res, findRoomType);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  forceDelete: async (req, res) => {
    const { id } = req.params;

    const findRoomType = await RoomType.findOne(
      { _id: id, deleted: true },
      null,
      {
        withDeleted: true,
      }
    );

    if (!findRoomType) {
      return handleError404(res);
    }

    await forceDeleteData(RoomType, id);

    return handleSuccess200(res, id);
  },
};

export default RoomTypeController;
