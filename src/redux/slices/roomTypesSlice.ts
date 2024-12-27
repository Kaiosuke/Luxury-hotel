import { getAllRoomType, getRoomType } from "@/app/api/roomTypesRequest";
import { IRoomTypes } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRoomTypeState {
  roomTypes: IRoomTypes[] | null;
  roomType: IRoomTypes | null;
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IRoomTypeState = {
  roomTypes: null,
  roomType: null,
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
  reducers: {},
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
