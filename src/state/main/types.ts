import type { UserSettingDTO } from '../../generated';
import type { LoginResponse } from '../../generated/models/LoginResponse';
import type { TPermission } from '../../types';
import type { ApiResponse } from '../types';

export type TUserCredentials = LoginResponse | undefined;

export interface IAuthentication extends LoginResponse {
	permissions: TPermission[];
}

export interface IMainState {
	authentication: ApiResponse<IAuthentication>;
	logout: ApiResponse<void>;
	forgotpassword: ApiResponse<void>;
	settings: ApiResponse<UserSettingDTO[]>;
}
