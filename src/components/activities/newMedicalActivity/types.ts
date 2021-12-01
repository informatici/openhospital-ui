import { MedicalDTO } from "../../../generated";
import { TUserCredentials } from "../../../state/main/types";

export interface IOwnProps {
  isLoading: boolean;
}

export interface IStateProps {
  userCredentials: TUserCredentials;
  isLoading: boolean;
  hasSucceeded: boolean;
  hasFailed: boolean;
}

export interface IDispatchProps {
  newMedical: (medical: MedicalDTO, ignoreSimilar: boolean) => any;
}

export type TProps = IOwnProps & IStateProps & IDispatchProps;

export type TActivityTransitionState =
  | "IDLE"
  | "TO_NEW_MEDICAL_RESET"
  | "TO_MEDICALS";
