import { IRoom } from "@/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instanceLocal from "./instances";

const getAllRoom = createAsyncThunk<IRoom[], void, { rejectValue: string }>(
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

const getRoom = createAsyncThunk<IRoom, string, { rejectValue: string }>(
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

const addRoom = createAsyncThunk<IRoom, IRoom, { rejectValue: string }>(
  "rooms/addRoom",
  async (room, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.post(`rooms`, room);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        return rejectWithValue(error?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const updateRoom = createAsyncThunk<
  IRoom,
  { id: string; room: IRoom },
  { rejectValue: string }
>("rooms/updateRoom", async ({ id, room }, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.patch(`rooms/${id}`, room);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const deleteRoom = createAsyncThunk<string, string, { rejectValue: string }>(
  "rooms/deleteRoom",
  async (id, { rejectWithValue }) => {
    try {
      await instanceLocal.delete(`rooms/${id}`);
      return id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export { getAllRoom, getRoom, addRoom, updateRoom, deleteRoom };
