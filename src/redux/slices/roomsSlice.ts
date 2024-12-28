import { getAllRoom, getRoom } from "@/app/api/roomsRequest";
import { IRooms } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRoomsState {
  rooms: IRooms[] | null;
  room: IRooms | null;
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IRoomsState = {
  rooms: null,
  room: null,
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
  reducers: {},
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
