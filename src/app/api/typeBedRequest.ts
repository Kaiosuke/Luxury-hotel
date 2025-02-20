import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instanceLocal from "./instances";
import { ITypeBed } from "@/interfaces";

const getAllTypeBed = createAsyncThunk<
  ITypeBed[],
  void,
  { rejectValue: string }
>("typeBeds/getAllTypeBeds", async (_, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get("type-beds");
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const getAllTypeBedDeleted = createAsyncThunk<
  ITypeBed[],
  void,
  { rejectValue: string }
>("typeBeds/getAllTypeBedDeleted", async (_, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get("type-beds/deleted");
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const getTypeBed = createAsyncThunk<ITypeBed, string, { rejectValue: string }>(
  "typeBeds/getTypeBed",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get(`type-beds/${_id}`);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const addTypeBed = createAsyncThunk<
  ITypeBed,
  ITypeBed,
  { rejectValue: string }
>("typeBeds/addTypeBed", async (typeBed, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.post(`type-beds/create`, typeBed);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const updateTypeBed = createAsyncThunk<
  ITypeBed,
  { _id: string; typeBed: ITypeBed },
  { rejectValue: string }
>("typeBeds/updateTypeBed", async ({ _id, typeBed }, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.patch(`type-beds/update/${_id}`, typeBed);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const deleteTypeBed = createAsyncThunk<string, string, { rejectValue: string }>(
  "typeBeds/deleteTypeBed",
  async (_id, { rejectWithValue }) => {
    try {
      await instanceLocal.delete(`type-beds/delete/${_id}`);
      return _id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.response?.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const restoreTypeBed = createAsyncThunk<
  ITypeBed,
  string,
  { rejectValue: string }
>("typeBeds/restoreTypeBed", async (_id, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.patch(`type-beds/restore/${_id}`);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const forceDeleteTypeBed = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("typeBeds/forceDeleteTypeBed", async (_id, { rejectWithValue }) => {
  try {
    await instanceLocal.delete(`type-beds/delete/force/${_id}`);
    return _id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export {
  getAllTypeBed,
  getAllTypeBedDeleted,
  getTypeBed,
  addTypeBed,
  updateTypeBed,
  deleteTypeBed,
  restoreTypeBed,
  forceDeleteTypeBed,
};
