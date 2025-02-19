import { IFoodState } from "../slices/foodsSlice";
import { RootState } from "../store";

const foodsSelector = (state: RootState): IFoodState => state.foodsSlice;

export { foodsSelector };
