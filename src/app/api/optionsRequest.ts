import { IOption } from "@/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instanceLocal from "./instances";

const getAllOption = createAsyncThunk<IOption[], void, { rejectValue: string }>(
  "options/getAllOption",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get("options");
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const getOption = createAsyncThunk<IOption, string, { rejectValue: string }>(
  "options/getOption",
  async (_id, { rejectWithValue }) => {
    try {
      const res = await instanceLocal.get(`options/${_id}`);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export { getAllOption, getOption };
