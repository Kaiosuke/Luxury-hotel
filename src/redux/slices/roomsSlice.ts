import {
  addRoom,
  deleteRoom,
  getAllRoom,
  getRoom,
  updateRoom,
} from "@/app/api/roomsRequest";
import { IRoom } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRoomState {
  rooms: IRoom[] | [];
  room: IRoom | null;
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IRoomState = {
  rooms: [],
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

    builder.addCase(addRoom.pending, setLoading);
    builder.addCase(
      addRoom.fulfilled,
      (state, action: PayloadAction<IRoom>) => {
        state.loading = false;
        state.rooms = [...state.rooms, action.payload];
      }
    );
    builder.addCase(addRoom.rejected, setError);

    builder.addCase(updateRoom.pending, setLoading);
    builder.addCase(
      updateRoom.fulfilled,
      (state, action: PayloadAction<IRoom>) => {
        state.loading = false;
        state.rooms = state.rooms.map((room) =>
          room._id === action.payload._id ? action.payload : room
        );
      }
    );
    builder.addCase(updateRoom.rejected, setError);

    builder.addCase(deleteRoom.pending, setLoading);
    builder.addCase(
      deleteRoom.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.rooms = state.rooms.filter((room) => room._id !== action.payload);
      }
    );
    builder.addCase(deleteRoom.rejected, setError);
  },
});

export default roomsSlice.reducer;
