import type { UserDTO } from '../../generated';
import { ApiResponse } from '../types';
import type { IUserState } from './types';

export const initial: IUserState = {
	userList: new ApiResponse({ status: 'IDLE', data: [] as UserDTO[] }),
	getById: new ApiResponse({ status: 'IDLE' }),
	create: new ApiResponse({ status: 'IDLE' }),
	update: new ApiResponse({ status: 'IDLE' }),
	delete: new ApiResponse({ status: 'IDLE' }),
};
