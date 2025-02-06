import {
  handleError404,
  handleError409,
  handleError500,
  handleSuccess200,
  handleSuccess201,
} from "../../utils/helpers/handleStatusCode.js";
import CategoryRoom from "../models/CategoryRoom.js";
import { deleteData, forceDeleteData } from "../services/deleteService.js";
import { getData, getAllData, getDataById } from "../services/getService.js";
import {
  findByIdAndUpdateData,
  restoreData,
} from "../services/patchService.js";
import { createData } from "../services/postService.js";

const CategoryRoomController = {
  getAll: async (req, res) => {
    try {
      const CategoryRooms = await getAllData(CategoryRoom);

      if (!CategoryRooms.length) {
        return handleError404(res);
      }

      return handleSuccess200(res, CategoryRooms);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const categoryRoom = await getDataById(CategoryRoom, id);

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
        return handleError409(res, "CategoryRoom already exists!");
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

    const forceDeleteCategoryRoom = await forceDeleteData(CategoryRoom, id);

    if (!forceDeleteCategoryRoom.deletedCount) {
      return handleError404(res);
    }

    return handleSuccess200(res, id);
  },
};

export default CategoryRoomController;
