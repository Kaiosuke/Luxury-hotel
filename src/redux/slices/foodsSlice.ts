import {
  addFood,
  deleteFood,
  forceDeleteFood,
  getAllFood,
  getAllFoodDeleted,
  restoreFood,
  updateFood,
} from "@/app/api/foodRequest";
import { IFood } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFoodState {
  foods: IFood[] | [];
  foodsDeleted: IFood[] | [];
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IFoodState = {
  foods: [],
  foodsDeleted: [],
  loading: false,
  error: null,
};

const setLoading = (state: IFoodState) => {
  state.loading = true;
};

const setError = (
  state: IFoodState,
  action: PayloadAction<string | undefined>
) => {
  state.loading = false;
  state.error = action.payload;
};

const foodsSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllFood.pending, setLoading);
    builder.addCase(
      getAllFood.fulfilled,
      (state, action: PayloadAction<IFood[]>) => {
        state.loading = false;
        state.foods = action.payload;
      }
    );
    builder.addCase(getAllFood.rejected, setError);

    builder.addCase(addFood.pending, setLoading);
    builder.addCase(
      addFood.fulfilled,
      (state, action: PayloadAction<IFood>) => {
        state.loading = false;
        state.foods = [...state.foods, action.payload];
      }
    );
    builder.addCase(addFood.rejected, setError);

    builder.addCase(updateFood.pending, setLoading);
    builder.addCase(
      updateFood.fulfilled,
      (state, action: PayloadAction<IFood>) => {
        state.loading = false;
        state.foods = state.foods.map((food) =>
          food._id === action.payload._id ? action.payload : food
        );
      }
    );
    builder.addCase(updateFood.rejected, setError);

    builder.addCase(deleteFood.pending, setLoading);
    builder.addCase(
      deleteFood.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        const findFood = state.foods.find(
          (food) => food._id === action.payload
        );
        if (findFood) {
          state.foodsDeleted = [...state.foodsDeleted, findFood];
        }
        state.foods = state.foods.filter((food) => food._id !== action.payload);
      }
    );
    builder.addCase(deleteFood.rejected, setError);

    builder.addCase(forceDeleteFood.pending, setLoading);
    builder.addCase(
      forceDeleteFood.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.foodsDeleted = state.foodsDeleted.filter(
          (food) => food._id !== action.payload
        );
      }
    );
    builder.addCase(forceDeleteFood.rejected, setError);

    builder.addCase(getAllFoodDeleted.pending, setLoading);
    builder.addCase(
      getAllFoodDeleted.fulfilled,
      (state, action: PayloadAction<IFood[]>) => {
        state.loading = false;
        state.foodsDeleted = action.payload;
      }
    );
    builder.addCase(getAllFoodDeleted.rejected, setError);

    builder.addCase(restoreFood.pending, setLoading);
    builder.addCase(
      restoreFood.fulfilled,
      (state, action: PayloadAction<IFood>) => {
        state.loading = false;
        state.foods = [...state.foods, action.payload];
        state.foodsDeleted = state.foodsDeleted.filter(
          (food) => food._id !== action.payload._id
        );
      }
    );
    builder.addCase(restoreFood.rejected, setError);
  },
});

export default foodsSlice.reducer;
