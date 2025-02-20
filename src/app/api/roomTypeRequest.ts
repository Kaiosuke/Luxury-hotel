import { createAsyncThunk } from "@reduxjs/toolkit";
import instanceLocal from "./instances";
import axios from "axios";
import { IRoomType } from "@/interfaces";

const getAllRoomType = createAsyncThunk<
  IRoomType[],
  string,
  { rejectValue: string }
>("roomTypes/getAllRoomType", async (search, { rejectWithValue }) => {
  try {
    console.log(search);
    const res = await instanceLocal.get(`room-types/?search=${search}`);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const getAllRoomTypeDeleted = createAsyncThunk<
  IRoomType[],
  void,
  { rejectValue: string }
>("roomTypes/getAllRoomTypeDeleted", async (_, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get("room-types/deleted");
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const getRoomType = createAsyncThunk<
  IRoomType,
  string,
  { rejectValue: string }
>("roomTypes/getRoomType", async (_id, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get(`room-types/${_id}`);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const addRoomType = createAsyncThunk<
  IRoomType,
  IRoomType,
  { rejectValue: string }
>("roomTypes/addRoomType", async (roomType, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.post(`room-types/create`, roomType);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const updateRoomType = createAsyncThunk<
  IRoomType,
  { _id: string; roomType: IRoomType },
  { rejectValue: string }
>(
  "roomTypes/updateRoomType",
  async ({ _id, roomType }, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.patch(
        `room-types/update/${_id}`,
        roomType
      );
      return res.data.data;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const deleteRoomType = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("roomTypes/deleteRoomType", async (_id, { rejectWithValue }) => {
  try {
    await instanceLocal.delete(`room-types/delete/${_id}`);
    return _id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const restoreRoomType = createAsyncThunk<
  IRoomType,
  string,
  { rejectValue: string }
>("roomTypes/restoreRoomType", async (_id, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.patch(`room-types/restore/${_id}`);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const forceDeleteRoomType = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("roomTypes/forceDeleteRoomType", async (_id, { rejectWithValue }) => {
  try {
    await instanceLocal.delete(`room-types/delete/force/${_id}`);
    return _id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export {
  getAllRoomType,
  getAllRoomTypeDeleted,
  getRoomType,
  addRoomType,
  updateRoomType,
  deleteRoomType,
  restoreRoomType,
  forceDeleteRoomType,
};
