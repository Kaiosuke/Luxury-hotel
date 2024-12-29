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

export { getAllRoomType, getRoomType };
