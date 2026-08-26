import type { PermissionDTO } from '../../generated';
import { ApiResponse } from '../types';
import type { IPermissionsState } from './types';

export const initial: IPermissionsState = {
	getAll: new ApiResponse({
		status: 'IDLE',
		data: [] as PermissionDTO[],
	}),
};
