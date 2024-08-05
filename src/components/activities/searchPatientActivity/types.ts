import { PatientDTO } from "../../../generated";
import { TUserCredentials } from "../../../state/main/types";
import { IAction, TAPIResponseStatus } from "../../../state/types";

export interface IStateProps {
  userCredentials: TUserCredentials;
  patientSearchResults: Array<PatientDTO> | undefined;
  searchStatus: TAPIResponseStatus;
}

export interface IPatientSearchItemProps {
  patient: PatientDTO;
  getPatientSuccessCallback?: (patient: PatientDTO) => void;
  hideAdditionalInformation?: boolean;
}

export type TValues = {
  id: string;
  firstName: string;
  secondName: string;
  birthDate: string;
  address: string;
};

export type TFieldName =
  | "id"
  | "firstName"
  | "secondName"
  | "birthDate"
  | "address";

export type TActivityTransitionState = "IDLE" | "TO_PATIENT_DETAILS";
