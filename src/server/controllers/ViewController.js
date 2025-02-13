import {
  handleError404,
  handleError409,
  handleError500,
  handleSuccess200,
  handleSuccess201,
} from "../../utils/helpers/handleStatusCode.js";
import env from "../config/envConfig.js";
import RoomType from "../models/RoomType.js";
import View from "../models/View.js";
import { deleteData, forceDeleteData } from "../services/deleteService.js";
import { getData, getAllData, getDataById } from "../services/getService.js";
import {
  findByIdAndUpdateData,
  restoreData,
} from "../services/patchService.js";
import { createData } from "../services/postService.js";

const ViewController = {
  getAll: async (req, res) => {
    try {
      const views = await getAllData(View, [{ roomTypes: "title" }]);

      if (!views.length) {
        return handleError404(res);
      }

      return handleSuccess200(res, views);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const view = await getDataById(View, id, [{ roomTypes: "title" }]);

      if (!view) {
        return handleError404(res);
      }
      return handleSuccess200(res, view);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const { title } = req.body;

      const findView = await getData(View, "title", title);

      if (findView) {
        return handleError409(res, `${title} already exists!`);
      }

      const newView = await createData(View, req.body);
      return handleSuccess201(res, newView);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;

      const findView = await getDataById(View, id);

      if (!findView) {
        return handleError404(res);
      }

      const updateView = await findByIdAndUpdateData(View, id, req.body);

      return handleSuccess200(res, updateView);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const findView = await getDataById(View, id);

      if (!findView) {
        return handleError404(res);
      }

      if (findView._id.toString() === env.DEFAULT_VIEW) {
        return handleError409(res, "You cannot delete an uncategorized!");
      }

      const findRoomType = await getData(RoomType, "viewId", findView._id);

      if (findRoomType) {
        return handleError409(
          res,
          "Room type conflict, cannot be deleted due to other constraints"
        );
      }

      await deleteData(View, id);

      return handleSuccess200(res, id);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  restore: async (req, res) => {
    try {
      const { id } = req.params;

      const restoreView = await restoreData(View, id);

      if (!restoreView.matchedCount) {
        return handleError404(res);
      }

      const findView = await getDataById(View, id);

      return handleSuccess200(res, findView);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  forceDelete: async (req, res) => {
    const { id } = req.params;

    const findView = await View.findOne({ _id: id, deleted: true }, null, {
      withDeleted: true,
    });

    if (!findView) {
      return handleError404(res);
    }

    await forceDeleteData(View, id);

    return handleSuccess200(res, id);
  },
};

export default ViewController;
