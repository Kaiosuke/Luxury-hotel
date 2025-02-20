import {
  handleError404,
  handleError409,
  handleError500,
  handleSuccess200,
  handleSuccess201,
} from "../../utils/helpers/handleStatusCode.js";
import env from "../config/envConfig.js";
import CategoryRoom from "../models/CategoryRoom.js";
import RoomType from "../models/RoomType.js";
import { deleteData, forceDeleteData } from "../services/deleteService.js";
import {
  getData,
  getAllData,
  getDataById,
  getAllDataDeleted,
} from "../services/getService.js";
import {
  findByIdAndUpdateData,
  restoreData,
} from "../services/patchService.js";
import { createData } from "../services/postService.js";

const CategoryRoomController = {
  getAll: async (req, res) => {
    try {
      const search = req.query.search || "";
      const categoryRooms = await getAllData(
        CategoryRoom,
        [{ roomTypes: "title" }],
        search
      );

      if (!categoryRooms.length) {
        return handleError404(res);
      }

      return handleSuccess200(res, categoryRooms);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  getAllDeleted: async (req, res) => {
    try {
      const categoryRooms = await getAllDataDeleted(CategoryRoom, [
        { roomTypes: "title" },
      ]);
      if (!categoryRooms.length) {
        return handleError404(res);
      }
      return handleSuccess200(res, categoryRooms);
    } catch (error) {
      return handleError500(res, req);
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const categoryRoom = await getDataById(CategoryRoom, id, [
        { roomTypes: "title" },
      ]);

      if (!categoryRoom) {
        return handleError404(res);
      }
      return handleSuccess200(res, categoryRoom);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const { title } = req.body;

      const findCategoryRoom = await getData(CategoryRoom, "title", title);

      if (findCategoryRoom) {
        return handleError409(res, `${title} already exists!`);
      }

      const newCategoryRoom = await createData(CategoryRoom, req.body);
      return handleSuccess201(res, newCategoryRoom);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;

      const findCategoryRoom = await getDataById(CategoryRoom, id);

      if (!findCategoryRoom) {
        return handleError404(res);
      }

      const updateCategoryRoom = await findByIdAndUpdateData(
        CategoryRoom,
        id,
        req.body
      );

      return handleSuccess200(res, updateCategoryRoom);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const findCategoryRoom = await getDataById(CategoryRoom, id);
      if (!findCategoryRoom) {
        return handleError404(res);
      }

      if (findCategoryRoom._id.toString() === env.DEFAULT_CATEGORY_ROOM) {
        return handleError409(res, "You cannot delete an uncategorized!");
      }

      const findRoomType = await getData(
        RoomType,
        "categoryRoomId",
        findCategoryRoom._id
      );

      if (findRoomType) {
        return handleError409(
          res,
          "Room type conflict, cannot be deleted due to other constraints"
        );
      }

      await deleteData(CategoryRoom, id);

      return handleSuccess200(res, id);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  restore: async (req, res) => {
    try {
      const { id } = req.params;

      const restoreCategoryRoom = await restoreData(CategoryRoom, id);

      if (!restoreCategoryRoom.matchedCount) {
        return handleError404(res);
      }

      const findCategoryRoom = await getDataById(CategoryRoom, id);

      return handleSuccess200(res, findCategoryRoom);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  forceDelete: async (req, res) => {
    const { id } = req.params;

    const findCategoryRoom = await CategoryRoom.findOne(
      { _id: id, deleted: true },
      null,
      {
        withDeleted: true,
      }
    );

    if (!findCategoryRoom) {
      return handleError404(res);
    }

    await forceDeleteData(CategoryRoom, id);

    return handleSuccess200(res, id);
  },
};

export default CategoryRoomController;
