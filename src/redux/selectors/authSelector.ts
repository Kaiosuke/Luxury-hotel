import { IAuthState } from "@/interfaces";
import { RootState } from "@/redux/store";

const authSelector = (state: RootState): IAuthState => state.authSlice;

export { authSelector };
