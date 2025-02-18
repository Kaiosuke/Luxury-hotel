import { createAsyncThunk } from "@reduxjs/toolkit";
import instanceLocal from "./instances";
import axios from "axios";
import { IRoomType } from "@/interfaces";

const getAllRoomType = createAsyncThunk<
  IRoomType[],
  void,
  { rejectValue: string }
>("roomTypes/getAllRoomType", async (_, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get("room-types");
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message);
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
    const res = await instanceLocal.post(`room-types`, roomType);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
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
      const res = await instanceLocal.patch(`room-types/${_id}`, roomType);
      return res.data.data;
    } catch (error) {
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

export {
  getAllRoomType,
  getRoomType,
  addRoomType,
  updateRoomType,
  deleteRoomType,
};
