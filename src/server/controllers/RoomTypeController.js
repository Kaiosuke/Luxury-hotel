import {
  handleError404,
  handleError404WithData,
  handleError409,
  handleError500,
  handleSuccess200,
  handleSuccess201,
} from "../../utils/helpers/handleStatusCode.js";
import RoomType from "../models/RoomType.js";
import View from "../models/View.js";
import TypeBed from "../models/TypeBed.js";
import CategoryRoom from "../models/CategoryRoom.js";
import { deleteData, forceDeleteData } from "../services/deleteService.js";
import { getData, getAllData, getDataById } from "../services/getService.js";
import {
  findByIdAndPullData,
  findByIdAndPushData,
  findByIdAndUpdateData,
  restoreData,
} from "../services/patchService.js";
import { createData } from "../services/postService.js";
import { Schema } from "mongoose";

const RoomTypeController = {
  getAll: async (req, res) => {
    try {
      const roomTypes = await getAllData(RoomType, [
        "viewId",
        "typeBedId",
        "categoryRoomId",
      ]);

      if (!roomTypes.length) {
        return handleError404(res);
      }

      return handleSuccess200(res, roomTypes);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const roomType = await getDataById(RoomType, id, [
        "viewId",
        "typeBedId",
        "categoryRoomId",
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

      const newRoomType = await createData(RoomType, req.body);

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
        req.body
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

      const findRoomType = await getById(RoomType, id);

      if (!findRoomType) {
        return handleError404(res);
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

      const findRoomType = await getById(RoomType, id);

      return handleSuccess200(res, findRoomType);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  forceDelete: async (req, res) => {
    const { id } = req.params;

    const forceDeleteRoomType = await forceDeleteData(RoomType, id);

    if (!forceDeleteRoomType.deletedCount) {
      return handleError404(res);
    }

    return handleSuccess200(res, id);
  },
};

export default RoomTypeController;
