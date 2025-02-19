import {
  addCart,
  deleteCart,
  forceDeleteCart,
  getAllCart,
  getAllCartByUserId,
  getAllCartDeleted,
  restoreCart,
  updateCart,
} from "@/app/api/cartsRequest";
import { ICart } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartState {
  carts: ICart[] | [];
  cartsDeleted: ICart[] | [];
  cartsUser: ICart[] | [];
  cartsSuccess: ICart[] | [];
  loading: boolean;
  error: null | string | undefined;
}

const initialState: ICartState = {
  carts: [],
  cartsDeleted: [],
  cartsUser: [],
  cartsSuccess: [],
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
  state.loading = true;
  state.error = action.payload;
};

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addCartSuccess(state, action) {
      state.cartsSuccess = action.payload;
    },
  },
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

    builder.addCase(getAllCartByUserId.pending, setLoading);
    builder.addCase(
      getAllCartByUserId.fulfilled,
      (state, action: PayloadAction<ICart[]>) => {
        state.loading = false;
        state.cartsUser = action.payload;
      }
    );
    builder.addCase(getAllCartByUserId.rejected, setError);

    builder.addCase(addCart.pending, setLoading);
    builder.addCase(
      addCart.fulfilled,
      (state, action: PayloadAction<ICart>) => {
        state.loading = false;
        state.cartsUser = [...state.cartsUser, action.payload];
        state.carts = [...state.carts, action.payload];
      }
    );
    builder.addCase(addCart.rejected, setError);

    builder.addCase(updateCart.pending, setLoading);
    builder.addCase(
      updateCart.fulfilled,
      (state, action: PayloadAction<ICart>) => {
        state.loading = false;
        state.carts = state.carts.map((cart) =>
          cart._id === action.payload._id ? action.payload : cart
        );
        state.cartsUser = state.cartsUser.map((cart) =>
          cart._id === action.payload._id ? action.payload : cart
        );
      }
    );
    builder.addCase(updateCart.rejected, setError);

    builder.addCase(deleteCart.pending, setLoading);
    builder.addCase(
      deleteCart.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        const findCart = state.carts.find(
          (cart) => cart._id === action.payload
        );
        if (findCart) {
          state.cartsDeleted = [...state.cartsDeleted, findCart];
        }
        state.carts = state.carts.filter((cart) => cart._id !== action.payload);
        state.cartsUser = state.cartsUser.filter(
          (cart) => cart._id !== action.payload
        );
      }
    );
    builder.addCase(deleteCart.rejected, setError);

    builder.addCase(forceDeleteCart.pending, setLoading);
    builder.addCase(
      forceDeleteCart.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.cartsDeleted = state.cartsDeleted.filter(
          (cart) => cart._id !== action.payload
        );
      }
    );
    builder.addCase(forceDeleteCart.rejected, setError);

    builder.addCase(getAllCartDeleted.pending, setLoading);
    builder.addCase(
      getAllCartDeleted.fulfilled,
      (state, action: PayloadAction<ICart[]>) => {
        state.loading = false;
        state.cartsDeleted = action.payload;
      }
    );
    builder.addCase(getAllCartDeleted.rejected, setError);

    builder.addCase(restoreCart.pending, setLoading);
    builder.addCase(
      restoreCart.fulfilled,
      (state, action: PayloadAction<ICart>) => {
        state.loading = false;
        state.carts = [...state.carts, action.payload];
        state.cartsDeleted = state.cartsDeleted.filter(
          (cart) => cart._id !== action.payload._id
        );
      }
    );
    builder.addCase(restoreCart.rejected, setError);
  },
});

export default cartsSlice.reducer;
export const { addCartSuccess } = cartsSlice.actions;
