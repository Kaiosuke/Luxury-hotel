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
    // build.addCase(login.pending, (state) => {
    //   state.loading = true;
    // });
    // build.addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
    //   state.loading = false;
    //   state.currentUser = action.payload;
    //   state.error = undefined;
    // });
    // build.addCase(
    //   login.rejected,
    //   (state, action: PayloadAction<string | undefined>) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   }
    // );
    // build.addCase(register.pending, (state) => {
    //   state.loading = true;
    // });
    // build.addCase(register.fulfilled, (state) => {
    //   state.loading = false;
    //   state.error = undefined;
    // });
    // build.addCase(
    //   register.rejected,
    //   (state, action: PayloadAction<string | undefined>) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   }
    // );
  },
});

export default authSlice.reducer;
