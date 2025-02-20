import {
  addRoom,
  deleteRoom,
  forceDeleteRoom,
  getAllRoom,
  getAllRoomDeleted,
  getRoom,
  restoreRoom,
  updateRoom,
} from "@/app/api/roomRequest";
import { IRoom } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRoomState {
  rooms: IRoom[] | [];
  room: IRoom | null;
  roomsDeleted: IRoom[] | [];
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IRoomState = {
  rooms: [],
  roomsDeleted: [],
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
  name: "Rooms",
  initialState,
  reducers: {},
  extraReducers(builder) {
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
        const findRoom = state.rooms.find(
          (room) => room._id === action.payload
        );
        if (findRoom) {
          state.roomsDeleted = [...state.roomsDeleted, findRoom];
        }
        state.rooms = state.rooms.filter((room) => room._id !== action.payload);
      }
    );
    builder.addCase(deleteRoom.rejected, setError);

    builder.addCase(forceDeleteRoom.pending, setLoading);
    builder.addCase(
      forceDeleteRoom.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.roomsDeleted = state.roomsDeleted.filter(
          (room) => room._id !== action.payload
        );
      }
    );
    builder.addCase(forceDeleteRoom.rejected, setError);

    builder.addCase(getAllRoomDeleted.pending, setLoading);
    builder.addCase(
      getAllRoomDeleted.fulfilled,
      (state, action: PayloadAction<IRoom[]>) => {
        state.loading = false;
        state.roomsDeleted = action.payload;
      }
    );
    builder.addCase(getAllRoomDeleted.rejected, setError);

    builder.addCase(restoreRoom.pending, setLoading);
    builder.addCase(
      restoreRoom.fulfilled,
      (state, action: PayloadAction<IRoom>) => {
        state.loading = false;
        state.rooms = [...state.rooms, action.payload];
        state.roomsDeleted = state.roomsDeleted.filter(
          (room) => room._id !== action.payload._id
        );
      }
    );
    builder.addCase(restoreRoom.rejected, setError);
  },
});

export default roomsSlice.reducer;
