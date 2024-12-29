import { getAllRoom, getRoom } from "@/app/api/roomsRequest";
import { IRoom } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRoomState {
  rooms: IRoom[] | null;
  room: IRoom | null;
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IRoomState = {
  rooms: null,
  room: null,
  loading: false,
  error: null,
};

const setLoading = (state: IRoomState) => {
  state.loading = true;
};

const setError = (
  state: IRoomState,
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
      (state, action: PayloadAction<IRoom[]>) => {
        state.loading = false;
        state.rooms = action.payload;
      }
    );
    builder.addCase(getAllRoom.rejected, setError);
    builder.addCase(getRoom.pending, setLoading);
    builder.addCase(
      getRoom.fulfilled,
      (state, action: PayloadAction<IRoom>) => {
        state.loading = false;
        state.room = action.payload;
      }
    );
    builder.addCase(getRoom.rejected, setError);
  },
});

export default roomsSlice.reducer;
