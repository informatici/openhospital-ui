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
import { IWardState } from "./state/ward/types";
import { IDischargeTypeState } from "./state/dischargeTypes/types";
import { ILaboratoriesState } from "./state/laboratories/types";
import { IExamState } from "./state/exams/types";
import { IBillsState } from "./state/bills/types";
import { IPricesState } from "./state/prices/types";
import { IVisitState } from "./state/visits/types";
import { IOperationState } from "./state/operations/types";
import { IDiseaseTypeState } from "./state/diseaseTypes/types";
import { IExamTypeState } from "./state/examTypes/types";
import { IAgeTypeState } from "./state/ageTypes/types";
import { IHospitalState } from "./state/hospital/types";
import { ILayoutsState } from "./state/layouts/types";
import { IDashboardState } from "./state/dashboard/types";

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
  dischargeTypes: IDischargeTypeState;
  wards: IWardState;
  laboratories: ILaboratoriesState;
  exams: IExamState;
  bills: IBillsState;
  prices: IPricesState;
  visits: IVisitState;
  operations: IOperationState;
  diseaseTypes: IDiseaseTypeState;
  examTypes: IExamTypeState;
  ageTypes: IAgeTypeState;
  hospital: IHospitalState;
  layouts: ILayoutsState;
  dashboard: IDashboardState;
}

export enum FIELD_VALIDATION {
  SUGGESTED = "SUGGESTED",
  REQUIRED = "REQUIRED",
  IDLE = "IDLE",
}

// WARN: keep in sync with fixtures in ./mockServer/fixtures/permissionList.js
export type TPermission =
  | "opd.read"
  | "opd.create"
  | "opd.update"
  | "opd.delete"
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
  | "exam.delete"
  | "visit.access"
  | "patient.access"
  | "laboratory.access"
  | "dashboard.access"
  | "patient.read"
  | "patient.create"
  | "patient.update"
  | "patient.delete"
  | "admissiontypes.create"
  | "admissiontypes.update"
  | "admissiontypes.delete"
  | "admissiontypes.read"
  | "deliveryresulttype.create"
  | "deliveryresulttype.update"
  | "deliveryresulttype.delete"
  | "deliveryresulttype.read"
  | "deliverytypes.create"
  | "deliverytypes.update"
  | "deliverytypes.delete"
  | "deliverytypes.read"
  | "dischargetypes.create"
  | "dischargetypes.update"
  | "dischargetypes.delete"
  | "dischargetypes.read"
  | "discharges.create"
  | "discharges.update"
  | "discharges.delete"
  | "discharges.read"
  | "vaccines.create"
  | "vaccines.update"
  | "vaccines.delete"
  | "vaccines.read"
  | "vaccinetype.create"
  | "vaccinetype.update"
  | "vaccinetype.delete"
  | "vaccinetype.read"
  | "wards.create"
  | "wards.update"
  | "wards.delete"
  | "wards.read"
  | "examrows.create"
  | "examrows.update"
  | "examrows.delete"
  | "examrows.read"
  | "examtypes.create"
  | "examtypes.update"
  | "examtypes.delete"
  | "examtypes.read"
  | "examinations.create"
  | "examinations.update"
  | "examinations.delete"
  | "examinations.read"
  | "hospitals.create"
  | "hospitals.update"
  | "hospitals.delete"
  | "hospitals.read"
  | "laboratories.create"
  | "laboratories.update"
  | "laboratories.delete"
  | "laboratories.read"
  | "agetypes.update"
  | "agetypes.read"
  | "diseasetypes.create"
  | "diseasetypes.update"
  | "diseasetypes.delete"
  | "diseasetypes.read"
  | "operations.create"
  | "operations.update"
  | "operations.delete"
  | "operations.read"
  | "patientvaccines.create"
  | "patientvaccines.update"
  | "patientvaccines.delete"
  | "patientvaccines.read"
  | "pregnanttreatmenttypes.create"
  | "pregnanttreatmenttypes.update"
  | "pregnanttreatmenttypes.read"
  | "pricelists.create"
  | "pricelists.update"
  | "pricelists.delete"
  | "pricelists.read"
  | "pricesothers.create"
  | "pricesothers.update"
  | "pricesothers.delete"
  | "pricesothers.read"
  | "operationtypes.create"
  | "operationtypes.update"
  | "operationtypes.delete"
  | "operationtypes.read"
  | "diseases.create"
  | "diseases.update"
  | "diseases.delete"
  | "diseases.read"
  | "usersetting.read"
  | "usersetting.create"
  | "usersetting.update"
  | "usersetting.delete"
  | "permission.read"
  | "permission.create"
  | "permission.delete"
  | "permission.update"
  | "grouppermission.read"
  | "grouppermission.create"
  | "grouppermission.update"
  | "grouppermission.delete"
  | "user.delete"
  | "user.read"
  | "user.create"
  | "user.update";
