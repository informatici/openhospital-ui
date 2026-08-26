import { ApiResponse } from '../types';
import type { IPatientsState } from './types';

export const initial: IPatientsState = {
	createPatient: new ApiResponse({ status: 'IDLE' }),
	searchResults: new ApiResponse({ status: 'IDLE', data: [] }),
	selectedPatient: new ApiResponse({ status: 'IDLE' }),
	updatePatient: new ApiResponse({ status: 'IDLE' }),
	getCities: new ApiResponse({ status: 'IDLE', data: [] }),
	getPatients: new ApiResponse({ status: 'IDLE' }),
};
