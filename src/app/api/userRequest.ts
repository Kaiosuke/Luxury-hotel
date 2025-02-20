import { IUser } from "@/interfaces";
import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instanceLocal from "./instances";

const getAllUser = createAsyncThunk<IUser[], void, { rejectValue: string }>(
  "users/getAllUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get("users");
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const getAllUserDeleted = createAsyncThunk<
  IUser[],
  void,
  { rejectValue: string }
>("users/getAllUserDeleted", async (_, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.get("users/deleted");
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const getUser = createAsyncThunk<IUser, string, { rejectValue: string }>(
  "users/getUser",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get(`users/${_id}`);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const addUser = createAsyncThunk<IUser, IUser, { rejectValue: string }>(
  "users/addUser",
  async (user, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.post(`auth/register`, user);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const updateUser = createAsyncThunk<
  IUser,
  { _id: string; user: IUser },
  { rejectValue: string }
>("users/updateUser", async ({ _id, user }, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.patch(`users/update/${_id}`, user);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const deleteUser = createAsyncThunk<string, string, { rejectValue: string }>(
  "users/deleteUser",
  async (_id, { rejectWithValue }) => {
    try {
      await instanceLocal.delete(`users/delete/${_id}`);
      return _id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const restoreUser = createAsyncThunk<IUser, string, { rejectValue: string }>(
  "users/restoreUser",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.patch(`users/restore/${_id}`);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const forceDeleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("users/forceDeleteUser", async (_id, { rejectWithValue }) => {
  try {
    await instanceLocal.delete(`users/delete/force/${_id}`);
    return _id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export {
  getAllUser,
  getAllUserDeleted,
  addUser,
  getUser,
  updateUser,
  deleteUser,
  restoreUser,
  forceDeleteUser,
};
