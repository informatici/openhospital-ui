import { Navigate } from 'react-router';
import PatientDetailsActivity from '~/components/activities/patientDetailsActivity/PatientDetailsActivity';

export const PATIENT_DETAILS_ROUTES = [
	{
		index: true,
		element: <Navigate to="admissions" replace />,
	},
	{
		path: 'admissions',
		lazy: async () =>
			import('../../components/accessories/admission/PatientAdmission').then(
				(module) => ({ Component: module.PatientAdmission }),
			),
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
			import('../../components/accessories/patientTriage/PatientTriage').then(
				(module) => ({ Component: module.PatientTriage }),
			),
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
			import('../../components/accessories/patientSummary/PatientSummary').then(
				(module) => ({ Component: module.PatientSummary }),
			),
	},
	{
		path: 'operation',
		lazy: async () =>
			import(
				'../../components/accessories/patientOperation/PatientOperation'
			).then((module) => ({ Component: module.PatientOperation })),
	},
	{
		path: '*',
		lazy: async () =>
			import('../../components/activities/notFound/NotFound').then(
				(module) => ({
					Component: module.NotFound,
				}),
			),
	},
];

export { PatientDetailsActivity };
