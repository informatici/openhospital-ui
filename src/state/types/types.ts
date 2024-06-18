import { IAdmissionTypesState } from "./admissions";
import { ITypeConfigsState } from "./config";
import { IDischargeTypesState } from "./discharges";
import { IDeliveryTypesState } from "./deliveries";
import { IDeliveryResultTypeState } from "./deliveryResultType";
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
  discharges: IDischargeTypesState;
  deliveries: IDeliveryTypesState;
  deliveryResult: IDeliveryResultTypeState;
};
