import { ICartState } from "../slices/cartsSlice";
import { RootState } from "../store";

const cartsSelector = (state: RootState): ICartState => state.cartsSlice;

export { cartsSelector };
