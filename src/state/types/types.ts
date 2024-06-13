import { IAdmissionTypesState } from "./admissions";
import { ITypeConfigsState } from "./config";
import { IDeliveryTypesState } from "./deliveries";
import { IDiseaseTypesState } from "./diseases";
import { IOperationTypesState } from "./operations";
import { IVaccineTypesState } from "./vaccines";
import { IExamTypesState } from "./exams";

export type ITypesState = {
  vaccines: IVaccineTypesState;
  admissions: IAdmissionTypesState;
  diseases: IDiseaseTypesState;
  operations: IOperationTypesState;
  config: ITypeConfigsState;
  exams: IExamTypesState;
  deliveries: IDeliveryTypesState;
};
