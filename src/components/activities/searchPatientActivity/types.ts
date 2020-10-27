import { PatientDTO } from "../../../generated";
import { TUserCredentials } from "../../../state/main/types";
import { TAPIResponseStatus } from "../../../state/types";

export interface IStateProps {
  userCredentials: TUserCredentials;
  patientSearchResults: Array<PatientDTO> | undefined;
  searchStatus: TAPIResponseStatus;
}

export interface IPatientSearchItemProps {
  patient: PatientDTO;
}

export interface IDispatchProps {
  searchPatient: (values: TValues) => void;
}

export type TProps = IStateProps & IDispatchProps;

export type TValues = Record<TFieldName, string>;

export type TFieldName =
  | "id"
  | "firstName"
  | "secondName"
  | "birthDate"
  | "address";

export type TActivityTransitionState = "IDLE" | "TO_PATIENT_DETAILS";
