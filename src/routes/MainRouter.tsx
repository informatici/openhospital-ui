import type React from 'react';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { useAppDispatch, useAppSelector } from '~/libraries/hooks/redux';
import { getUserSettings } from '../state/main';
import { router } from './router';
import { routerNoLazy } from './router-no-lazy';

const isTestMode = import.meta.env.MODE === 'test';

export const MainRouter: React.FC = () => {
	const dispatch = useAppDispatch();
	const status = useAppSelector(
		(state) => state.main.authentication.status ?? '',
	);
	useEffect(() => {
		if (status === 'SUCCESS') {
			dispatch(getUserSettings());
		}
	}, [dispatch, status]);

	return <RouterProvider router={isTestMode ? routerNoLazy : router} />;
};
