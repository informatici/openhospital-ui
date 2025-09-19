export type TActivityTransitionState = "IDLE" | "TO_PATIENT_ENCOUNTER_EDITING";

export type TUserSection =
  | "encounters"
  | "admissions"
  | "medical-history"
  | "visits"
  | "triage"
  | "therapy"
  | "laboratory"
  | "operation"
  | "admission"
  | "discharge"
  | "clinic"
  | "conditioning"
  | "radiology";

export interface IPatientEncounterContentProps {
  title: string;
  content: React.ComponentType;
}
