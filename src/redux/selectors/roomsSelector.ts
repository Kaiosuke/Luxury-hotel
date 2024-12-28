import { IRoomsState } from "../slices/roomsSlice";
import { RootState } from "../store";

interface IFilter {
  rate: string;
  sortPrice: string;
  views: string[];
  features: string[];
  categories: string[];
}

const roomSelector = (state: RootState): IRoomsState => state.roomsSlice;
const roomFilterSelector = (state: RootState): IFilter =>
  state.roomsSlice.filters;

export { roomSelector, roomFilterSelector };
