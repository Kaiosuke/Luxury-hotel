import { IUser } from "@/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instanceLocal from "./instances";
import axios from "axios";

const login = createAsyncThunk<IUser, IUser, { rejectValue: string }>(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.post("auth/login", data);
      localStorage.setItem("accessToken", res.data.data.accessToken);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const logout = createAsyncThunk<IUser, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.post("auth/logout");
      localStorage.removeItem("accessToken");
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export { login, logout };
