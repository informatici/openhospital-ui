import type React from 'react';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { useAppDispatch, useAppSelector } from '~/libraries/hooks/redux';
import { getPasswordPolicy, getUserSettings } from '../state/main';
import { router } from './router';

export const MainRouter: React.FC = () => {
	const dispatch = useAppDispatch();
	const status = useAppSelector(
		(state) => state.main.authentication.status ?? '',
	);
	// the password policy is public and may be needed before authentication (login, forced change-password), so fetch it once on mount
	useEffect(() => {
		dispatch(getPasswordPolicy());
	}, [dispatch]);
	useEffect(() => {
		if (status === 'SUCCESS') {
			dispatch(getUserSettings());
		}
	}, [dispatch, status]);

	return <RouterProvider router={router} />;
};
