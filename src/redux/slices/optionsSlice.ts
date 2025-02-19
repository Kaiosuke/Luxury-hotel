import {
  addOption,
  deleteOption,
  forceDeleteOption,
  getAllOption,
  getAllOptionDeleted,
  restoreOption,
  updateOption,
} from "@/app/api/optionsRequest";
import { IOption } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IOptionState {
  options: IOption[] | [];
  optionsDeleted: IOption[] | [];
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IOptionState = {
  options: [],
  optionsDeleted: [],
  loading: false,
  error: null,
};

const setLoading = (state: IOptionState) => {
  state.loading = true;
};

const setError = (
  state: IOptionState,
  action: PayloadAction<string | undefined>
) => {
  state.loading = false;
  state.error = action.payload;
};

const optionsSlice = createSlice({
  name: "Options",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllOption.pending, setLoading);
    builder.addCase(
      getAllOption.fulfilled,
      (state, action: PayloadAction<IOption[]>) => {
        state.loading = false;
        state.options = action.payload;
      }
    );
    builder.addCase(getAllOption.rejected, setError);

    builder.addCase(addOption.pending, setLoading);
    builder.addCase(
      addOption.fulfilled,
      (state, action: PayloadAction<IOption>) => {
        state.loading = false;
        state.options = [...state.options, action.payload];
      }
    );
    builder.addCase(addOption.rejected, setError);

    builder.addCase(updateOption.pending, setLoading);
    builder.addCase(
      updateOption.fulfilled,
      (state, action: PayloadAction<IOption>) => {
        state.loading = false;
        state.options = state.options.map((option) =>
          option._id === action.payload._id ? action.payload : option
        );
      }
    );
    builder.addCase(updateOption.rejected, setError);

    builder.addCase(deleteOption.pending, setLoading);
    builder.addCase(
      deleteOption.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        const findOption = state.options.find(
          (option) => option._id === action.payload
        );
        if (findOption) {
          state.optionsDeleted = [...state.optionsDeleted, findOption];
        }
        state.options = state.options.filter(
          (option) => option._id !== action.payload
        );
      }
    );
    builder.addCase(deleteOption.rejected, setError);

    builder.addCase(forceDeleteOption.pending, setLoading);
    builder.addCase(
      forceDeleteOption.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.optionsDeleted = state.optionsDeleted.filter(
          (option) => option._id !== action.payload
        );
      }
    );
    builder.addCase(forceDeleteOption.rejected, setError);

    builder.addCase(getAllOptionDeleted.pending, setLoading);
    builder.addCase(
      getAllOptionDeleted.fulfilled,
      (state, action: PayloadAction<IOption[]>) => {
        state.loading = false;
        state.optionsDeleted = action.payload;
      }
    );
    builder.addCase(getAllOptionDeleted.rejected, setError);

    builder.addCase(restoreOption.pending, setLoading);
    builder.addCase(
      restoreOption.fulfilled,
      (state, action: PayloadAction<IOption>) => {
        state.loading = false;
        state.options = [...state.options, action.payload];
        state.optionsDeleted = state.optionsDeleted.filter(
          (option) => option._id !== action.payload._id
        );
      }
    );
    builder.addCase(restoreOption.rejected, setError);
  },
});

export default optionsSlice.reducer;
