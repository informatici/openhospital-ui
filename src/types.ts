import { IExaminationsState } from "./state/examinations/types";
import { IMainState } from "./state/main/types";
import { IPatientsState } from "./state/patients/types";
import { ITherapiesState } from "./state/therapies/types";

export interface IState {
  main: IMainState;
  patients: IPatientsState;
  examinations: IExaminationsState;
  therapies: ITherapiesState;
}
