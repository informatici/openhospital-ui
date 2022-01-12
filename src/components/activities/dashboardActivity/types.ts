import { LoginResponse } from "../../../generated";
import { TUserCredentials } from "../../../state/main/types";
import { IAction } from "../../../state/types";

export interface IOwnProps {
  newPatientRoute: string;
  searchPatientRoute: string;
  newMedicalRoute: string;
  medicalsRoute: string;
}

export interface IStateProps {
  userCredentials: TUserCredentials;
}

export type TProps = IOwnProps & IStateProps;

export type TActivityTransitionState =
  | "IDLE"
  | "TO_NEW_PATIENT"
  | "TO_SEARCH_PATIENT"
  | "TO_NEW_MEDICAL"
  | "TO_SEARCH_MEDICAL";
