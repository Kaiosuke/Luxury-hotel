import { IPaymentState } from "../slices/paymentsSlice";
import { RootState } from "../store";

const paymentsSelector = (state: RootState): IPaymentState =>
  state.paymentsSlice;

export { paymentsSelector };
