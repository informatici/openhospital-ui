import type { IAdmissionTypesState } from './admissions';
import type { IAgeTypesState } from './ageTypes';
import type { ITypeConfigsState } from './config';
import type { IDeliveryTypesState } from './deliveries';
import type { IDeliveryResultTypeState } from './deliveryResults';
import type { IDischargeTypesState } from './discharges';
import type { IDiseaseTypesState } from './diseases';
import type { IExamTypesState } from './exams';
import type { IMedicalTypesState } from './medicals';
import type { IOperationTypesState } from './operations';
import type { IPregnantTreatmentTypesState } from './pregnantTreatment';
import type { IVaccineTypesState } from './vaccines';

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
