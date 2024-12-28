import { getAllRoom, getRoom } from "@/app/api/roomsRequest";
import { IRooms } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRoomsState {
  rooms: IRooms[] | null;
  room: IRooms | null;
  filters: {
    rate: string;
    sortPrice: string;
    views: string[];
    features: string[];
    categories: string[];
  };
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IRoomsState = {
  rooms: null,
  room: null,
  filters: {
    rate: "rooms",
    sortPrice: "recommended",
    views: [],
    features: [],
    categories: [],
  },
  loading: false,
  error: null,
};

const setLoading = (state: IRoomsState) => {
  state.loading = true;
};

const setError = (
  state: IRoomsState,
  action: PayloadAction<string | undefined>
) => {
  state.loading = false;
  state.error = action.payload;
};

const roomsSlice = createSlice({
  name: "roomTypes",
  initialState,
  reducers: {
    filterByRate(state, action: PayloadAction<string>) {
      state.filters.rate = action.payload;
    },
    filterBySortPrice(state, action: PayloadAction<string>) {
      state.filters.sortPrice = action.payload;
    },
    filterByViews(state, action: PayloadAction<string>) {
      const view = state.filters.views.includes(action.payload);
      if (view) {
        state.filters.views = state.filters.views.filter(
          (view) => view !== action.payload
        );
      } else {
        state.filters.views = [...state.filters.views, action.payload];
      }
      console.log(state.filters.views);
      // state.filters.views = action.payload;
    },
    filterByFeatures(state, action: PayloadAction<string[]>) {
      state.filters.features = action.payload;
    },
    filterByCategories(state, action: PayloadAction<string[]>) {
      state.filters.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRoom.pending, setLoading);
    builder.addCase(
      getAllRoom.fulfilled,
      (state, action: PayloadAction<IRooms[]>) => {
        state.loading = false;
        state.rooms = action.payload;
      }
    );
    builder.addCase(getAllRoom.rejected, setError);
    builder.addCase(getRoom.pending, setLoading);
    builder.addCase(
      getRoom.fulfilled,
      (state, action: PayloadAction<IRooms>) => {
        state.loading = false;
        state.room = action.payload;
      }
    );
    builder.addCase(getRoom.rejected, setError);
  },
});

export default roomsSlice.reducer;

export const {
  filterByRate,
  filterBySortPrice,
  filterByViews,
  filterByFeatures,
  filterByCategories,
} = roomsSlice.actions;
