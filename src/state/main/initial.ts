import { IMainState } from "./types";

export const initial: IMainState = {
  authentication: {
    hasSucceeded: false,
    isLoading: false,
  },
};
