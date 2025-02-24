import {
  addReview,
  deleteReview,
  forceDeleteReview,
  getAllReview,
  getAllReviewDeleted,
  getAllRoomTypeReview,
  restoreReview,
  updateReview,
} from "@/app/api/reviewRequest";
import { IReview } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IReviewState {
  reviews: IReview[] | [];
  roomTypeReview: IReview[] | [];
  reviewsDeleted: IReview[] | [];
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IReviewState = {
  reviews: [],
  roomTypeReview: [],
  reviewsDeleted: [],
  loading: false,
  error: null,
};

const setLoading = (state: IReviewState) => {
  state.loading = true;
};

const setError = (
  state: IReviewState,
  action: PayloadAction<string | undefined>
) => {
  state.loading = false;
  state.error = action.payload;
};

const reviewsSlice = createSlice({
  name: "Reviews",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllReview.pending, setLoading);
    builder.addCase(
      getAllReview.fulfilled,
      (state, action: PayloadAction<IReview[]>) => {
        state.loading = false;
        state.reviews = action.payload;
      }
    );
    builder.addCase(getAllReview.rejected, setError);

    builder.addCase(getAllRoomTypeReview.pending, setLoading);
    builder.addCase(
      getAllRoomTypeReview.fulfilled,
      (state, action: PayloadAction<IReview[]>) => {
        state.loading = false;
        state.roomTypeReview = action.payload;
      }
    );
    builder.addCase(getAllRoomTypeReview.rejected, setError);

    builder.addCase(addReview.pending, setLoading);
    builder.addCase(
      addReview.fulfilled,
      (state, action: PayloadAction<IReview>) => {
        state.loading = false;
        state.reviews = [...state.reviews, action.payload];
        state.roomTypeReview = [...state.roomTypeReview, action.payload];
      }
    );
    builder.addCase(addReview.rejected, setError);

    builder.addCase(updateReview.pending, setLoading);
    builder.addCase(
      updateReview.fulfilled,
      (state, action: PayloadAction<IReview>) => {
        state.loading = false;
        state.reviews = state.reviews.map((review) =>
          review._id === action.payload._id ? action.payload : review
        );
        state.roomTypeReview = state.roomTypeReview.map((review) =>
          review._id === action.payload._id ? action.payload : review
        );
      }
    );
    builder.addCase(updateReview.rejected, setError);

    builder.addCase(deleteReview.pending, setLoading);
    builder.addCase(
      deleteReview.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        const findReview = state.reviews.find(
          (review) => review._id === action.payload
        );
        if (findReview) {
          state.reviewsDeleted = [...state.reviewsDeleted, findReview];
        }
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload
        );
        state.roomTypeReview = state.roomTypeReview.filter(
          (review) => review._id !== action.payload
        );
      }
    );
    builder.addCase(deleteReview.rejected, setError);

    builder.addCase(forceDeleteReview.pending, setLoading);
    builder.addCase(
      forceDeleteReview.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.reviewsDeleted = state.reviewsDeleted.filter(
          (review) => review._id !== action.payload
        );
      }
    );
    builder.addCase(forceDeleteReview.rejected, setError);

    builder.addCase(getAllReviewDeleted.pending, setLoading);
    builder.addCase(
      getAllReviewDeleted.fulfilled,
      (state, action: PayloadAction<IReview[]>) => {
        state.loading = false;
        state.reviewsDeleted = action.payload;
      }
    );
    builder.addCase(getAllReviewDeleted.rejected, setError);

    builder.addCase(restoreReview.pending, setLoading);
    builder.addCase(
      restoreReview.fulfilled,
      (state, action: PayloadAction<IReview>) => {
        state.loading = false;
        state.reviews = [...state.reviews, action.payload];
        state.roomTypeReview = [...state.roomTypeReview, action.payload];
        state.reviewsDeleted = state.reviewsDeleted.filter(
          (review) => review._id !== action.payload._id
        );
      }
    );
    builder.addCase(restoreReview.rejected, setError);
  },
});

export default reviewsSlice.reducer;
