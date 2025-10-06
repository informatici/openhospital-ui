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
  getPatientSuccessCallback?: (patient: PatientDTO) => void;
  hideAdditionalInformation?: boolean;
}

export type TValues = {
  id: string;
  firstName: string;
  secondName: string;
  birthDate: string;
  address: string;
  folderNumber: string;
};

export type TFieldName =
  | "id"
  | "firstName"
  | "secondName"
  | "birthDate"
  | "address"
  | "folderNumber";

export type TActivityTransitionState = "IDLE" | "TO_PATIENT_DETAILS";
