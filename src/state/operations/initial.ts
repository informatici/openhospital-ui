import { ApiResponse } from '../types';
import type { IOperationState } from './types';

export const initial: IOperationState = {
	operationList: new ApiResponse({
		status: 'IDLE',
		data: [],
	}),
	createOperationRow: new ApiResponse({ status: 'IDLE' }),
	updateOperationRow: new ApiResponse({ status: 'IDLE' }),
	deleteOperationRow: new ApiResponse({ status: 'IDLE' }),
	operationRowsByQdmt: new ApiResponse({
		status: 'IDLE',
		data: [],
	}),
	create: new ApiResponse({ status: 'IDLE' }),
	update: new ApiResponse({ status: 'IDLE' }),
	delete: new ApiResponse({ status: 'IDLE' }),
};
