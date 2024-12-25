import { IUser } from "@/interfaces";
import { createAsyncThunk } from "./../../node_modules/@reduxjs/toolkit/src/createAsyncThunk";
import instanceLocal from "./instances";

const login = createAsyncThunk<IUser, IUser>(
  "auth/login",
  async (user: IUser) => {
    try {
      const res = await instanceLocal.post("login", user);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error: unknown) {
      console.log(error);
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
