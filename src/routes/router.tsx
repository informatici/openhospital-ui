import { useMemo } from 'react';
import { Navigate } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { usePluginsContext } from '~/plugins';
import NotFound from '../components/activities/notFound/NotFound';
import { Private } from '../components/Private';
import { ADMIN_ROUTES } from './admin';
import { PATIENT_ROUTES } from './patients';

export const useAppRouter = () => {
	const { remotes } = usePluginsContext();

	const router = useMemo(
		() =>
			createBrowserRouter([
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
						import(
							'../components/activities/forgotActivity/ForgotActivity'
						).then((module) => ({
							Component: module.ForgotActivity,
						})),
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
								import(
									'../components/activities/visitsActivity/VisitsActivity'
								).then((module) => ({
									Component: module.VisitsActivity,
								})),
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
						...remotes.map((remote) => ({
							path: remote.name,
							lazy: async () =>
								import('../plugins/components').then(({ RenderPluginApp }) => ({
									Component: () => (
										<RenderPluginApp
											plugin={{
												entry: 'app',
												remote: remote.name,
												cssUrl: remote.cssUrl,
											}}
										/>
									),
								})),
						})),

						{ path: '*', element: <NotFound /> },
					],
				},
			]),
		[remotes.map],
	);

	return router;
};
