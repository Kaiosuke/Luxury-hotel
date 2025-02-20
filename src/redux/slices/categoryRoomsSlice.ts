import {
  addCategoryRoom,
  deleteCategoryRoom,
  forceDeleteCategoryRoom,
  getAllCategoryRoom,
  getAllCategoryRoomDeleted,
  restoreCategoryRoom,
  updateCategoryRoom,
} from "@/app/api/categoryRoomRequest";
import { ICategoryRoom } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICategoryRoomState {
  categoryRooms: ICategoryRoom[] | [];
  categoryRoomsDeleted: ICategoryRoom[] | [];
  loading: boolean;
  error: null | string | undefined;
}

const initialState: ICategoryRoomState = {
  categoryRooms: [],
  categoryRoomsDeleted: [],
  loading: false,
  error: null,
};

const setLoading = (state: ICategoryRoomState) => {
  state.loading = true;
};

const setError = (
  state: ICategoryRoomState,
  action: PayloadAction<string | undefined>
) => {
  state.loading = false;
  state.error = action.payload;
};

const categoryRoomsSlice = createSlice({
  name: "categoryRooms",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllCategoryRoom.pending, setLoading);
    builder.addCase(
      getAllCategoryRoom.fulfilled,
      (state, action: PayloadAction<ICategoryRoom[]>) => {
        state.loading = false;
        state.categoryRooms = action.payload;
      }
    );
    builder.addCase(getAllCategoryRoom.rejected, setError);

    builder.addCase(addCategoryRoom.pending, setLoading);
    builder.addCase(
      addCategoryRoom.fulfilled,
      (state, action: PayloadAction<ICategoryRoom>) => {
        state.loading = false;
        state.categoryRooms = [...state.categoryRooms, action.payload];
      }
    );
    builder.addCase(addCategoryRoom.rejected, setError);

    builder.addCase(updateCategoryRoom.pending, setLoading);
    builder.addCase(
      updateCategoryRoom.fulfilled,
      (state, action: PayloadAction<ICategoryRoom>) => {
        state.loading = false;
        state.categoryRooms = state.categoryRooms.map((categoryRoom) =>
          categoryRoom._id === action.payload._id
            ? action.payload
            : categoryRoom
        );
      }
    );
    builder.addCase(updateCategoryRoom.rejected, setError);

    builder.addCase(deleteCategoryRoom.pending, setLoading);
    builder.addCase(
      deleteCategoryRoom.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        const findCategoryRoom = state.categoryRooms.find(
          (categoryRoom) => categoryRoom._id === action.payload
        );
        if (findCategoryRoom) {
          state.categoryRoomsDeleted = [
            ...state.categoryRoomsDeleted,
            findCategoryRoom,
          ];
        }
        state.categoryRooms = state.categoryRooms.filter(
          (categoryRoom) => categoryRoom._id !== action.payload
        );
      }
    );
    builder.addCase(deleteCategoryRoom.rejected, setError);

    builder.addCase(forceDeleteCategoryRoom.pending, setLoading);
    builder.addCase(
      forceDeleteCategoryRoom.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.categoryRoomsDeleted = state.categoryRoomsDeleted.filter(
          (categoryRoom) => categoryRoom._id !== action.payload
        );
      }
    );
    builder.addCase(forceDeleteCategoryRoom.rejected, setError);

    builder.addCase(getAllCategoryRoomDeleted.pending, setLoading);
    builder.addCase(
      getAllCategoryRoomDeleted.fulfilled,
      (state, action: PayloadAction<ICategoryRoom[]>) => {
        state.loading = false;
        state.categoryRoomsDeleted = action.payload;
      }
    );
    builder.addCase(getAllCategoryRoomDeleted.rejected, setError);

    builder.addCase(restoreCategoryRoom.pending, setLoading);
    builder.addCase(
      restoreCategoryRoom.fulfilled,
      (state, action: PayloadAction<ICategoryRoom>) => {
        state.loading = false;
        state.categoryRooms = [...state.categoryRooms, action.payload];
        state.categoryRoomsDeleted = state.categoryRoomsDeleted.filter(
          (categoryRoom) => categoryRoom._id !== action.payload._id
        );
      }
    );
    builder.addCase(restoreCategoryRoom.rejected, setError);
  },
});

export default categoryRoomsSlice.reducer;
