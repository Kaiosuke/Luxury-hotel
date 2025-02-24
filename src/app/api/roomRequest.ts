import { IRoom } from "@/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instanceLocal from "./instances";

const getAllRoom = createAsyncThunk<IRoom[], string, { rejectValue: string }>(
  "rooms/getAllRoom",
  async (search, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get(`rooms/?search=${search}`);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const getAllRoomDeleted = createAsyncThunk<
  IRoom[],
  string,
  { rejectValue: string }
>("rooms/getAllRoomDeleted", async (search, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get(`rooms/deleted/?search=${search}`);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const getRoom = createAsyncThunk<IRoom, string, { rejectValue: string }>(
  "rooms/getRoom",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get(`rooms/${_id}`);
      return res.data.data;
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
      const res = await instanceLocal.post(`rooms/create`, room);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const updateRoom = createAsyncThunk<
  IRoom,
  {
    _id: string;
    room: IRoom;
  },
  { rejectValue: string }
>("rooms/updateRoom", async ({ _id, room }, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.patch(`rooms/update/${_id}`, room);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const deleteRoom = createAsyncThunk<string, string, { rejectValue: string }>(
  "rooms/deleteRoom",
  async (_id, { rejectWithValue }) => {
    try {
      await instanceLocal.delete(`rooms/delete/${_id}`);
      return _id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const restoreRoom = createAsyncThunk<IRoom, string, { rejectValue: string }>(
  "rooms/restoreRoom",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.patch(`rooms/restore/${_id}`);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const forceDeleteRoom = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("rooms/forceDeleteRoom", async (_id, { rejectWithValue }) => {
  try {
    await instanceLocal.delete(`rooms/delete/force/${_id}`);
    return _id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export {
  getAllRoom,
  getAllRoomDeleted,
  getRoom,
  addRoom,
  updateRoom,
  deleteRoom,
  restoreRoom,
  forceDeleteRoom,
};
