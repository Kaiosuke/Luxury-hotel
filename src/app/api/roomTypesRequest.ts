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
    const res = await instanceLocal.get("roomTypes");
    return res.data;
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
>("roomTypes/getRoomType", async (id, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get(`roomTypes/${id}`);
    return res.data;
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
    const res = await instanceLocal.post(`roomTypes`, roomType);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      return rejectWithValue(error?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const updateRoomType = createAsyncThunk<
  IRoomType,
  { id: string; roomType: IRoomType },
  { rejectValue: string }
>("roomTypes/updateRoomType", async ({ id, roomType }, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.patch(`roomTypes/${id}`, roomType);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const deleteRoomType = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("roomTypes/deleteRoomType", async (id, { rejectWithValue }) => {
  try {
    await instanceLocal.delete(`roomTypes/${id}`);
    return id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.message);
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
