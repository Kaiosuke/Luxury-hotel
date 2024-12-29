import { IUser } from "@/interfaces";
import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instanceLocal from "./instances";

const getAllUser = createAsyncThunk<IUser[], void, { rejectValue: string }>(
  "users/getAllUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get("users");
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const getUser = createAsyncThunk<IUser, string, { rejectValue: string }>(
  "users/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get(`users/${id}`);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const addUser = createAsyncThunk<IUser, IUser, { rejectValue: string }>(
  "users/addUser",
  async (user, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.post(`users`, user);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const updateUser = createAsyncThunk<
  IUser,
  { id: string; user: IUser },
  { rejectValue: string }
>("users/updateUser", async ({ id, user }, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.patch(`users/${id}`, user);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const deleteUser = createAsyncThunk<string, string, { rejectValue: string }>(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.delete(`users/${id}`);
      return res.data.id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export { getAllUser, addUser, getUser, updateUser, deleteUser };
