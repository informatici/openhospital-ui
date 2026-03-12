import type { PermissionDTO } from '../../generated';
import type { ApiResponse } from '../types';

export type IPermissionsState = {
	getAll: ApiResponse<Array<PermissionDTO>>;
};
