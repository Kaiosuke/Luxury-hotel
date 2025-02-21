import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instanceLocal from "./instances";
import { IReview } from "@/interfaces";

const getAllReview = createAsyncThunk<
  IReview[],
  string,
  { rejectValue: string }
>("reviews/getAllReview", async (search, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get(`reviews/?search=${search}`);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const getAllReviewDeleted = createAsyncThunk<
  IReview[],
  string,
  { rejectValue: string }
>("reviews/getAllReviewDeleted", async (search, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get(`reviews/deleted/?search=${search}`);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const getReview = createAsyncThunk<IReview, string, { rejectValue: string }>(
  "reviews/getReview",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get(`reviews/${_id}`);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const addReview = createAsyncThunk<IReview, IReview, { rejectValue: string }>(
  "reviews/addReview",
  async (review, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.post(`reviews/create`, review);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const updateReview = createAsyncThunk<
  IReview,
  { _id: string; review: IReview },
  { rejectValue: string }
>("reviews/updateReview", async ({ _id, review }, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.patch(`reviews/update/${_id}`, review);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const deleteReview = createAsyncThunk<string, string, { rejectValue: string }>(
  "reviews/deleteReview",
  async (_id, { rejectWithValue }) => {
    try {
      await instanceLocal.delete(`reviews/delete/${_id}`);
      return _id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const restoreReview = createAsyncThunk<
  IReview,
  IReview,
  { rejectValue: string }
>("reviews/restoreReview", async (_id, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.patch(`reviews/restore/${_id}`);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const forceDeleteReview = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("reviews/forceDeleteReview", async (_id, { rejectWithValue }) => {
  try {
    await instanceLocal.delete(`reviews/delete/force/${_id}`);
    return _id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export {
  getAllReview,
  getAllReviewDeleted,
  getReview,
  addReview,
  updateReview,
  deleteReview,
  restoreReview,
  forceDeleteReview,
};
