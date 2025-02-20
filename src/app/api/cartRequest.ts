import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instanceLocal from "./instances";
import { ICart } from "@/interfaces";

const getAllCart = createAsyncThunk<ICart[], void, { rejectValue: string }>(
  "carts/getAllCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get(`carts`);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const getAllCartDeleted = createAsyncThunk<
  ICart[],
  void,
  { rejectValue: string }
>("carts/getAllCartDeleted", async (_, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get("carts/deleted");
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const getAllCartByUserId = createAsyncThunk<
  ICart[],
  string,
  { rejectValue: string }
>("carts/getAllCartByUserId", async (userId, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get(`carts?userId=${userId}`);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const getCart = createAsyncThunk<ICart, string, { rejectValue: string }>(
  "carts/getCart",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get(`carts/${_id}`);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const addCart = createAsyncThunk<any, any, { rejectValue: string }>(
  "carts/addCart",
  async (cart, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.post(`carts/create`, cart);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const updateCart = createAsyncThunk<
  ICart,
  { _id: string; cart: ICart },
  { rejectValue: string }
>("carts/updateCart", async ({ _id, cart }, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.patch(`carts/update/${_id}`, cart);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const deleteCart = createAsyncThunk<string, string, { rejectValue: string }>(
  "carts/deleteCart",
  async (_id, { rejectWithValue }) => {
    try {
      await instanceLocal.delete(`carts/delete/${_id}`);
      return _id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const restoreCart = createAsyncThunk<ICart, ICart, { rejectValue: string }>(
  "carts/restoreCart",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.patch(`carts/restore/${_id}`);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const forceDeleteCart = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("carts/forceDeleteCart", async (_id, { rejectWithValue }) => {
  try {
    await instanceLocal.delete(`carts/delete/force/${_id}`);
    return _id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export {
  getAllCart,
  getAllCartDeleted,
  getAllCartByUserId,
  getCart,
  addCart,
  updateCart,
  deleteCart,
  restoreCart,
  forceDeleteCart,
};
