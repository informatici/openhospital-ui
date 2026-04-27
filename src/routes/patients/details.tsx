import { useMemo } from 'react';
import { Navigate } from 'react-router';
import PatientDetailsActivity from '~/components/activities/patientDetailsActivity/PatientDetailsActivity';
import PatientDetailsActivityContent from '~/components/activities/patientDetailsActivityContent/PatientDetailsActivityContent';
import { PluginBundleLocationEnum } from '~/generated';
import { usePluginsContext } from '~/plugins';

export const usePatientDetailsRoutes = () => {
	const { remotes } = usePluginsContext();

	const routes = useMemo(
		() => [
			{
				index: true,
				element: <Navigate to="admissions" replace />,
			},
			{
				path: 'admissions',
				lazy: async () =>
					import(
						'../../components/accessories/admission/PatientAdmission'
					).then((module) => ({ Component: module.PatientAdmission })),
			},
			{
				path: 'visits',
				lazy: async () =>
					import('../../components/accessories/patientOPD/patientOPD').then(
						(module) => ({ Component: module.PatientOPD }),
					),
			},
			{
				path: 'laboratory',
				lazy: async () =>
					import('../../components/accessories/patientExams/PatientExams').then(
						(module) => ({ Component: module.PatientExams }),
					),
			},
			{
				path: 'triage',
				lazy: async () =>
					import(
						'../../components/accessories/patientTriage/PatientTriage'
					).then((module) => ({ Component: module.PatientTriage })),
			},
			{
				path: 'discharge',
				lazy: async () =>
					import(
						'../../components/activities/patientDetailsActivityContent/DischargeDetailsActivityContent'
					).then((module) => ({
						Component: module.DischargeDetailsActivityContent,
					})),
			},
			{
				path: 'clinic',
				lazy: async () =>
					import(
						'../../components/accessories/patientSummary/PatientSummary'
					).then((module) => ({ Component: module.PatientSummary })),
			},
			{
				path: 'operation',
				lazy: async () =>
					import(
						'../../components/accessories/patientOperation/PatientOperation'
					).then((module) => ({ Component: module.PatientOperation })),
			},
			...remotes
				.filter(
					(remote) => remote.location === PluginBundleLocationEnum.Patient,
				)
				.map((remote) => ({
					path: remote.name,
					lazy: async () =>
						import('../../plugins').then(({ RenderPluginApp }) => ({
							Component: () => (
								<PatientDetailsActivityContent title={remote.label}>
									<RenderPluginApp
										showHeaderAndFooter={false}
										plugin={{
											entry: 'app',
											remote: remote.name,
											styles: remote.styles,
										}}
									/>
								</PatientDetailsActivityContent>
							),
						})),
				})),
			{
				path: '*',
				lazy: async () =>
					import('../../components/activities/notFound/NotFound').then(
						(module) => ({
							Component: module.NotFound,
						}),
					),
			},
		],
		[remotes],
	);

	return routes;
};

export { PatientDetailsActivity };
