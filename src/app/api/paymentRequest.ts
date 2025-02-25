import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instanceLocal from "./instances";
import { IPayment } from "@/interfaces";

const payment = createAsyncThunk<
  string,
  { cartIds: string[]; totalMoney: number },
  { rejectValue: string }
>("payments/addPayment", async (payment, { rejectWithValue }) => {
  try {
    const res = await instanceLocal.post(`payment`, payment);
    return res.data.data.order_url;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export default payment;
