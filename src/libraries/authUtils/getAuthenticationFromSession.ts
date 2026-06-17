import { AUTH_KEY, PERMISSION_KEY } from '../../consts';
import type { IAuthentication } from '../../state/main/types';
import { SessionStorage } from '../storage/storage';

export const getAuthenticationFromSession = (): IAuthentication => {
	const { permissions } = SessionStorage.read(PERMISSION_KEY);
	const { username, token, mustChangePassword } = SessionStorage.read(AUTH_KEY);

	if (!(token && username && permissions)) {
		throw new Error('unauthenticated');
	}

	return {
		username,
		permissions,
		token,
		mustChangePassword,
	};
};
