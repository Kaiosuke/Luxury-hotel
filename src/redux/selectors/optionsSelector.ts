import { IOptionsState } from "../slices/optionsSlice";
import { RootState } from "../store";

const optionsSelector = (state: RootState): IOptionsState => state.optionsSlice;

export { optionsSelector };
