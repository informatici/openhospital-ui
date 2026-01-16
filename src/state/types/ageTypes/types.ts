import type { AgeTypeDTO } from '../../../generated';
import type { ApiResponse } from '../../types';

export type IAgeTypesState = {
	getAll: ApiResponse<Array<AgeTypeDTO>>;
	update: ApiResponse<Array<AgeTypeDTO>>;
};
