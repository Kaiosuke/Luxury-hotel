import {
  addCart,
  deleteCart,
  getAllCart,
  updateCart,
} from "@/app/api/cartsRequest";
import { ICart } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartState {
  carts: ICart[] | [];
  loading: boolean;
  error: null | string | undefined;
}

const initialState: ICartState = {
  carts: [],
  loading: false,
  error: null,
};

const setLoading = (state: ICartState) => {
  state.loading = true;
};

const setError = (
  state: ICartState,
  action: PayloadAction<string | undefined>
) => {
  state.loading = false;
  state.error = action.payload;
};

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllCart.pending, setLoading);
    builder.addCase(
      getAllCart.fulfilled,
      (state, action: PayloadAction<ICart[]>) => {
        state.loading = false;
        state.carts = action.payload;
      }
    );
    builder.addCase(getAllCart.rejected, setError);

    builder.addCase(addCart.pending, setLoading);
    builder.addCase(
      addCart.fulfilled,
      (state, action: PayloadAction<ICart>) => {
        state.loading = false;
        state.carts = [...state.carts, action.payload];
      }
    );
    builder.addCase(addCart.rejected, setError);

    builder.addCase(updateCart.pending, setLoading);
    builder.addCase(
      updateCart.fulfilled,
      (state, action: PayloadAction<ICart>) => {
        state.loading = false;
        state.carts = state.carts.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      }
    );
    builder.addCase(updateCart.rejected, setError);

    builder.addCase(deleteCart.pending, setLoading);
    builder.addCase(
      deleteCart.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.carts = state.carts.filter((user) => user.id !== action.payload);
      }
    );
    builder.addCase(deleteCart.rejected, setError);
  },
});

export default cartsSlice.reducer;
