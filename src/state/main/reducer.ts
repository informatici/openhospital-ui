import produce from "immer";
import { SET_TOKEN, SET_USER_CREDENTIALS } from "./consts";
import { IMainState } from "./types";
import { initial } from "./initial";

export default produce((draft: IMainState, action: any) => {
  switch (action.type) {
    case SET_TOKEN: {
      draft.userCredentials.token = action.token;
      break;
    }
    case SET_USER_CREDENTIALS: {
      draft.userCredentials = action.userCredentials;
      break;
    }
  }
}, initial);
