import { IUser } from "@/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instanceLocal from "./instances";
import axios from "axios";
import Cookies from "js-cookie";

const login = createAsyncThunk<IUser, IUser, { rejectValue: string }>(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.post("auth/login", data, {
        withCredentials: true,
      });

      Cookies.set("accessToken", res.data.data.accessToken, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });

      return res.data.data;
    } catch (error) {
      console.log(error);
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
      Cookies.remove("accessToken");
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const changePassword = createAsyncThunk<
  void,
  { id: string; data: { password: string; newPassword: string } },
  { rejectValue: string }
>("auth/changePassword", async ({ data, id }, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.post(`auth/change-password/${id}`, data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const forgotPassword = createAsyncThunk<
  void,
  { email: string },
  { rejectValue: string }
>("auth/changePassword", async (data, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.post(`auth/forgot-password`, data);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const resetPassword = createAsyncThunk<
  void,
  { token: string; data: { newPassword: string } },
  { rejectValue: string }
>("auth/reset", async ({ token, data }, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.post(`auth/reset-password/${token}`, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export { login, logout, changePassword, forgotPassword, resetPassword };
