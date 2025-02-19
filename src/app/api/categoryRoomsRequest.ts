import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instanceLocal from "./instances";
import { ICategoryRoom } from "@/interfaces";

const getAllCategoryRoom = createAsyncThunk<
  ICategoryRoom[],
  void,
  { rejectValue: string }
>("categoryRooms/getAllCategoryRoom", async (_, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get("category-rooms");
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const getAllCategoryRoomDeleted = createAsyncThunk<
  ICategoryRoom[],
  void,
  { rejectValue: string }
>("categoryRooms/getAllCategoryRoomDeleted", async (_, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get("category-rooms/deleted");
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const getCategoryRoom = createAsyncThunk<
  ICategoryRoom,
  string,
  { rejectValue: string }
>("categoryRooms/getCategoryRoom", async (_id, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get(`category-rooms/${_id}`);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const addCategoryRoom = createAsyncThunk<
  ICategoryRoom,
  ICategoryRoom,
  { rejectValue: string }
>(
  "categoryRooms/addCategoryRoom",
  async (categoryRoom, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.post(
        `category-rooms/create`,
        categoryRoom
      );
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        return rejectWithValue(error?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const updateCategoryRoom = createAsyncThunk<
  ICategoryRoom,
  { _id: string; categoryRoom: ICategoryRoom },
  { rejectValue: string }
>(
  "categoryRooms/updateCategoryRoom",
  async ({ _id, categoryRoom }, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.patch(
        `category-rooms/update/${_id}`,
        categoryRoom
      );
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const deleteCategoryRoom = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("categoryRooms/deleteCategoryRoom", async (_id, { rejectWithValue }) => {
  try {
    await instanceLocal.delete(`category-rooms/delete/${_id}`);
    return _id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const restoreCategoryRoom = createAsyncThunk<
  ICategoryRoom,
  ICategoryRoom,
  { rejectValue: string }
>("categoryRooms/restoreCategoryRoom", async (_id, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.patch(`category-rooms/restore/${_id}`);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const forceDeleteCategoryRoom = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("categoryRooms/forceDeleteCategoryRoom", async (_id, { rejectWithValue }) => {
  try {
    await instanceLocal.delete(`category-rooms/delete/force/${_id}`);
    return _id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export {
  getAllCategoryRoom,
  getAllCategoryRoomDeleted,
  getCategoryRoom,
  addCategoryRoom,
  updateCategoryRoom,
  deleteCategoryRoom,
  restoreCategoryRoom,
  forceDeleteCategoryRoom,
};
