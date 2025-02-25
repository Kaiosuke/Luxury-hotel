import { createAsyncThunk } from "@reduxjs/toolkit";
import instanceLocal from "./instances";
import axios from "axios";

// };

const sendInfo = createAsyncThunk<
  void,
  { user: string; email: string },
  { rejectValue: string }
>("sendMail/info", async (data, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.post("/mail/info", data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export default sendInfo;
