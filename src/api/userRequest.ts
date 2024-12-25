import { IUser } from "@/interfaces";
import { createAsyncThunk } from "./../../node_modules/@reduxjs/toolkit/src/createAsyncThunk";
import instanceLocal from "./instances";
import { AxiosError } from "axios";

const getAllUser = createAsyncThunk<IUser>("user/getAllUser", async () => {
  try {
    const res = await instanceLocal.get("users");
    if (res.status === 200) {
      return res.data;
    }
  } catch (error: unknown) {
    console.log(error);
    return error;
  }
});

const getUser = createAsyncThunk<IUser, IUser>(
  "user/getUser",
  async (id: IUser) => {
    try {
      const res = await instanceLocal.get(`users/${id}`);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error: unknown) {
      console.log(error);
      return error;
    }
  }
);

const addUser = createAsyncThunk<IUser, IUser>("user/addUser", async (user) => {
  try {
    const res = await instanceLocal.post(`users`, user);
    if (res.status === 201) {
      return res.data;
    }
  } catch (error: unknown) {
    console.log(error);
    return error;
  }
});

const updateUser = createAsyncThunk<IUser, { id: string; user: IUser }>(
  "user/updateUser",
  async ({ id, user }, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.patch(`users/${id}`, user);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (!axiosError.response) {
        return error;
      }
      return rejectWithValue(axiosError.message);
    }
  }
);

const deleteUser = createAsyncThunk<number, { id: number }>(
  "user/deleteUser",
  async ({ id }) => {
    try {
      const res = await instanceLocal.delete(`users/${id}`);
      if (res.status === 201) {
        return res.data.id;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export { getAllUser, addUser, getUser, updateUser, deleteUser };
