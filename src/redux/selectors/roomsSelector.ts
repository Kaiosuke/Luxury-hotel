import { IRoomsState } from "../slices/roomsSlice";
import { RootState } from "../store";

const roomSelector = (state: RootState): IRoomsState => state.roomsSlice;

export { roomSelector };
