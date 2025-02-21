import {
  handleError404,
  handleError404WithData,
  handleError500,
  handleSuccess200,
  handleSuccess201,
} from "../../utils/helpers/handleStatusCode.js";
import env from "../config/envConfig.js";
import {
  getAllData,
  getAllDataDeleted,
  getDataById,
} from "../services/getService.js";
import Review from "../models/Review.js";
import User from "../models/User.js";
import RoomType from "../models/RoomType.js";
import { createData } from "../services/postService.js";
import {
  findByIdAndPullData,
  findByIdAndPushData,
  findByIdAndUpdateData,
  restoreData,
} from "../services/patchService.js";
import { deleteData, forceDeleteData } from "../services/deleteService.js";

const ReviewController = {
  getAll: async (req, res) => {
    try {
      const search = req.query.search || "";

      const reviews = await getAllData(
        Review,
        [{ userId: "username" }, { roomTypeId: "title" }],
        search.trim()
      );
      return handleSuccess200(res, reviews);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  getAllDeleted: async (req, res) => {
    try {
      const search = req.query.search || "";

      const reviews = await getAllDataDeleted(
        Review,
        [{ userId: "username" }, { roomTypeId: "title" }],
        search.trim()
      );

      return handleSuccess200(res, reviews);
    } catch (error) {
      return handleError500(res, req);
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const review = await getDataById(Review, id, [
        { userId: "username" },
        { roomTypeId: "title" },
      ]);
      if (!review) {
        return handleError404(res);
      }
      return handleSuccess200(res, review);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const { userId, roomTypeId } = req.body;

      const findUser = await getDataById(User, userId);
      if (!findUser) {
        return handleError404WithData(res, "user");
      }

      const findRoomType = await getDataById(RoomType, roomTypeId);
      if (!findRoomType) {
        return handleError404WithData(res, "roomType");
      }

      const newReview = await createData(Review, req.body, [
        { userId: "username" },
        { roomTypeId: "title" },
      ]);

      await findByIdAndPushData(User, userId, "reviews", newReview._id);
      await findByIdAndPushData(RoomType, roomTypeId, "reviews", newReview._id);

      return handleSuccess201(res, newReview);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { userId, roomTypeId } = req.body;

      const findReview = await getDataById(Review, id);
      if (!findReview) {
        return handleError404(res);
      }

      const findUser = await getDataById(User, userId);
      if (!findUser) {
        return handleError404WithData(res, "user");
      }

      const findRoomType = await getDataById(RoomType, roomTypeId);
      if (!findRoomType) {
        return handleError404WithData(res, "roomType");
      }

      const updateReview = await findByIdAndUpdateData(Review, id, req.body, [
        { userId: "username" },
        { roomTypeId: "title" },
      ]);

      if (findReview.userId !== userId) {
        await findByIdAndPullData(
          User,
          findReview.userId,
          "reviews",
          updateReview._id
        );
        await findByIdAndPushData(User, userId, "reviews", updateReview._id);
      }

      if (findReview.roomTypeId !== roomTypeId) {
        await findByIdAndPullData(
          RoomType,
          findReview.roomTypeId,
          "reviews",
          updateReview._id
        );
        await findByIdAndPushData(
          RoomType,
          roomTypeId,
          "reviews",
          updateReview._id
        );
      }

      await handleSuccess201(res, updateReview);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const findReview = await getDataById(Review, id);
      if (!findReview) {
        return handleError404(res);
      }
      await deleteData(Review, id);
      await findByIdAndPullData(
        User,
        findReview.userId,
        "reviews",
        findReview._id
      );

      await findByIdAndPullData(
        RoomType,
        findReview.roomTypeId,
        "reviews",
        findReview._id
      );
      return handleSuccess200(res, id);
    } catch (error) {
      return handleError500(res, error);
    }
  },

  restore: async (req, res) => {
    try {
      const { id } = req.params;

      const restoreReview = await restoreData(Review, id);

      if (!restoreReview.matchedCount) {
        return handleError404(res);
      }

      const findReview = await getDataById(Review, id, [
        { userId: "username" },
        { roomTypeId: "title" },
      ]);

      const findUser = await findByIdAndPushData(
        User,
        findReview.userId,
        "reviews",
        findReview._id
      );

      if (!findUser) {
        findReview.userId = env.DEFAULT_USER;
        await findByIdAndPushData(
          User,
          env.DEFAULT_USER,
          "reviews",
          findReview._id
        );
      }

      const findRoomType = await findByIdAndPushData(
        RoomType,
        findReview.roomTypeId,
        "reviews",
        findReview._id
      );
      if (!findRoomType) {
        findReview.roomTypeId = env.DEFAULT_ROOM_TYPE;
        await findByIdAndPushData(
          RoomType,
          env.DEFAULT_ROOM_TYPE,
          "reviews",
          findReview._id
        );
      }
      findReview.save();
      return handleSuccess200(res, findReview);
    } catch (error) {
      return handleError500(res, error);
    }
  },
  forceDelete: async (req, res) => {
    try {
      const { id } = req.params;

      const findReview = await Review.findOne(
        { _id: id, deleted: true },
        null,
        {
          withDeleted: true,
        }
      );

      if (!findReview) {
        return handleError404(res);
      }

      await forceDeleteData(Review, id);

      return handleSuccess200(res, id);
    } catch (error) {
      return handleError500(res, error);
    }
  },
};

export default ReviewController;
