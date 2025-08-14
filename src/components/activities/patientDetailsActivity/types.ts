export type TActivityTransitionState = "IDLE" | "TO_PATIENT_EDITING";

export type IUserSection =
  | "encounters"
  | "admissions"
  | "visits"
  | "triage"
  | "therapy"
  | "laboratory"
  | "operation"
  | "admission"
  | "discharge"
  | "clinic"
  | "radiology";
