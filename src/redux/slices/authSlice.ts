import { IUser } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

export interface IAuthState {
  loading: boolean;
  currentUser: IUser | null;
  error: null | string;
}

const initialState: IAuthState = {
  currentUser: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export default authSlice.reducer;
export const { loginUser, logoutUser } = authSlice.actions;
