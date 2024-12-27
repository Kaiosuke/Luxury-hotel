import { RootState } from "@/redux/store";
import { IAuthState } from "../slices/authSlice";

const authSelector = (state: RootState): IAuthState => state.authSlice;

export { authSelector };
