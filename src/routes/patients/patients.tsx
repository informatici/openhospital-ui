import { useMemo } from 'react';
import type { RouteObject } from 'react-router';
import { usePatientDetailsRoutes } from './details';

export const usePatientRoutes = (): RouteObject[] => {
	const patientDetailsRoutes = usePatientDetailsRoutes();
	const routes = useMemo(
		() => [
			{
				path: 'patients',
				index: true,
				lazy: async () =>
					import(
						'../../components/activities/dashboardActivity/PatientDashboardActivity'
					).then((module) => ({
						Component: module.PatientDashboardActivity,
					})),
			},
			{
				path: 'patients/new',
				lazy: async () =>
					import('../../components/activities/newPatientActivity').then(
						(module) => ({
							Component: module.NewPatientActivity as React.ComponentType,
						}),
					),
			},
			{
				path: 'patients/search',
				lazy: async () =>
					import('../../components/activities/searchPatientActivity').then(
						(module) => ({
							Component: module.SearchPatientActivity,
						}),
					),
			},
			{
				path: 'patients/details/:id',
				lazy: async () =>
					import('./details').then((module) => ({
						Component: module.PatientDetailsActivity,
					})),

				children: patientDetailsRoutes,
			},
			{
				path: 'patients/details/:id/edit',
				lazy: async () =>
					import('../../components/activities/editPatientActivity').then(
						(module) => ({
							Component: module.EditPatientActivity,
						}),
					),
			},
			{
				path: 'patients/*',
				lazy: async () =>
					import('../../components/activities/notFound/NotFound').then(
						(module) => ({ Component: module.NotFound }),
					),
			},
		],
		[patientDetailsRoutes],
	);

	return routes;
};
