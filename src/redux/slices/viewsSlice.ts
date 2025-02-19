import {
  addView,
  deleteView,
  forceDeleteView,
  getAllView,
  getAllViewDeleted,
  restoreView,
  updateView,
} from "@/app/api/viewsRequest";
import { IView } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IViewState {
  views: IView[] | [];
  viewsDeleted: IView[] | [];
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IViewState = {
  views: [],
  viewsDeleted: [],
  loading: false,
  error: null,
};

const setLoading = (state: IViewState) => {
  state.loading = true;
};

const setError = (
  state: IViewState,
  action: PayloadAction<string | undefined>
) => {
  state.loading = false;
  state.error = action.payload;
};

const viewsSlice = createSlice({
  name: "views",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllView.pending, setLoading);
    builder.addCase(
      getAllView.fulfilled,
      (state, action: PayloadAction<IView[]>) => {
        state.loading = false;
        state.views = action.payload;
      }
    );
    builder.addCase(getAllView.rejected, setError);

    builder.addCase(addView.pending, setLoading);
    builder.addCase(
      addView.fulfilled,
      (state, action: PayloadAction<IView>) => {
        state.loading = false;
        state.views = [...state.views, action.payload];
      }
    );
    builder.addCase(addView.rejected, setError);

    builder.addCase(updateView.pending, setLoading);
    builder.addCase(
      updateView.fulfilled,
      (state, action: PayloadAction<IView>) => {
        state.loading = false;
        state.views = state.views.map((View) =>
          View._id === action.payload._id ? action.payload : View
        );
      }
    );
    builder.addCase(updateView.rejected, setError);

    builder.addCase(deleteView.pending, setLoading);
    builder.addCase(
      deleteView.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        const findView = state.views.find(
          (view) => view._id === action.payload
        );
        if (findView) {
          state.viewsDeleted = [...state.viewsDeleted, findView];
        }
        state.views = state.views.filter((view) => view._id !== action.payload);
      }
    );
    builder.addCase(deleteView.rejected, setError);

    builder.addCase(forceDeleteView.pending, setLoading);
    builder.addCase(
      forceDeleteView.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.viewsDeleted = state.viewsDeleted.filter(
          (view) => view._id !== action.payload
        );
      }
    );
    builder.addCase(forceDeleteView.rejected, setError);

    builder.addCase(getAllViewDeleted.pending, setLoading);
    builder.addCase(
      getAllViewDeleted.fulfilled,
      (state, action: PayloadAction<IView[]>) => {
        state.loading = false;
        state.viewsDeleted = action.payload;
      }
    );
    builder.addCase(getAllViewDeleted.rejected, setError);

    builder.addCase(restoreView.pending, setLoading);
    builder.addCase(
      restoreView.fulfilled,
      (state, action: PayloadAction<IView>) => {
        state.loading = false;
        state.views = [...state.views, action.payload];
        state.viewsDeleted = state.viewsDeleted.filter(
          (view) => view._id !== action.payload._id
        );
      }
    );
    builder.addCase(restoreView.rejected, setError);
  },
});

export default viewsSlice.reducer;
