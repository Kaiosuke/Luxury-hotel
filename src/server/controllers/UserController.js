import {
  handleError404,
  handleError500,
  handleSuccess200,
} from "../../utils/helpers/handleStatusCode.js";
import User from "../models/User.js";

import { getAll, getById } from "../services/getService.js";

const UserController = {
  getAll: async (req, res) => {
    try {
      const users = await getAll(User);
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
      const user = await getById(User, id);
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
