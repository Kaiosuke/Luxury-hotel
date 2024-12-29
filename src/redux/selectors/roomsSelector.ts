import { IRoomState } from "../slices/roomsSlice";
import { RootState } from "../store";

const roomSelector = (state: RootState): IRoomState => state.roomsSlice;

export { roomSelector };
