import { IUser } from "@/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import instanceLocal from "./instances";

const loginUser = createAsyncThunk<
  IUser,
  { user: IUser },
  { rejectValue: string }
>("auth/login", async ({ user }, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.post("login", user);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
  return rejectWithValue("An unexpected error occurred");
});

const registerUser = createAsyncThunk<IUser[], IUser>(
  "users/register",
  async (user, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.post("register", user);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (!axiosError.response) {
        throw error;
      }
      return rejectWithValue(axiosError.response.data || "Failed to register");
    }
  }
);

export { loginUser, registerUser };
