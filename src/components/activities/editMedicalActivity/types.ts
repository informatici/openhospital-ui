import { MedicalDTO } from "../../../generated";
import { TUserCredentials } from "../../../state/main/types";
import { IApiResponse, TAPIResponseStatus } from "../../../state/types";

export interface IStateProps {
  userCredentials: TUserCredentials;
  isLoading: boolean;
  hasSucceeded: boolean;
  hasFailed: boolean;
  medical: IApiResponse<MedicalDTO>;
  getMedicalStatus: TAPIResponseStatus;
}

export interface IDispatchProps {
  getMedical: (code: number) => void;
  updateMedicalReset: () => any;
  updateMedical: (medicalDTO: MedicalDTO, ignoreSimilar: boolean ) => any;
}

export type TProps = IStateProps & IDispatchProps;

export type TActivityTransitionState =
  | "IDLE"
  | "LOADING"
  | "SUCCESS"
  | "FAIL"
  | "TO_KEEP_EDITING";
