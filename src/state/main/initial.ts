import { IMainState } from "./types";

export const initial: IMainState = {
  authentication: {
    status: "IDLE",
  },
  me: {
    status: "IDLE",
  },
};
