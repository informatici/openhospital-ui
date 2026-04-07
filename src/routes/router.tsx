import { useMemo } from 'react';
import { Navigate } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { PluginBundleLocationEnum } from '~/generated/models/PluginBundle';
import { usePluginsContext } from '~/plugins';
import NotFound from '../components/activities/notFound/NotFound';
import { Private } from '../components/Private';
import { ADMIN_ROUTES } from './admin';
import { usePatientRoutes } from './patients';

export const useAppRouter = () => {
	const { remotes } = usePluginsContext();

	const patientRoutes = usePatientRoutes();

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
						...patientRoutes,
						...remotes
							.filter(
								(remote) => remote.location === PluginBundleLocationEnum.Main,
							)
							.map((remote) => ({
								path: remote.name,
								lazy: async () =>
									import('../plugins/components').then(
										({ RenderPluginApp }) => ({
											Component: () => (
												<RenderPluginApp
													plugin={{
														entry: 'app',
														remote: remote.name,
														styles: remote.styles,
													}}
												/>
											),
										}),
									),
							})),

						{ path: '*', element: <NotFound /> },
					],
				},
			]),
		[remotes.filter, patientRoutes],
	);

	return router;
};
