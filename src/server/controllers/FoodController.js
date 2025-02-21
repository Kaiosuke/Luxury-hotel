import {
  handleError404,
  handleError409,
  handleError500,
  handleSuccess200,
  handleSuccess201,
} from "../../utils/helpers/handleStatusCode.js";
import env from "../config/envConfig.js";
import Food from "../models/Food.js";
import Option from "../models/Option.js";
import { deleteData, forceDeleteData } from "../services/deleteService.js";
import {
  getAllData,
  getAllDataDeleted,
  getData,
  getDataById,
} from "../services/getService.js";
import {
  findByIdAndUpdateData,
  restoreData,
} from "../services/patchService.js";
import { createData } from "../services/postService.js";

const FoodController = {
  getAll: async (req, res) => {
    try {
      const search = req.query.search || "";
      const foods = await getAllData(
        Food,
        [{ options: "title" }],
        search.trim()
      );
      return handleSuccess200(res, foods);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  getAllDeleted: async (req, res) => {
    try {
      const search = req.query.search || "";

      const foods = await getAllDataDeleted(
        Food,
        [{ options: "title" }],
        search.trim()
      );
      return handleSuccess200(res, foods);
    } catch (error) {
      return handleError500(res, req);
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const findFood = await getDataById(Food, id, [{ options: "title" }]);
      if (!findFood) {
        return handleError404(res);
      }
      return handleSuccess200(res, findFood);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const { title } = req.body;

      const findFood = await getData(Food, "title", title);
      if (findFood) {
        return handleError409(res, `${title} already exists!`);
      }
      const newFood = await createData(Food, req.body, [{ options: "title" }]);
      return handleSuccess201(res, newFood);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const findFood = await getDataById(Food, id);
      if (!findFood) {
        return handleError404(res);
      }
      const updateFood = await findByIdAndUpdateData(Food, id, req.body, [
        { options: "title" },
      ]);
      return handleSuccess200(res, updateFood);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const findFood = await getDataById(Food, id);
      if (!findFood) {
        return handleError404(res);
      }

      if (id === env.DEFAULT_FOOD) {
        return handleError409(res, "You cannot delete an uncategorized!");
      }

      const findOption = await getData(Option, "foodId", id);

      if (findOption) {
        return handleError409(
          res,
          "Option conflict, cannot be deleted due to other constraints"
        );
      }

      await deleteData(Food, id);

      return handleSuccess200(res, id);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  restore: async (req, res) => {
    try {
      const { id } = req.params;

      const restoreFOod = await restoreData(Food, id);

      if (!restoreFOod.matchedCount) {
        return handleError404(res);
      }

      const findRoom = await getDataById(Food, id, [{ options: "title" }]);

      return handleSuccess200(res, findRoom);
    } catch (error) {
      return handleError500(res, error);
    }
  },
  forceDelete: async (req, res) => {
    try {
      const { id } = req.params;

      const findFood = await Food.findOne({ _id: id, deleted: true }, null, {
        withDeleted: true,
      });

      if (!findFood) {
        return handleError404(res);
      }

      await forceDeleteData(Food, id);

      return handleSuccess200(res, id);
    } catch (error) {
      return handleError500(res, error);
    }
  },
};

export default FoodController;
