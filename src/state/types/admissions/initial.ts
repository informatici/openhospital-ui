import { ApiResponse } from '../../types';
import type { IAdmissionTypesState } from './types';

export const initial: IAdmissionTypesState = {
	getAll: new ApiResponse({ status: 'IDLE', data: [] }),
	create: new ApiResponse({ status: 'IDLE' }),
	update: new ApiResponse({ status: 'IDLE' }),
	delete: new ApiResponse({ status: 'IDLE' }),
};
