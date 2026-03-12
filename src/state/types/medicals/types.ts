import type { MedicalTypeDTO } from '../../../generated';
import type { ApiResponse } from '../../types';

export type IMedicalTypesState = {
	getAll: ApiResponse<Array<MedicalTypeDTO>>;
	create: ApiResponse<MedicalTypeDTO>;
	update: ApiResponse<MedicalTypeDTO>;
	delete: ApiResponse<boolean>;
};
