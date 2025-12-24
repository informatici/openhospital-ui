import type { RouteObject } from 'react-router';
import { PatientDashboardActivity } from '../../components/activities/dashboardActivity/PatientDashboardActivity';
import { EditPatientActivity } from '../../components/activities/editPatientActivity';
import { NewPatientActivity } from '../../components/activities/newPatientActivity';
import NotFound from '../../components/activities/notFound/NotFound';
import { SearchPatientActivity } from '../../components/activities/searchPatientActivity';
import { PATIENT_DETAILS_ROUTES_NO_LAZY } from './details-no-lazy';

export const PATIENT_ROUTES_NO_LAZY: RouteObject[] = [
	{
		path: 'patients',
		index: true,
		Component: PatientDashboardActivity,
	},
	{
		path: 'patients/new',
		Component: NewPatientActivity as any,
	},
	{
		path: 'patients/search',
		Component: SearchPatientActivity,
	},
	...PATIENT_DETAILS_ROUTES_NO_LAZY,
	{
		path: 'patients/details/:id/edit',
		Component: EditPatientActivity,
	},
	{
		path: 'patients/*',
		Component: NotFound,
	},
];
