import { getAllOption, getOption } from "@/app/api/optionsRequest";
import { IOption } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IOptionState {
  options: IOption[] | null;
  option: IOption | null;
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IOptionState = {
  options: null,
  option: null,
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
  name: "roomTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOption.pending, setLoading);
    builder.addCase(
      getAllOption.fulfilled,
      (state, action: PayloadAction<IOption[]>) => {
        state.loading = false;
        state.options = action.payload;
      }
    );
    builder.addCase(getAllOption.rejected, setError);

    builder.addCase(getOption.pending, setLoading);
    builder.addCase(
      getOption.fulfilled,
      (state, action: PayloadAction<IOption>) => {
        state.loading = false;
        state.option = action.payload;
      }
    );
    builder.addCase(getOption.rejected, setError);
  },
});

export default optionsSlice.reducer;
