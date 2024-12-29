import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instanceLocal from "./instances";
import { ICarts } from "@/interfaces";

const getAllCart = createAsyncThunk<ICarts[], void, { rejectValue: string }>(
  "carts/getAllCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get("carts");
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const getCart = createAsyncThunk<ICarts, string, { rejectValue: string }>(
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

const addCart = createAsyncThunk<ICarts, ICarts, { rejectValue: string }>(
  "carts/addCart",
  async (user, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.post(`carts`, user);
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
  ICarts,
  { id: string; user: ICarts },
  { rejectValue: string }
>("carts/updateCart", async ({ id, user }, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.patch(`carts/${id}`, user);
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
      const res = await instanceLocal.delete(`carts/${id}`);
      return res.data.id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export { getAllCart, getCart, addCart, updateCart, deleteCart };
