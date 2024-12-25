import { login } from "@/api/authRequest";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/interfaces";
import { ActionDispatch } from "react";

interface IAuthState {
  currentUser: IUser | null;
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IAuthState = {
  currentUser: null,
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
