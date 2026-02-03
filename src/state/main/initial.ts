import { IMainState } from "./types";
import { ApiResponse } from "../types";

export const initial: IMainState = {
  authentication: new ApiResponse({
    status: "IDLE",
  }),
  logout: new ApiResponse({
    status: "IDLE",
  }),
  forgotpassword: new ApiResponse({
    status: "IDLE",
  }),
  settings: new ApiResponse({
    status: "IDLE",
  }),
};
