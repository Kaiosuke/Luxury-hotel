import { combineReducers } from "redux";
import {
  authSlice,
  cartsSlice,
  categoryRoomsSlice,
  foodsSlice,
  optionsSlice,
  reviewsSlice,
  roomsSlice,
  roomTypesSlice,
  typeBedsSlice,
  usersSlice,
  viewsSlice,
} from "./slices";

const rootReducer = combineReducers({
  authSlice: authSlice,
  usersSlice: usersSlice,
  roomsSlice: roomsSlice,
  roomTypesSlice: roomTypesSlice,
  optionsSlice: optionsSlice,
  cartsSlice: cartsSlice,
  typeBedsSlice: typeBedsSlice,
  viewsSlice: viewsSlice,
  categoryRoomsSlice: categoryRoomsSlice,
  foodsSlice: foodsSlice,
  reviewsSlice: reviewsSlice,
});

export default rootReducer;
