import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instanceLocal from "./instances";
import { IPayment } from "@/interfaces";

const payment = createAsyncThunk<
  void,
  { cartIds: string[]; totalMoney: number },
  { rejectValue: string }
>("payments/addPayment", async (payment, { rejectWithValue }) => {
  try {
    await instanceLocal.post(`payment`, payment);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export default payment;
