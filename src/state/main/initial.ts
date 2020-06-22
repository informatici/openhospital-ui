import { IMainState } from "./types";

export const initial: IMainState = {
  authentication: {
    isLoading: false,
  },
  token: "",
};
