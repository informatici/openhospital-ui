import type { AdmissionTypeDTO } from '../../../generated';
import type { ApiResponse } from '../../types';

export type IAdmissionTypesState = {
	getAll: ApiResponse<Array<AdmissionTypeDTO>>;
	create: ApiResponse<AdmissionTypeDTO>;
	update: ApiResponse<AdmissionTypeDTO>;
	delete: ApiResponse<boolean>;
};
