import type { DischargeTypeDTO } from '../../../generated';
import type { ApiResponse } from '../../types';

export type IDischargeTypesState = {
	getAll: ApiResponse<Array<DischargeTypeDTO>>;
	create: ApiResponse<DischargeTypeDTO>;
	update: ApiResponse<DischargeTypeDTO>;
	delete: ApiResponse<boolean>;
};
