import { TUserCredentials } from "../../../state/main/types";
import { IApiResponse } from "../../../state/types";
import { PatientDTO } from "../../../generated";

export interface IStateProps {
  userCredentials: TUserCredentials;
  patient: IApiResponse<PatientDTO>;
}

export type TProps = IStateProps;
