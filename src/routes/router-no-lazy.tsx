import { Navigate } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { Dashboard } from '../components/accessories/dashboard/Dashboard';
import { ForgotActivity } from '../components/activities/forgotActivity/ForgotActivity';
import { LaboratoryActivity } from '../components/activities/laboratoryActivity/LaboratoryActivity';
import { LoginActivity } from '../components/activities/loginActivity/LoginActivity';
import NotFound from '../components/activities/notFound/NotFound';
import { VisitsActivity } from '../components/activities/visitsActivity/VisitsActivity';
import { Private } from '../components/Private';
import { ADMIN_ROUTES_NO_LAZY } from './admin';
import { PATIENT_ROUTES_NO_LAZY } from './patients';

export const routerNoLazy = createBrowserRouter([
	{
		path: '',
		element: <Navigate to="/patients" replace />,
	},
	{
		path: 'login',
		Component: LoginActivity,
	},
	{
		path: 'forgot',
		Component: ForgotActivity,
	},
	{
		path: '*',
		Component: Private,
		children: [
			{
				path: 'dashboard',
				Component: Dashboard,
			},
			{
				path: 'visits',
				Component: VisitsActivity,
			},
			{
				path: 'laboratory',
				Component: LaboratoryActivity,
			},
			...ADMIN_ROUTES_NO_LAZY,
			...PATIENT_ROUTES_NO_LAZY,
			{ path: '*', Component: NotFound },
		],
	},
]);
