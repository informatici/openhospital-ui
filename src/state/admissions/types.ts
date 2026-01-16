import type {
	AdmissionDTO,
	AdmittedPatientDTO,
	PageAdmissionDTO,
} from '../../generated';
import type { ApiResponse } from '../types';

export type IAdmissionsState = {
	createAdmission: ApiResponse<AdmissionDTO>;
	updateAdmission: ApiResponse<AdmissionDTO>;
	getAdmissions: ApiResponse<PageAdmissionDTO>;
	getDischarges: ApiResponse<PageAdmissionDTO>;
	getPatientAdmissions: ApiResponse<Array<AdmissionDTO>>;
	getAdmittedPatients: ApiResponse<Array<AdmittedPatientDTO>>;
	currentAdmissionByPatientId: ApiResponse<AdmissionDTO>;
	dischargePatient: ApiResponse<AdmissionDTO>;
};
