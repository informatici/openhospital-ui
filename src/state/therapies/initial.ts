import { ApiResponse } from '../types';
import type { ITherapiesState } from './types';

export const initial: ITherapiesState = {
	createTherapy: new ApiResponse({ status: 'IDLE' }),
	updateTherapy: new ApiResponse({ status: 'IDLE' }),
	therapiesByPatientId: new ApiResponse({ status: 'IDLE', data: [] }),
	deleteTherapy: new ApiResponse({ status: 'IDLE' }),
};
