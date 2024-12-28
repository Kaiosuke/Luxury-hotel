import { combineReducers } from "redux";
import { authSlice, optionsSlice, roomsSlice, roomTypesSlice } from "./slices";

const rootReducer = combineReducers({
  authSlice: authSlice,
  roomsSlice: roomsSlice,
  roomTypesSlice: roomTypesSlice,
  optionsSlice: optionsSlice,
});

export default rootReducer;
