import { ITypeBedState } from "../slices/typeBedsSlice";
import { RootState } from "../store";

const typeBedsSelector = (state: RootState): ITypeBedState =>
  state.typeBedsSlice;

export { typeBedsSelector };
