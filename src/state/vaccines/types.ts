import type { VaccineDTO } from '../../generated';
import type { ApiResponse } from '../types';

export type IVaccineState = {
	vaccineList: ApiResponse<Array<VaccineDTO>>;
	create: ApiResponse<VaccineDTO>;
	update: ApiResponse<VaccineDTO>;
	delete: ApiResponse<boolean>;
};
