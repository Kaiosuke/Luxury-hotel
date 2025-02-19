import { IRoomTypeState } from "../slices/roomTypesSlice";
import { RootState } from "../store";

const roomTypesSelector = (state: RootState): IRoomTypeState =>
  state.roomTypesSlice;

export { roomTypesSelector };
