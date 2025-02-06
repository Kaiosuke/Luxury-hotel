import {
  handleError404,
  handleError500,
  handleSuccess200,
} from "../../utils/helpers/handleStatusCode.js";
import User from "../models/User.js";

import { getAllData, getDataById } from "../services/getService.js";

const UserController = {
  getAll: async (req, res) => {
    try {
      const users = await getAllData(User);
      if (!users.length) {
        return handleError404(res);
      }
      return handleSuccess200(res, users);
    } catch (error) {
      return handleError500(res, req);
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await getDataById(User, id);
      if (!user) {
        return handleError404(res);
      }
      return handleSuccess200(res, user);
    } catch (error) {
      return handleError500(res, req);
    }
  },
};

export default UserController;
