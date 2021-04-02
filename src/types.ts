import { IExaminationsState } from "./state/examinations/types";
import { IMainState } from "./state/main/types";
import { IPatientsState } from "./state/patients/types";

export interface IState {
  main: IMainState;
  patients: IPatientsState;
  examinations: IExaminationsState;
}
