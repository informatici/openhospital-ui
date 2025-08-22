import { EncounterDTO } from "generated";

export interface IStateProps {
  isLoading: boolean;
  hasSucceeded: boolean;
  hasFailed: boolean;
}

export interface IDispatchProps {
  createEncounter: (enc: EncounterDTO) => any;
  createEncounterReset: () => void;
  getMedicals: () => void;
  getEncountersByPatient: (query: { patientId?: number | undefined }) => void;
}

export type TProps = IStateProps & IDispatchProps;

export type EncounterTransitionState = "IDLE" | "TO_RESET" | "FAIL";
