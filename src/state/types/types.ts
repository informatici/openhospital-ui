import { IAdmissionTypesState } from "./admissions";
import { IAgeTypesState } from "./ageTypes";
import { ITypeConfigsState } from "./config";
import { IDeliveryTypesState } from "./deliveries";
import { IDeliveryResultTypeState } from "./deliveryResults";
import { IDischargeTypesState } from "./discharges";
import { IDiseaseTypesState } from "./diseases";
import { IExamTypesState } from "./exams";
import { IMedicalTypesState } from "./medicals";
import { IOperationTypesState } from "./operations";
import { IPregnantTreatmentTypesState } from "./pregnantTreatment";
import { IVaccineTypesState } from "./vaccines";

export type ITypesState = {
  vaccines: IVaccineTypesState;
  admissions: IAdmissionTypesState;
  ageTypes: IAgeTypesState;
  diseases: IDiseaseTypesState;
  operations: IOperationTypesState;
  config: ITypeConfigsState;
  exams: IExamTypesState;
  discharges: IDischargeTypesState;
  deliveries: IDeliveryTypesState;
  medicals: IMedicalTypesState;
  pregnantTreatment: IPregnantTreatmentTypesState;
  deliveryResult: IDeliveryResultTypeState;
};
