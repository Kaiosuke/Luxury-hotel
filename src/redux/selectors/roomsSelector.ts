import { IRoomState } from "../slices/roomsSlice";
import { RootState } from "../store";

const roomsSelector = (state: RootState): IRoomState => state.roomsSlice;

export { roomsSelector };
