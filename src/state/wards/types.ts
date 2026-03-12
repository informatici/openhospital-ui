import type { WardDTO } from '../../generated';
import type { ApiResponse } from '../types';

export type IWardState = {
	allWards: ApiResponse<Array<WardDTO>>;
	create: ApiResponse<WardDTO>;
	update: ApiResponse<WardDTO>;
	delete: ApiResponse<boolean>;
};
