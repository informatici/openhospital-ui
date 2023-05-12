import { IMainState } from "./types";

export const initial: IMainState = {
  authentication: {
    status: "IDLE",
  },
  logout: {
    status: "IDLE",
  },
  forgotpassword: {
    status: "IDLE",
  },
};
