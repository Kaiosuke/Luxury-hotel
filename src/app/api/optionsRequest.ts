import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instanceLocal from "./instances";
import { IOption } from "@/interfaces";

const getAllOption = createAsyncThunk<IOption[], void, { rejectValue: string }>(
  "options/getAllOption",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get("options");
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const getAllOptionDeleted = createAsyncThunk<
  IOption[],
  void,
  { rejectValue: string }
>("options/getAllOptionDeleted", async (_, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get("options/deleted");
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const getOption = createAsyncThunk<IOption, string, { rejectValue: string }>(
  "options/getOption",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get(`options/${_id}`);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const addOption = createAsyncThunk<IOption, IOption, { rejectValue: string }>(
  "options/addOption",
  async (option, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.post(`options/create`, option);
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

const updateOption = createAsyncThunk<
  IOption,
  { _id: string; option: IOption },
  { rejectValue: string }
>("options/updateOption", async ({ _id, option }, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.patch(`options/update/${_id}`, option);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const deleteOption = createAsyncThunk<string, string, { rejectValue: string }>(
  "options/deleteOption",
  async (_id, { rejectWithValue }) => {
    try {
      await instanceLocal.delete(`options/delete/${_id}`);
      return _id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const restoreOption = createAsyncThunk<
  IOption,
  IOption,
  { rejectValue: string }
>("options/restoreOption", async (_id, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.patch(`options/restore/${_id}`);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const forceDeleteOption = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("options/forceDeleteOption", async (_id, { rejectWithValue }) => {
  try {
    await instanceLocal.delete(`options/delete/force/${_id}`);
    return _id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export {
  getAllOption,
  getAllOptionDeleted,
  getOption,
  addOption,
  updateOption,
  deleteOption,
  restoreOption,
  forceDeleteOption,
};
