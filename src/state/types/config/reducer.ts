import produce from "immer";
import { IAction } from "../../types";
import { RESET_TYPE_MODE, SET_TYPE_MODE } from "./consts";
import { initial } from "./initial";
import { ITypeConfigsState } from "./types";

export default produce(
  (draft: ITypeConfigsState, action: IAction<any, any>) => {
    switch (action.type) {
      case SET_TYPE_MODE: {
        draft.mode = action.payload;
        break;
      }

      case RESET_TYPE_MODE: {
        draft.mode = initial.mode;
        break;
      }
    }
  },
  initial
);
