import { IUserState } from "../slices/usersSlice";
import { RootState } from "../store";

const usersSelector = (state: RootState): IUserState => state.usersSlice;

export { usersSelector };
