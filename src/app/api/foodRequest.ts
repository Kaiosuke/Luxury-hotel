import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instanceLocal from "./instances";
import { IFood } from "@/interfaces";

const getAllFood = createAsyncThunk<IFood[], string, { rejectValue: string }>(
  "foods/getAllFood",
  async (search, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get(`foods/?search=${search}`);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const getAllFoodDeleted = createAsyncThunk<
  IFood[],
  string,
  { rejectValue: string }
>("foods/getAllFoodDeleted", async (search, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get(`foods/deleted/?search=${search}`);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const getFood = createAsyncThunk<IFood, string, { rejectValue: string }>(
  "foods/getFood",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get(`foods/${_id}`);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const addFood = createAsyncThunk<IFood, IFood, { rejectValue: string }>(
  "foods/addFood",
  async (food, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.post(`foods/create`, food);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const updateFood = createAsyncThunk<
  IFood,
  { _id: string; food: IFood },
  { rejectValue: string }
>("foods/updateFood", async ({ _id, food }, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.patch(`foods/update/${_id}`, food);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const deleteFood = createAsyncThunk<string, string, { rejectValue: string }>(
  "foods/deleteFood",
  async (_id, { rejectWithValue }) => {
    try {
      await instanceLocal.delete(`foods/delete/${_id}`);
      return _id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const restoreFood = createAsyncThunk<IFood, string, { rejectValue: string }>(
  "foods/restoreFood",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.patch(`foods/restore/${_id}`);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const forceDeleteFood = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("foods/forceDeleteFood", async (_id, { rejectWithValue }) => {
  try {
    await instanceLocal.delete(`foods/delete/force/${_id}`);
    return _id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export {
  getAllFood,
  getAllFoodDeleted,
  getFood,
  addFood,
  updateFood,
  deleteFood,
  restoreFood,
  forceDeleteFood,
};
