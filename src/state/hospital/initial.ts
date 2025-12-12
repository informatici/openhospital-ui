import { ApiResponse } from '../types';
import type { IHospitalState } from './types';

export const initial: IHospitalState = {
	getHospital: new ApiResponse({ status: 'IDLE' }),
	updateHospital: new ApiResponse({ status: 'IDLE' }),
};
