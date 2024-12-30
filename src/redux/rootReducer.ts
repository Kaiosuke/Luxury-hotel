import { combineReducers } from "redux";
import {
  authSlice,
  cartsSlice,
  optionsSlice,
  roomsSlice,
  roomTypesSlice,
  usersSlice,
} from "./slices";

const rootReducer = combineReducers({
  authSlice: authSlice,
  usersSlice: usersSlice,
  roomsSlice: roomsSlice,
  roomTypesSlice: roomTypesSlice,
  optionsSlice: optionsSlice,
  cartsSlice: cartsSlice,
});

export default rootReducer;
