import {
  handleError404,
  handleError404WithData,
  handleError409,
  handleError500,
  handleSuccess200,
  handleSuccess201,
} from "../../utils/helpers/handleStatusCode.js";
import env from "../config/envConfig.js";
import Option from "../models/Option.js";
import Food from "../models/Food.js";
import Cart from "../models/Cart.js";
import { deleteData, forceDeleteData } from "../services/deleteService.js";
import { getAllData, getData, getDataById } from "../services/getService.js";
import {
  findByIdAndPullData,
  findByIdAndPushData,
  findByIdAndUpdateData,
  restoreData,
} from "../services/patchService.js";
import { createData } from "../services/postService.js";

const OptionController = {
  getAll: async (req, res) => {
    try {
      const options = await getAllData(Option, [{ foodId: "title" }]);
      if (!options.length) {
        return handleError404(res);
      }
      return handleSuccess200(res, options);
    } catch (error) {
      return handleError500(res, error);
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const findOption = await getDataById(Option, id, [{ foodId: "title" }]);
      if (!findOption) {
        return handleError404(res);
      }
    } catch (error) {
      return handleError500(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const { foodId } = req.body;

      const findFood = await getDataById(Food, foodId);
      if (!findFood) {
        return handleError404WithData(res, "food");
      }

      const newFood = await createData(Option, req.body);
      await findByIdAndPushData(Food, findFood._id, "options", newFood._id);

      return handleSuccess201(res, newFood);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { foodId } = req.body;

      const findOption = await getDataById(Option, id);
      if (!findOption) {
        return handleError404(res);
      }
      const findFood = await getDataById(Food, foodId);

      if (!findFood) {
        return handleError404WithData(res, "food");
      }

      const updateOption = await findByIdAndUpdateData(Option, id, req.body);

      if (foodId !== findOption.foodId.toString()) {
        await findByIdAndPullData(
          Food,
          findOption.foodId,
          "options",
          updateOption._id
        );

        await findByIdAndPushData(
          Food,
          updateOption.foodId,
          "options",
          updateOption._id
        );
      }
      return handleSuccess200(res, updateOption);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const findOption = await getDataById(Option, id);

      if (!findOption) {
        return handleError404(res);
      }

      if (findOption._id.toString() === env.DEFAULT_OPTION) {
        return handleError409(res, "You cannot delete an uncategorized!");
      }

      // await Cart.updateMany(
      //   { _id: { $in: findOption.carts } },
      //   { $set: { optionId: env.DEFAULT_OPTION } }
      // );

      // await Option.updateOne(
      //   { _id: env.DEFAULT_OPTION },
      //   { $push: { carts: { $each: findOption.carts } } }
      // );

      const findCart = await getData(Cart, "optionId", id);

      if (findCart) {
        return handleError409(
          res,
          "Cart type conflict, cannot be deleted due to other constraints"
        );
      }

      await findByIdAndPullData(Food, findOption.foodId, "options", id);

      await deleteData(Option, id);

      return handleSuccess200(res, id);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  restore: async (req, res) => {
    try {
      const { id } = req.params;

      const restoreOption = await restoreData(Option, id);

      if (!restoreOption.matchedCount) {
        return handleError404(res);
      }

      const findOption = await getDataById(Option, id);

      const findFood = await findByIdAndPushData(
        Food,
        findOption.foodId,
        "options",
        id
      );

      if (!findFood) {
        findOption.foodId = env.DEFAULT_FOOD;
        await findByIdAndPushData(Food, env.DEFAULT_FOOD, "options", id);
      }

      findOption.save();
      return handleSuccess200(res, findOption);
    } catch (error) {
      return handleError500(res, error);
    }
  },
  forceDelete: async (req, res) => {
    try {
      const { id } = req.params;

      const findOption = await Option.findOne(
        { _id: id, deleted: true },
        null,
        {
          withDeleted: true,
        }
      );

      if (!findOption) {
        return handleError404(res);
      }

      await forceDeleteData(Option, id);

      return handleSuccess200(res, id);
    } catch (error) {
      return handleError500(res, error);
    }
  },
};

export default OptionController;
