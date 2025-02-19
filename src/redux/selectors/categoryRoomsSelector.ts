import { ICategoryRoomState } from "../slices/categoryRoomsSlice";
import { RootState } from "../store";

const categoryRoomsSelector = (state: RootState): ICategoryRoomState =>
  state.categoryRoomsSlice;

export { categoryRoomsSelector };
