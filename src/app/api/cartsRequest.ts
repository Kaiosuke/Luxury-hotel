import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instanceLocal from "./instances";
import { ICart } from "@/interfaces";

const getAllCart = createAsyncThunk<ICart[], void, { rejectValue: string }>(
  "carts/getAllCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get(`carts`);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const getAllCartByUserId = createAsyncThunk<
  ICart[],
  string,
  { rejectValue: string }
>("carts/getAllCartByUserId", async (userId, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get(`carts?userId=${userId}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const getCart = createAsyncThunk<ICart, string, { rejectValue: string }>(
  "carts/getCart",
  async (id, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get(`carts/${id}`);
      return res.data;
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
      const res = await instanceLocal.post(`carts`, cart);
      return res.data;
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
  { id: string; cart: ICart },
  { rejectValue: string }
>("carts/updateCart", async ({ id, cart }, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.patch(`carts/${id}`, cart);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const deleteCart = createAsyncThunk<string, string, { rejectValue: string }>(
  "carts/deleteCart",
  async (id, { rejectWithValue }) => {
    try {
      await instanceLocal.delete(`carts/${id}`);
      return id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export {
  getAllCart,
  getAllCartByUserId,
  getCart,
  addCart,
  updateCart,
  deleteCart,
};
