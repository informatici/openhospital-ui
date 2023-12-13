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
  | "admissions.create"
  | "admissions.read"
  | "admissions.update"
  | "admissions.delete"
  | "admissiontypes.create"
  | "admissiontypes.read"
  | "admissiontypes.update"
  | "admissiontypes.delete"
  | "agetypes.read"
  | "agetypes.update"
  | "dischargetypes.create"
  | "dischargetypes.read"
  | "dischargetypes.update"
  | "dischargetypes.delete"
  | "diseases.create"
  | "diseases.read"
  | "diseases.update"
  | "diseases.delete"
  | "diseasetypes.read"
  | "diseasetypes.create"
  | "diseasetypes.update"
  | "diseasetypes.delete"
  | "deliveryresulttypes.create"
  | "deliveryresulttypes.read"
  | "deliveryresulttypes.update"
  | "deliveryresulttypes.delete"
  | "deliverytypes.create"
  | "deliverytypes.read"
  | "deliverytypes.update"
  | "deliverytypes.delete"
  | "exams.create"
  | "exams.read"
  | "exams.update"
  | "exams.delete"
  | "examrows.create"
  | "examrows.read"
  | "examrows.update"
  | "examrows.delete"
  | "examinations.create"
  | "examinations.read"
  | "examinations.update"
  | "examinations.delete"
  | "examtypes.create"
  | "examtypes.read"
  | "examtypes.update"
  | "examtypes.delete"
  | "hospitals.create"
  | "hospitals.read"
  | "hospitals.update"
  | "hospitals.delete"
  | "laboratories.create"
  | "laboratories.read"
  | "laboratories.update"
  | "laboratories.delete"
  | "malnutritions.create"
  | "malnutritions.read"
  | "malnutritions.update"
  | "malnutritions.delete"
  | "medicals.create"
  | "medicals.read"
  | "medicals.update"
  | "medicals.delete"
  | "medicalstockmovements.create"
  | "medicalstockmovements.read"
  | "medicalstockmovements.update"
  | "medicalstockmovements.delete"
  | "medicalstockward.create"
  | "medicalstockward.read"
  | "medicalstockward.update"
  | "medicalstockward.delete"
  | "medstockmovementtypes.create"
  | "medstockmovementtypes.read"
  | "medstockmovementtypes.update"
  | "medstockmovementtypes.delete"
  | "medicaltypes.create"
  | "medicaltypes.read"
  | "medicaltypes.update"
  | "medicaltypes.delete"
  | "opds.create"
  | "opds.read"
  | "opds.update"
  | "opds.delete"
  | "operations.create"
  | "operations.read"
  | "operations.update"
  | "operations.delete"
  | "operationtypes.create"
  | "operationtypes.read"
  | "operationtypes.update"
  | "operationtypes.delete"
  | "patientconsensus.create"
  | "patientconsensus.read"
  | "patientconsensus.update"
  | "patientconsensus.delete"
  | "patients.create"
  | "patients.read"
  | "patients.update"
  | "patients.delete"
  | "patientvaccines.create"
  | "patientvaccines.read"
  | "patientvaccines.update"
  | "patientvaccines.delete"
  | "permissions.create"
  | "permissions.read"
  | "permissions.update"
  | "permissions.delete"
  | "grouppermission.create"
  | "grouppermission.read"
  | "grouppermission.update"
  | "grouppermission.delete"
  | "users.create"
  | "users.read"
  | "users.update"
  | "users.delete"
  | "usersettings.create"
  | "usersettings.read"
  | "usersettings.update"
  | "usersettings.delete"
  | "pregnanttreatmenttypes.create"
  | "pregnanttreatmenttypes.read"
  | "pregnanttreatmenttypes.update"
  | "pregnanttreatmenttypes.delete"
  | "pricelists.create"
  | "pricelists.read"
  | "pricelists.update"
  | "pricelists.delete"
  | "pricesothers.create"
  | "pricesothers.read"
  | "pricesothers.update"
  | "pricesothers.delete"
  | "reports.create"
  | "reports.read"
  | "reports.update"
  | "reports.delete"
  | "sms.create"
  | "sms.read"
  | "sms.update"
  | "sms.delete"
  | "suppliers.create"
  | "suppliers.read"
  | "suppliers.update"
  | "suppliers.delete"
  | "therapies.create"
  | "therapies.read"
  | "therapies.update"
  | "therapies.delete"
  | "vaccines.create"
  | "vaccines.read"
  | "vaccines.update"
  | "vaccines.delete"
  | "vaccinetype.create"
  | "vaccinetype.read"
  | "vaccinetype.update"
  | "vaccinetype.delete"
  | "visits.create"
  | "visits.read"
  | "visits.update"
  | "visits.delete"
  | "wards.create"
  | "wards.read"
  | "wards.update"
  | "wards.delete"
  | "dashboard.access"
  | "laboratories.access"
  | "patients.access"
  | "opds.access";
