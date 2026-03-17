import type React from 'react';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { useAppDispatch, useAppSelector } from '~/libraries/hooks/redux';
import { getUserSettings } from '../state/main';
import { useAppRouter } from './router';

export const MainRouter: React.FC = () => {
	const router = useAppRouter();
	const dispatch = useAppDispatch();
	const status = useAppSelector(
		(state) => state.main.authentication.status ?? '',
	);
	useEffect(() => {
		if (status === 'SUCCESS') {
			dispatch(getUserSettings());
		}
	}, [dispatch, status]);

	return <RouterProvider router={router} />;
};
