import { TUserCredentials } from "../../../state/main/types";
import { PatientDTO } from "../../../generated";

export interface IStateProps {
  userCredentials: TUserCredentials;
  patientSearchResults: Array<PatientDTO> | undefined;
  isLoading: boolean;
}

export interface IPatientSearchItemProps {
  patient: PatientDTO;
}

export interface IDispatchProps {
  searchPatient: (values: object) => void;
}

export type TProps = IStateProps & IDispatchProps;

export interface IValues {
  id?: string,
  taxNumber?: string,
  firstName?: string;
  secondName?: string;
  birthDate?: string;
  address?: string;
}