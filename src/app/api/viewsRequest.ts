import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instanceLocal from "./instances";
import { IView } from "@/interfaces";

const getAllView = createAsyncThunk<IView[], void, { rejectValue: string }>(
  "views/getAllViews",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get("views");
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const getAllViewDeleted = createAsyncThunk<
  IView[],
  void,
  { rejectValue: string }
>("views/getAllViewDeleted", async (_, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get("views/deleted");
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const getView = createAsyncThunk<IView, string, { rejectValue: string }>(
  "views/getView",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get(`views/${_id}`);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const addView = createAsyncThunk<IView, IView, { rejectValue: string }>(
  "views/addView",
  async (view, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.post(`views/create`, view);
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

const updateView = createAsyncThunk<
  IView,
  { _id: string; view: IView },
  { rejectValue: string }
>("views/updateView", async ({ _id, view }, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.patch(`views/update/${_id}`, view);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const deleteView = createAsyncThunk<string, string, { rejectValue: string }>(
  "views/deleteView",
  async (_id, { rejectWithValue }) => {
    try {
      await instanceLocal.delete(`views/delete/${_id}`);
      return _id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const restoreView = createAsyncThunk<IView, IView, { rejectValue: string }>(
  "views/restoreView",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.patch(`views/restore/${_id}`);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const forceDeleteView = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("views/forceDeleteView", async (_id, { rejectWithValue }) => {
  try {
    await instanceLocal.delete(`views/delete/force/${_id}`);
    return _id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export {
  getAllView,
  getAllViewDeleted,
  getView,
  addView,
  updateView,
  deleteView,
  restoreView,
  forceDeleteView,
};
