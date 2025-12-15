import type React from 'react';
import { useEffect } from 'react';
import {
	createRoutesFromElements,
	Navigate,
	Outlet,
	Route,
	RouterProvider,
} from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/libraries/hooks/redux';
import Dashboard from '../components/accessories/dashboard/Dashboard';
import ForgotActivity from '../components/activities/forgotActivity/ForgotActivity';
import LaboratoryActivity from '../components/activities/laboratoryActivity/LaboratoryActivity';
import LoginActivity from '../components/activities/loginActivity/LoginActivity';
import { RedirectAfterLogin } from '../components/activities/loginActivity/RedirectAfterLogin';
import NotFound from '../components/activities/notFound/NotFound';
import PermissionDenied from '../components/activities/PermissionDenied/PermissionDenied';
import VisitsActivity from '../components/activities/visitsActivity/VisitsActivity';
import { Private } from '../components/Private';
import { PATHS } from '../consts';
import { withPermission } from '../libraries/permissionUtils/withPermission';
import { getUserSettings } from '../state/main';
import { AdminRoutes } from './Admin';
import { PatientsRoutes } from './Patients/PatientsRoutes';

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

	const RequiredAdminAccess = withPermission(
		'admin.access',
		PermissionDenied,
	)(AdminRoutes);

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route element={<Outlet />}>
				{/* TODO: based on user profile, redirect to patient, dashboard or whatever */}
				<Route index element={<Navigate to="/patients" replace />} />

				<Route
					path="login"
					element={
						<RedirectAfterLogin>
							<LoginActivity />
						</RedirectAfterLogin>
					}
				/>
				<Route path="forgot" element={<ForgotActivity />} />

				<Route element={<Private />}>
					<Route path={`${PATHS.dashboard}`} element={<Dashboard />} />
					<Route path={`${PATHS.visits}`} element={<VisitsActivity />} />
					<Route path={PATHS.laboratory}>
						<Route path={'*'} element={<LaboratoryActivity />} />
					</Route>
					<Route path={PATHS.patients}>
						<Route path={'*'} element={<PatientsRoutes />} />
					</Route>
					<Route path={PATHS.admin}>
						<Route path={'*'} element={<RequiredAdminAccess />} />
					</Route>
				</Route>

				<Route path="*" element={<NotFound />} />
			</Route>,
		),
		{
			basename: import.meta.env.PUBLIC_URL,
			future: { v7_relativeSplatPath: true },
		},
	);

	return <RouterProvider router={router} />;
};
