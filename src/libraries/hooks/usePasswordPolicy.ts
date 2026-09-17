import { useEffect } from 'react';
import type { PasswordPolicyDTO } from '../../generated';
import { getPasswordPolicy } from '../../state/main';
import { useAppDispatch, useAppSelector } from './redux';

/**
 * Reads the server-side password policy from the store, fetching it once if it has not been loaded yet.
 * The endpoint is public, so this also works before authentication (login, forced change-password).
 */
export const usePasswordPolicy = (): PasswordPolicyDTO | undefined => {
	const dispatch = useAppDispatch();
	const passwordPolicy = useAppSelector((state) => state.main.passwordPolicy);
	useEffect(() => {
		if (passwordPolicy.status === 'IDLE') {
			dispatch(getPasswordPolicy());
		}
	}, [dispatch, passwordPolicy.status]);
	return passwordPolicy.data;
};
