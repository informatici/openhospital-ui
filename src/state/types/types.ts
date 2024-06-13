import { IAdmissionTypesState } from "./admissions";
import { ITypeConfigsState } from "./config";
import { IDischargeTypesState } from "./discharges";
import { IDeliveryTypesState } from "./deliveries";
import { IDiseaseTypesState } from "./diseases";
import { IOperationTypesState } from "./operations";
import { IVaccineTypesState } from "./vaccines";

export type ITypesState = {
  vaccines: IVaccineTypesState;
  admissions: IAdmissionTypesState;
  diseases: IDiseaseTypesState;
  operations: IOperationTypesState;
  config: ITypeConfigsState;
  discharges: IDischargeTypesState;
  deliveries: IDeliveryTypesState;
};
