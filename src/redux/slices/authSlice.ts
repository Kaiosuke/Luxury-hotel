import { login, logout } from "@/app/api/authRequest";
import { IUser } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  loading: boolean;
  currentUser: IUser | null;
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
  extraReducers(builder) {
    builder.addCase(login.pending, (state: IAuthState) => {
      state.loading = true;
    });
    builder.addCase(
      login.fulfilled,
      (state: IAuthState, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.currentUser = action.payload;
      }
    );
    builder.addCase(
      login.rejected,
      (state: IAuthState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(logout.pending, (state: IAuthState) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state: IAuthState) => {
      state.loading = false;
      state.currentUser = null;
    });
    builder.addCase(
      logout.rejected,
      (state: IAuthState, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export default authSlice.reducer;
