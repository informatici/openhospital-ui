import { DiseaseDTO, OpdDTO, PatientDTO } from "../../../generated";

export interface IStateProps {
  isLoading: boolean;
  hasSucceeded: boolean;
  hasFailed: boolean;
}
export interface IDispatchProps {
  createOpd: (
    opd: Record<string, any>,
    diseasesList: DiseaseDTO[] | undefined
  ) => any;
  createOpdReset: () => void;
  getDiseasesOpd: () => void;
  getOpds: (code: number | undefined) => void;
}

export type TProps = IStateProps & IDispatchProps;

export type TActivityTransitionState = "IDLE" | "TO_RESET" | "FAIL";

export type TPatientOPDFormFieldName =
  | "date"
  | "anamnesis"
  | "disease"
  | "disease2"
  | "disease3"
  | "note";
