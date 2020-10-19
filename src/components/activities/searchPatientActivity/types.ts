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
  searchPatient: (values: object) => void;
}

export type TProps = IStateProps & IDispatchProps;

export interface IValues {
  id?: string;
  taxNumber?: string;
  firstName?: string;
  secondName?: string;
  birthDate?: string;
  address?: string;
}

export type TRouteActionState = "IDLE" | "TO_PATIENT_DETAILS";
