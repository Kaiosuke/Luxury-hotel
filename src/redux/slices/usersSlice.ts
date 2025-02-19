import {
  addUser,
  deleteUser,
  forceDeleteUser,
  getAllUser,
  getAllUserDeleted,
  restoreUser,
  updateUser,
} from "@/app/api/usersRequest";
import { IUser } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  users: IUser[] | [];
  usersDeleted: IUser[] | [];
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IUserState = {
  users: [],
  usersDeleted: [],
  loading: false,
  error: null,
};

const setLoading = (state: IUserState) => {
  state.loading = true;
};

const setError = (
  state: IUserState,
  action: PayloadAction<string | undefined>
) => {
  state.loading = false;
  state.error = action.payload;
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllUser.pending, setLoading);
    builder.addCase(
      getAllUser.fulfilled,
      (state, action: PayloadAction<IUser[]>) => {
        state.loading = false;
        state.users = action.payload;
      }
    );
    builder.addCase(getAllUser.rejected, setError);

    builder.addCase(addUser.pending, setLoading);
    builder.addCase(
      addUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.users = [...state.users, action.payload];
      }
    );
    builder.addCase(addUser.rejected, setError);

    builder.addCase(updateUser.pending, setLoading);
    builder.addCase(
      updateUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      }
    );
    builder.addCase(updateUser.rejected, setError);

    builder.addCase(deleteUser.pending, setLoading);
    builder.addCase(
      deleteUser.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        const findUser = state.users.find(
          (user) => user._id === action.payload
        );
        if (findUser) {
          state.usersDeleted = [...state.usersDeleted, findUser];
        }
        state.users = state.users.filter((user) => user._id !== action.payload);
      }
    );
    builder.addCase(deleteUser.rejected, setError);

    builder.addCase(forceDeleteUser.pending, setLoading);
    builder.addCase(
      forceDeleteUser.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.usersDeleted = state.usersDeleted.filter(
          (user) => user._id !== action.payload
        );
      }
    );
    builder.addCase(forceDeleteUser.rejected, setError);

    builder.addCase(getAllUserDeleted.pending, setLoading);
    builder.addCase(
      getAllUserDeleted.fulfilled,
      (state, action: PayloadAction<IUser[]>) => {
        state.loading = false;
        state.usersDeleted = action.payload;
      }
    );
    builder.addCase(getAllUserDeleted.rejected, setError);

    builder.addCase(restoreUser.pending, setLoading);
    builder.addCase(
      restoreUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.users = [...state.users, action.payload];
        state.usersDeleted = state.usersDeleted.filter(
          (user) => user._id !== action.payload._id
        );
      }
    );
    builder.addCase(restoreUser.rejected, setError);
  },
});

export default usersSlice.reducer;
