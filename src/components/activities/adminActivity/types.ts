import { TUserCredentials } from "../../../state/main/types";
import { IApiResponse } from "../../../state/types";
import { PatientDTO } from "../../../generated";

export type TActivityTransitionState = "IDLE" | "TO_PATIENT_EDITING";

export type IAdminSection =
  | "wards"
  | "diseases"
  | "exams"
  | "operations"
  | "vaccines"
  | "priceList"
  | "suppliers"
  | "telemetry"
  | "usersGroups"
  | "manageTypes"
  | "hospitalInfo";
