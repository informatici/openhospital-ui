import { IExaminationsState } from "./state/examinations/types";
import { IMainState } from "./state/main/types";
import { IOpdState } from "./state/opds/types";
import { IMedicalState } from "./state/medicals/types";
import { IPatientsState } from "./state/patients/types";
import { ISummaryState } from "./state/summary/types";
import { ITherapiesState } from "./state/therapies/types";
import { IDiseaseState } from "./state/diseases/types";
import { IAdmissionsState } from "./state/admissions/types";
import { IAdmissionTypeState } from "./state/admissionTypes/types";
import { IAdmissionBookingsState } from "./state/admissionBookings/types";
import { IWardState } from "./state/ward/types";
import { IDischargeTypeState } from "./state/dischargeTypes/types";
import { ILaboratoriesState } from "./state/laboratories/types";
import { IExamState } from "./state/exams/types";
import { IBillsState } from "./state/bills/types";
import { IPricesState } from "./state/prices/types";
import { ISurgicalRecordsState } from "./state/surgicalRecords/types";

export interface IState {
  main: IMainState;
  patients: IPatientsState;
  examinations: IExaminationsState;
  therapies: ITherapiesState;
  diseases: IDiseaseState;
  summary: ISummaryState;
  opds: IOpdState;
  medicals: IMedicalState;
  admissions: IAdmissionsState;
  admissionTypes: IAdmissionTypeState;
  admissionBookings: IAdmissionBookingsState;
  dischargeTypes: IDischargeTypeState;
  wards: IWardState;
  laboratories: ILaboratoriesState;
  exams: IExamState;
  bills: IBillsState;
  prices: IPricesState;
  surgicalRecords: ISurgicalRecordsState;
}

// WARN: keep in sync with fixtures in ./mockServer/fixtures/permissionList.js
export type TPermission =
  | "odp.read"
  | "odp.create"
  | "odp.update"
  | "odp.delete"
  | "summary.read"
  | "summary.create"
  | "summary.update"
  | "summary.delete"
  | "examination.read"
  | "examination.create"
  | "examination.update"
  | "examination.delete"
  | "admission.read"
  | "admission.create"
  | "admission.update"
  | "admission.delete"
  | "therapy.read"
  | "therapy.create"
  | "therapy.update"
  | "therapy.delete"
  | "vaccine.read"
  | "vaccine.create"
  | "vaccine.update"
  | "vaccine.delete"
  | "exam.read"
  | "exam.create"
  | "exam.update"
  | "exam.delete";
