import type React from 'react';
import { useEffect } from 'react';
import { Navigate, RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/libraries/hooks/redux';
import NotFound from '../components/activities/notFound/NotFound';
import { Private } from '../components/Private';
import { getUserSettings } from '../state/main';
import { ADMIN_ROUTES } from './admin';
import { PATIENT_ROUTES } from './patients';

const router = createBrowserRouter([
	{
		path: '',
		element: <Navigate to="/patients" replace />,
	},
	{
		path: 'login',
		lazy: async () =>
			import('../components/activities/loginActivity/LoginActivity').then(
				(module) => ({
					Component: module.LoginActivity,
				}),
			),
	},
	{
		path: 'forgot',
		lazy: async () =>
			import('../components/activities/forgotActivity/ForgotActivity').then(
				(module) => ({
					Component: module.ForgotActivity,
				}),
			),
	},
	{
		path: '*',
		element: <Private />,
		children: [
			{
				path: 'dashboard',
				lazy: async () =>
					import('../components/accessories/dashboard/Dashboard').then(
						(module) => ({
							Component: module.Dashboard,
						}),
					),
			},
			{
				path: 'visits',
				lazy: async () =>
					import('../components/activities/visitsActivity/VisitsActivity').then(
						(module) => ({
							Component: module.VisitsActivity,
						}),
					),
			},
			{
				path: 'laboratory',
				lazy: async () =>
					import(
						'../components/activities/laboratoryActivity/LaboratoryActivity'
					).then((module) => ({
						Component: module.LaboratoryActivity,
					})),
			},
			{
				path: 'admin',
				lazy: async () =>
					import('./admin').then((module) => ({
						Component: module.AdminActivity,
					})),
				children: ADMIN_ROUTES,
			},
			...PATIENT_ROUTES,
			{ path: '*', element: <NotFound /> },
		],
	},
]);

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

	return <RouterProvider router={router} />;
};
