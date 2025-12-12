import { ApiResponse } from '../types';
import type { ISupplierState } from './types';

export const initial: ISupplierState = {
	create: new ApiResponse({ status: 'IDLE' }),
	update: new ApiResponse({ status: 'IDLE' }),
	delete: new ApiResponse({ status: 'IDLE' }),
	supplierList: new ApiResponse({
		status: 'IDLE',
		data: [],
	}),
};
