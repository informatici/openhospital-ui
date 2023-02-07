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
  getAdmissions: (query: {
    patientcode?: number | undefined;
    admissionrange?: string[] | undefined;
    dischargerange?: string[] | undefined;
    searchterms?: string | undefined;
  }) => void;
}

export type TProps = IStateProps & IDispatchProps;

export type AdmissionTransitionState = "IDLE" | "TO_RESET" | "FAIL";
