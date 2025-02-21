import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instanceLocal from "./instances";
import { IPayment } from "@/interfaces";

const getAllPayment = createAsyncThunk<
  IPayment[],
  string,
  { rejectValue: string }
>("payments/getAllPayment", async (search, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get(`payments/?search=${search}`);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const getAllPaymentDeleted = createAsyncThunk<
  IPayment[],
  string,
  { rejectValue: string }
>("payments/getAllPaymentDeleted", async (search, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get(`payments/deleted/?search=${search}`);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const getPayment = createAsyncThunk<IPayment, string, { rejectValue: string }>(
  "payments/getPayment",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get(`payments/${_id}`);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const addPayment = createAsyncThunk<
  IPayment,
  IPayment,
  { rejectValue: string }
>("payments/addPayment", async (payment, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.post(`payments/create`, payment);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const updatePayment = createAsyncThunk<
  IPayment,
  { _id: string; payment: IPayment },
  { rejectValue: string }
>("payments/updatePayment", async ({ _id, payment }, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.patch(`payments/update/${_id}`, payment);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const deletePayment = createAsyncThunk<string, string, { rejectValue: string }>(
  "payments/deletePayment",
  async (_id, { rejectWithValue }) => {
    try {
      await instanceLocal.delete(`payments/delete/${_id}`);
      return _id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const restorePayment = createAsyncThunk<
  IPayment,
  IPayment,
  { rejectValue: string }
>("payments/restorePayment", async (_id, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.patch(`payments/restore/${_id}`);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const forceDeletePayment = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("payments/forceDeletePayment", async (_id, { rejectWithValue }) => {
  try {
    await instanceLocal.delete(`payments/delete/force/${_id}`);
    return _id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export {
  getAllPayment,
  getAllPaymentDeleted,
  getPayment,
  addPayment,
  updatePayment,
  deletePayment,
  restorePayment,
  forceDeletePayment,
};
