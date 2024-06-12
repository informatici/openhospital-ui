import { IAdmissionTypesState } from "./admissions";
import { ITypeConfigsState } from "./config";
import { IVaccineTypesState } from "./vaccines";

export type ITypesState = {
  vaccines: IVaccineTypesState;
  admissions: IAdmissionTypesState;
  config: ITypeConfigsState;
};
