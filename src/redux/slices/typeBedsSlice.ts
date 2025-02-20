import {
  addTypeBed,
  deleteTypeBed,
  forceDeleteTypeBed,
  getAllTypeBed,
  getAllTypeBedDeleted,
  restoreTypeBed,
  updateTypeBed,
} from "@/app/api/typeBedRequest";
import { ITypeBed } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITypeBedState {
  typeBeds: ITypeBed[] | [];
  typeBedsDeleted: ITypeBed[] | [];
  loading: boolean;
  error: null | string | undefined;
}

const initialState: ITypeBedState = {
  typeBeds: [],
  typeBedsDeleted: [],
  loading: false,
  error: null,
};

const setLoading = (state: ITypeBedState) => {
  state.loading = true;
};

const setError = (
  state: ITypeBedState,
  action: PayloadAction<string | undefined>
) => {
  state.loading = false;
  state.error = action.payload;
};

const typeBedsSlice = createSlice({
  name: "typeBeds",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllTypeBed.pending, setLoading);
    builder.addCase(
      getAllTypeBed.fulfilled,
      (state, action: PayloadAction<ITypeBed[]>) => {
        state.loading = false;
        state.typeBeds = action.payload;
      }
    );
    builder.addCase(getAllTypeBed.rejected, setError);

    builder.addCase(addTypeBed.pending, setLoading);
    builder.addCase(
      addTypeBed.fulfilled,
      (state, action: PayloadAction<ITypeBed>) => {
        state.loading = false;
        state.typeBeds = [...state.typeBeds, action.payload];
      }
    );
    builder.addCase(addTypeBed.rejected, setError);

    builder.addCase(updateTypeBed.pending, setLoading);
    builder.addCase(
      updateTypeBed.fulfilled,
      (state, action: PayloadAction<ITypeBed>) => {
        state.loading = false;
        state.typeBeds = state.typeBeds.map((typeBed) =>
          typeBed._id === action.payload._id ? action.payload : typeBed
        );
      }
    );
    builder.addCase(updateTypeBed.rejected, setError);

    builder.addCase(deleteTypeBed.pending, setLoading);
    builder.addCase(
      deleteTypeBed.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        const findTypeBed = state.typeBeds.find(
          (typeBed) => typeBed._id === action.payload
        );
        if (findTypeBed) {
          state.typeBedsDeleted = [...state.typeBedsDeleted, findTypeBed];
        }
        state.typeBeds = state.typeBeds.filter(
          (typeBed) => typeBed._id !== action.payload
        );
      }
    );
    builder.addCase(deleteTypeBed.rejected, setError);

    builder.addCase(forceDeleteTypeBed.pending, setLoading);
    builder.addCase(
      forceDeleteTypeBed.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.typeBedsDeleted = state.typeBedsDeleted.filter(
          (typeBed) => typeBed._id !== action.payload
        );
      }
    );
    builder.addCase(forceDeleteTypeBed.rejected, setError);

    builder.addCase(getAllTypeBedDeleted.pending, setLoading);
    builder.addCase(
      getAllTypeBedDeleted.fulfilled,
      (state, action: PayloadAction<ITypeBed[]>) => {
        state.loading = false;
        state.typeBedsDeleted = action.payload;
      }
    );
    builder.addCase(getAllTypeBedDeleted.rejected, setError);

    builder.addCase(restoreTypeBed.pending, setLoading);
    builder.addCase(
      restoreTypeBed.fulfilled,
      (state, action: PayloadAction<ITypeBed>) => {
        state.loading = false;
        state.typeBeds = [...state.typeBeds, action.payload];
        state.typeBedsDeleted = state.typeBedsDeleted.filter(
          (typeBed) => typeBed._id !== action.payload._id
        );
      }
    );
    builder.addCase(restoreTypeBed.rejected, setError);
  },
});

export default typeBedsSlice.reducer;
