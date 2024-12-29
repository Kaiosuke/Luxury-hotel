import { getAllRoomType, getRoomType } from "@/app/api/roomTypesRequest";
import { IRoomTypes } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRoomTypeState {
  roomTypes: IRoomTypes[] | null;
  roomType: IRoomTypes | null;
  filters: {
    sort: string;
    views: string[];
    features: string[];
    categories: string[];
  };
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IRoomTypeState = {
  roomTypes: null,
  roomType: null,
  filters: {
    sort: "recommended",
    views: [],
    features: [],
    categories: [],
  },
  loading: false,
  error: null,
};

const setLoading = (state: IRoomTypeState) => {
  state.loading = true;
};

const setError = (
  state: IRoomTypeState,
  action: PayloadAction<string | undefined>
) => {
  state.loading = false;
  state.error = action.payload;
};

const roomTypesSlice = createSlice({
  name: "roomTypes",
  initialState,
  reducers: {
    filterBySort(state, action: PayloadAction<string>) {
      state.filters.sort = action.payload;
    },
    filterByViews(state, action: PayloadAction<string | null>) {
      if (!action.payload) {
        state.filters.views = [];
      } else {
        const view = state.filters.views.includes(action.payload);
        if (view) {
          state.filters.views = state.filters.views.filter(
            (view) => view !== action.payload
          );
        } else {
          state.filters.views = [...state.filters.views, action.payload];
        }
      }
    },
    filterByCategories(state, action: PayloadAction<string | null>) {
      if (!action.payload) {
        state.filters.categories = [];
      } else {
        const category = state.filters.categories.includes(action.payload);
        if (category) {
          state.filters.categories = state.filters.categories.filter(
            (cate) => cate !== action.payload
          );
        } else {
          state.filters.categories = [
            ...state.filters.categories,
            action.payload,
          ];
        }
      }
    },
    filterByFeatures(state, action: PayloadAction<string | null>) {
      if (!action.payload) {
        state.filters.features = [];
      } else {
        const feature = state.filters.features.includes(action.payload);
        if (feature) {
          state.filters.features = state.filters.features.filter(
            (feature) => feature !== action.payload
          );
        } else {
          state.filters.features = [...state.filters.features, action.payload];
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRoomType.pending, setLoading);
    builder.addCase(
      getAllRoomType.fulfilled,
      (state, action: PayloadAction<IRoomTypes[]>) => {
        state.loading = false;
        state.roomTypes = action.payload;
      }
    );
    builder.addCase(getAllRoomType.rejected, setError);

    builder.addCase(getRoomType.pending, setLoading);
    builder.addCase(
      getRoomType.fulfilled,
      (state, action: PayloadAction<IRoomTypes>) => {
        state.loading = false;
        state.roomType = action.payload;
      }
    );
    builder.addCase(getRoomType.rejected, setError);
  },
});

export default roomTypesSlice.reducer;
export const {
  filterBySort,
  filterByViews,
  filterByFeatures,
  filterByCategories,
} = roomTypesSlice.actions;
