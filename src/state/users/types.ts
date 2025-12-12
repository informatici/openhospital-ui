import type { UserDTO } from '../../generated';
import type { ApiResponse } from '../types';

export type IUserState = {
	userList: ApiResponse<Array<UserDTO>>;
	getById: ApiResponse<UserDTO>;
	create: ApiResponse<UserDTO>;
	update: ApiResponse<UserDTO>;
	delete: ApiResponse<void>;
};
