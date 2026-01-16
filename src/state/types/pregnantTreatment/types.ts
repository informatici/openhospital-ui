import type { PregnantTreatmentTypeDTO } from '../../../generated';
import type { ApiResponse } from '../../types';

export type IPregnantTreatmentTypesState = {
	getAll: ApiResponse<Array<PregnantTreatmentTypeDTO>>;
	create: ApiResponse<PregnantTreatmentTypeDTO>;
	update: ApiResponse<PregnantTreatmentTypeDTO>;
	delete: ApiResponse<boolean>;
};
