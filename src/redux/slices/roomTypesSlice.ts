import {
  addRoomType,
  deleteRoomType,
  forceDeleteRoomType,
  getAllRoomType,
  getAllRoomTypeDeleted,
  getRoomType,
  restoreRoomType,
  updateRoomType,
} from "@/app/api/roomTypesRequest";
import { IRoomType } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRoomTypeState {
  roomTypes: IRoomType[] | [];
  roomType: IRoomType | null;
  roomTypesDeleted: IRoomType[] | [];
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IRoomTypeState = {
  roomTypes: [],
  roomTypesDeleted: [],
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
  name: "RoomTypes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllRoomType.pending, setLoading);
    builder.addCase(
      getAllRoomType.fulfilled,
      (state, action: PayloadAction<IRoomType[]>) => {
        state.loading = false;
        state.roomTypes = action.payload;
      }
    );
    builder.addCase(getAllRoomType.rejected, setError);

    builder.addCase(getRoomType.pending, setLoading);
    builder.addCase(
      getRoomType.fulfilled,
      (state, action: PayloadAction<IRoomType>) => {
        state.loading = false;
        state.roomType = action.payload;
      }
    );

    builder.addCase(addRoomType.pending, setLoading);
    builder.addCase(
      addRoomType.fulfilled,
      (state, action: PayloadAction<IRoomType>) => {
        state.loading = false;
        state.roomTypes = [...state.roomTypes, action.payload];
      }
    );
    builder.addCase(addRoomType.rejected, setError);

    builder.addCase(updateRoomType.pending, setLoading);
    builder.addCase(
      updateRoomType.fulfilled,
      (state, action: PayloadAction<IRoomType>) => {
        state.loading = false;
        state.roomTypes = state.roomTypes.map((roomType) =>
          roomType._id === action.payload._id ? action.payload : roomType
        );
      }
    );
    builder.addCase(updateRoomType.rejected, setError);

    builder.addCase(deleteRoomType.pending, setLoading);
    builder.addCase(
      deleteRoomType.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        const findRoomType = state.roomTypes.find(
          (roomType) => roomType._id === action.payload
        );
        if (findRoomType) {
          state.roomTypesDeleted = [...state.roomTypesDeleted, findRoomType];
        }
        state.roomTypes = state.roomTypes.filter(
          (roomType) => roomType._id !== action.payload
        );
      }
    );
    builder.addCase(deleteRoomType.rejected, setError);

    builder.addCase(forceDeleteRoomType.pending, setLoading);
    builder.addCase(
      forceDeleteRoomType.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.roomTypesDeleted = state.roomTypesDeleted.filter(
          (roomType) => roomType._id !== action.payload
        );
      }
    );
    builder.addCase(forceDeleteRoomType.rejected, setError);

    builder.addCase(getAllRoomTypeDeleted.pending, setLoading);
    builder.addCase(
      getAllRoomTypeDeleted.fulfilled,
      (state, action: PayloadAction<IRoomType[]>) => {
        state.loading = false;
        state.roomTypesDeleted = action.payload;
      }
    );
    builder.addCase(getAllRoomTypeDeleted.rejected, setError);

    builder.addCase(restoreRoomType.pending, setLoading);
    builder.addCase(
      restoreRoomType.fulfilled,
      (state, action: PayloadAction<IRoomType>) => {
        state.loading = false;
        state.roomTypes = [...state.roomTypes, action.payload];
        state.roomTypesDeleted = state.roomTypesDeleted.filter(
          (roomType) => roomType._id !== action.payload._id
        );
      }
    );
    builder.addCase(restoreRoomType.rejected, setError);
  },
});

export default roomTypesSlice.reducer;
