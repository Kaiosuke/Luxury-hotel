import { loginUser, registerUser } from "@/app/api/authRequest";
import { IUser } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  currentUser: IUser | null;
  loading: boolean;
  error: string | undefined;
}

const initialState: IUserState = {
  currentUser: null,
  loading: false,
  error: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    build.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = undefined;
      }
    );
    build.addCase(
      loginUser.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    build.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    build.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.error = undefined;
    });
    build.addCase(
      registerUser.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export default authSlice.reducer;
