import { Navigate, type RouteObject } from 'react-router';
import PatientDetailsActivity from '~/components/activities/patientDetailsActivity/PatientDetailsActivity';
import { PatientAdmission } from '../../components/accessories/admission/PatientAdmission';
import { PatientExams } from '../../components/accessories/patientExams/PatientExams';
import { PatientOPD } from '../../components/accessories/patientOPD/patientOPD';
import { PatientOperation } from '../../components/accessories/patientOperation/PatientOperation';
import { PatientSummary } from '../../components/accessories/patientSummary/PatientSummary';
import { PatientTriage } from '../../components/accessories/patientTriage/PatientTriage';
import NotFound from '../../components/activities/notFound/NotFound';
import { DischargeDetailsActivityContent } from '../../components/activities/patientDetailsActivityContent/DischargeDetailsActivityContent';

export const PATIENT_DETAILS_ROUTES_NO_LAZY: RouteObject[] = [
	{
		path: 'patients/details/:id',
		Component: PatientDetailsActivity,
		children: [
			{
				index: true,
				element: <Navigate to="admissions" replace />,
			},
			{
				path: 'admissions',
				Component: PatientAdmission,
			},
			{
				path: 'visits',
				Component: PatientOPD,
			},
			{
				path: 'laboratory',
				Component: PatientExams,
			},
			{
				path: 'triage',
				Component: PatientTriage,
			},
			{
				path: 'discharge',
				Component: DischargeDetailsActivityContent,
			},
			{
				path: 'clinic',
				Component: PatientSummary,
			},
			{
				path: 'operation',
				Component: PatientOperation,
			},
			{
				path: '*',
				Component: NotFound,
			},
		],
	},
];
