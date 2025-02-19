import { IViewState } from "../slices/viewsSlice";
import { RootState } from "../store";

const viewsSelector = (state: RootState): IViewState => state.viewsSlice;

export { viewsSelector };
