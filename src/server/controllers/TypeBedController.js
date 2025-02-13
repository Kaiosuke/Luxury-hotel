import {
  handleError404,
  handleError409,
  handleError500,
  handleSuccess200,
  handleSuccess201,
} from "../../utils/helpers/handleStatusCode.js";
import env from "../config/envConfig.js";
import RoomType from "../models/RoomType.js";
import TypeBed from "../models/TypeBed.js";
import { deleteData, forceDeleteData } from "../services/deleteService.js";
import { getData, getAllData, getDataById } from "../services/getService.js";
import {
  findByIdAndUpdateData,
  restoreData,
} from "../services/patchService.js";
import { createData } from "../services/postService.js";

const TypeBedController = {
  getAll: async (req, res) => {
    try {
      const typeBeds = await getAllData(TypeBed, [{ roomTypes: "title" }]);

      if (!typeBeds.length) {
        return handleError404(res);
      }

      return handleSuccess200(res, typeBeds);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const typeBed = await getDataById(TypeBed, id, [{ roomTypes: "title" }]);

      if (!typeBed) {
        return handleError404(res);
      }
      return handleSuccess200(res, typeBed);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const { title } = req.body;

      const findTypeBed = await getData(TypeBed, "title", title);

      if (findTypeBed) {
        return handleError409(res, `${title} already exists!`);
      }

      const newTypeBed = await createData(TypeBed, req.body);
      return handleSuccess201(res, newTypeBed);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;

      const findTypeBed = await getDataById(TypeBed, id);

      if (!findTypeBed) {
        return handleError404(res);
      }

      const updateTypeBed = await findByIdAndUpdateData(TypeBed, id, req.body);

      return handleSuccess200(res, updateTypeBed);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const findTypeBed = await getDataById(TypeBed, id);

      if (!findTypeBed) {
        return handleError404(res);
      }

      if (findTypeBed._id.toString() === env.DEFAULT_TYPE_BED) {
        return handleError409(res, "You cannot delete an uncategorized!");
      }

      const findRoomType = await getData(
        RoomType,
        "typeBedId",
        findTypeBed._id
      );

      if (findRoomType) {
        return handleError409(
          res,
          "Room type conflict, cannot be deleted due to other constraints"
        );
      }

      await deleteData(TypeBed, id);

      return handleSuccess200(res, id);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  restore: async (req, res) => {
    try {
      const { id } = req.params;

      const restoreTypeBed = await restoreData(TypeBed, id);

      if (!restoreTypeBed.matchedCount) {
        return handleError404(res);
      }

      const findTypeBed = await getDataById(TypeBed, id);

      return handleSuccess200(res, findTypeBed);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  forceDelete: async (req, res) => {
    const { id } = req.params;

    const findTypeBed = await TypeBed.findOne(
      { _id: id, deleted: true },
      null,
      {
        withDeleted: true,
      }
    );

    if (!findTypeBed) {
      return handleError404(res);
    }

    await forceDeleteData(TypeBed, id);

    return handleSuccess200(res, id);
  },
};

export default TypeBedController;
