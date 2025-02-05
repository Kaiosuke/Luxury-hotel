import {
  handleError404,
  handleError500,
  handleSuccess200,
  handleSuccess201,
} from "../../utils/helpers/handleStatusCode.js";
import View from "../models/View.js";
import { deleteData } from "../services/deleteService.js";
import { getAll, getById } from "../services/getService.js";
import { findByIdAndUpdate } from "../services/patchService.js";
import { create } from "../services/postService.js";

const ViewController = {
  getAll: async (req, res) => {
    try {
      const views = await getAll(View);

      if (!views.length) {
        return handleError404(res);
      }

      return handleSuccess200(req, views);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const view = await getById(View, id);

      if (!view) {
        return handleError404(res);
      }
    } catch (error) {
      return handleError500(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const newView = await create(req.body);
      return handleSuccess201(res, newView);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;

      const findView = await getById(View, id);

      if (!findView) {
        return handleError404(res);
      }

      const updateView = await findByIdAndUpdate(View, id);

      return handleSuccess200(res, updateView);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const findView = await getById(View, id);

      if (!findView) {
        return handleError404(res);
      }

      const data = await deleteData(View, id);
      console.log(data);
      return handleSuccess200(res, id);
    } catch (error) {
      return handleError500(res, error);
    }
  },
};
