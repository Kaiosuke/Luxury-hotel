import { IRooms, IRoomTypes } from "@/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instanceLocal from "./instances";

const getAllRoom = createAsyncThunk<IRooms[], void, { rejectValue: string }>(
  "rooms/getAllRoom",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get("rooms");
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const getRoom = createAsyncThunk<IRooms, string, { rejectValue: string }>(
  "rooms/getRoom",
  async (id, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get(`rooms/${id}`);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export { getAllRoom, getRoom };
