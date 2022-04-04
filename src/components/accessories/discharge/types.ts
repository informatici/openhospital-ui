import { AdmissionDTO } from "../../../generated";

export interface IStateProps {
  isLoading: boolean;
  hasSucceeded: boolean;
  hasFailed: boolean;
}

export interface IDispatchProps {
  dischargePatient: (adm: AdmissionDTO) => any;
  dischargePaitientReset: () => void;
  getAdmissionsByPatientId: (ptaientCode: number | undefined) => void;
}

export type TProps = IStateProps & IDispatchProps;

export type AdmissionTransitionState = "IDLE" | "TO_RESET" | "FAIL";
