import { IOptionState } from "../slices/optionsSlice";
import { RootState } from "../store";

const optionsSelector = (state: RootState): IOptionState => state.optionsSlice;

export { optionsSelector };
