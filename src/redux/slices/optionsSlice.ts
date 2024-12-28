import { getAllOption, getOption } from "@/app/api/optionsRequest";
import { IOptions } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IOptionsState {
  options: IOptions[] | null;
  option: IOptions | null;
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IOptionsState = {
  options: null,
  option: null,
  loading: false,
  error: null,
};

const setLoading = (state: IOptionsState) => {
  state.loading = true;
};

const setError = (
  state: IOptionsState,
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
      (state, action: PayloadAction<IOptions[]>) => {
        state.loading = false;
        state.options = action.payload;
      }
    );
    builder.addCase(getAllOption.rejected, setError);

    builder.addCase(getOption.pending, setLoading);
    builder.addCase(
      getOption.fulfilled,
      (state, action: PayloadAction<IOptions>) => {
        state.loading = false;
        state.option = action.payload;
      }
    );
    builder.addCase(getOption.rejected, setError);
  },
});

export default optionsSlice.reducer;
