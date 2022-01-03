import { MedicalDTO } from "../../../generated";
import { TUserCredentials } from "../../../state/main/types";

export interface IOwnProps {
}

export interface IStateProps {
  userCredentials: TUserCredentials;
  isLoading: boolean;
}

export interface IDispatchProps {
  newMedical: (medical: MedicalDTO, ignoreSimilar: boolean) => any;
}

export type TProps = IOwnProps & IStateProps & IDispatchProps;

export type TActivityTransitionState =
  | "IDLE"
  | "LOADING"
  | "FAIL"
  | "SUCCESS"
  | "TO_NEW_MEDICAL_RESET"
  | "TO_MEDICALS";
