import type { UserGroupDTO } from '../../generated';
import { ApiResponse } from '../types';
import type { IUserGroupState } from './types';

export const initial: IUserGroupState = {
	groupList: new ApiResponse({
		status: 'IDLE',
		data: [] as UserGroupDTO[],
	}),
	currentGroup: new ApiResponse({
		status: 'IDLE',
		data: {} as UserGroupDTO,
	}),
	create: new ApiResponse({ status: 'IDLE' }),
	update: new ApiResponse({ status: 'IDLE' }),
	delete: new ApiResponse({ status: 'IDLE' }),
	setPermission: new ApiResponse({ status: 'IDLE' }),
};
