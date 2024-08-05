export interface IOwnProps {
  newPatientRoute: string;
  searchPatientRoute: string;
}

export type TActivityTransitionState =
  | "IDLE"
  | "TO_NEW_PATIENT"
  | "TO_SEARCH_PATIENT";
