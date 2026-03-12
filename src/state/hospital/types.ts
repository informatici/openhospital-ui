import type { HospitalDTO } from '../../generated';
import type { ApiResponse } from '../types';

export type IHospitalState = {
	getHospital: ApiResponse<HospitalDTO>;
	updateHospital: ApiResponse<HospitalDTO>;
};
