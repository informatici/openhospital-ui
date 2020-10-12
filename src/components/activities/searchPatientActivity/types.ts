import { TUserCredentials } from "../../../state/main/types";
import { PatientDTO } from "../../../generated";

export interface IStateProps {
  userCredentials: TUserCredentials;
  patientSearchResults: Array<PatientDTO> | undefined;
}

export interface IPatientSearchItemProps {
  patient: any; //TODO: use generated type here
}

export interface IDispatchProps {
  searchPatient: (values: object) => void;
}

export type TProps = IStateProps & IDispatchProps;

export interface IValues {
  firstName?: string;
  secondName?: string;
  birthDate?: string;
  address?: string;
}