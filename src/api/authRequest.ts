import { IUser } from "@/interfaces";
import { createAsyncThunk } from "../../node_modules/@reduxjs/toolkit/src/createAsyncThunk";
import instanceLocal from "./instances";
import axios, { AxiosResponse } from "axios";

const login = createAsyncThunk<IUser, IUser, { rejectValue: string }>(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const res: AxiosResponse<IUser> = await instanceLocal.post<IUser>(
        "login",
        user
      );
      if (res.status === 200) {
        return res.data;
      }
      return rejectWithValue("Login failed: Invalid status code");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Error");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const register = createAsyncThunk<IUser, IUser>(
  "auth/register",
  async (user: IUser) => {
    try {
      const res = await instanceLocal.post("users/register", user);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }
);

export { login, register };
