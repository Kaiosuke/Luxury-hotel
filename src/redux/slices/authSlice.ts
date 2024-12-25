import { login } from "@/api/authRequuest";
import { createSlice } from "./../../../node_modules/@reduxjs/toolkit/src/createSlice";
import { IUser } from "@/interfaces";

interface IAuthState {
  currentUSer: {
    accessToken: string;
    user: IUser;
  } | null;
  loading: boolean;
  error: null | string;
}

const initialState = {
  currentUSer: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(login.pending, (state) => {
      state.loading = true;
    });
  },
});
