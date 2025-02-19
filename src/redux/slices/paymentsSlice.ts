import {
  addPayment,
  deletePayment,
  forceDeletePayment,
  getAllPayment,
  getAllPaymentDeleted,
  restorePayment,
  updatePayment,
} from "@/app/api/paymentsRequest";
import { IPayment } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPaymentState {
  payments: IPayment[] | [];
  paymentsDeleted: IPayment[] | [];
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IPaymentState = {
  payments: [],
  paymentsDeleted: [],
  loading: false,
  error: null,
};

const setLoading = (state: IPaymentState) => {
  state.loading = true;
};

const setError = (
  state: IPaymentState,
  action: PayloadAction<string | undefined>
) => {
  state.loading = false;
  state.error = action.payload;
};

const paymentsSlice = createSlice({
  name: "Payments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllPayment.pending, setLoading);
    builder.addCase(
      getAllPayment.fulfilled,
      (state, action: PayloadAction<IPayment[]>) => {
        state.loading = false;
        state.payments = action.payload;
      }
    );
    builder.addCase(getAllPayment.rejected, setError);

    builder.addCase(addPayment.pending, setLoading);
    builder.addCase(
      addPayment.fulfilled,
      (state, action: PayloadAction<IPayment>) => {
        state.loading = false;
        state.payments = [...state.payments, action.payload];
      }
    );
    builder.addCase(addPayment.rejected, setError);

    builder.addCase(updatePayment.pending, setLoading);
    builder.addCase(
      updatePayment.fulfilled,
      (state, action: PayloadAction<IPayment>) => {
        state.loading = false;
        state.payments = state.payments.map((payment) =>
          payment._id === action.payload._id ? action.payload : payment
        );
      }
    );
    builder.addCase(updatePayment.rejected, setError);

    builder.addCase(deletePayment.pending, setLoading);
    builder.addCase(
      deletePayment.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        const findPayment = state.payments.find(
          (payment) => payment._id === action.payload
        );
        if (findPayment) {
          state.paymentsDeleted = [...state.paymentsDeleted, findPayment];
        }
        state.payments = state.payments.filter(
          (payment) => payment._id !== action.payload
        );
      }
    );
    builder.addCase(deletePayment.rejected, setError);

    builder.addCase(forceDeletePayment.pending, setLoading);
    builder.addCase(
      forceDeletePayment.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.paymentsDeleted = state.paymentsDeleted.filter(
          (payment) => payment._id !== action.payload
        );
      }
    );
    builder.addCase(forceDeletePayment.rejected, setError);

    builder.addCase(getAllPaymentDeleted.pending, setLoading);
    builder.addCase(
      getAllPaymentDeleted.fulfilled,
      (state, action: PayloadAction<IPayment[]>) => {
        state.loading = false;
        state.paymentsDeleted = action.payload;
      }
    );
    builder.addCase(getAllPaymentDeleted.rejected, setError);

    builder.addCase(restorePayment.pending, setLoading);
    builder.addCase(
      restorePayment.fulfilled,
      (state, action: PayloadAction<IPayment>) => {
        state.loading = false;
        state.payments = [...state.payments, action.payload];
        state.paymentsDeleted = state.paymentsDeleted.filter(
          (payment) => payment._id !== action.payload._id
        );
      }
    );
    builder.addCase(restorePayment.rejected, setError);
  },
});

export default paymentsSlice.reducer;
