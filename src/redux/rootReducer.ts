import { combineReducers } from "redux";
import { authSlice, roomTypesSlice } from "./slices";

const rootReducer = combineReducers({
  authSlice: authSlice,
  roomTypesSlice: roomTypesSlice,
});

export default rootReducer;
