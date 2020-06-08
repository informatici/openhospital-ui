import produce from "immer";
import { IPatientsState } from "./types";
import { initial } from "./initial";
import { GET_PATIENTS } from "./consts";

export default produce((draft: IPatientsState, action: any) => {
  switch (action.type) {
    case GET_PATIENTS: {
      draft = action.patients;
      break;
    }
  }
}, initial);
