import { AdmissionDTO } from "../../../generated";

export interface IStateProps {
  isLoading: boolean;
  hasSucceeded: boolean;
  hasFailed: boolean;
}

export interface IDispatchProps {
  createAdmission: (adm: AdmissionDTO) => any;
  createAdmissionReset: () => void;
  getMedicals: () => void;
  getAdmissionsByPatientId: (ptaientCode: number | undefined) => void;
}

export type TProps = IStateProps & IDispatchProps;

export type AdmissionTransitionState = "IDLE" | "TO_RESET";
