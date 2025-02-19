import { IReviewState } from "../slices/reviewsSlice";
import { RootState } from "../store";

const reviewsSelector = (state: RootState): IReviewState => state.reviewsSlice;

export { reviewsSelector };
