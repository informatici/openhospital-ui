import { createSelector } from '@reduxjs/toolkit';
import { Chart, registerables } from 'chart.js';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router';
import { useAppSelector } from '~/libraries/hooks/redux';
import { useLandingPageRoute } from '../../../libraries/hooks/useLandingPageRoute';
import { usePermission } from '../../../libraries/permissionUtils/usePermission';
import AppHeader from '../appHeader/AppHeader';
import Footer from '../footer/Footer';
import { DashboardContent } from './dashboardContent/DashboardContent';
import './styles.scss';

Chart.register(...registerables);

const appSelector = createSelector(
	(state) => state.main.authentication.data,
	(userCredentials) => ({ userCredentials }),
);

export const Dashboard = () => {
	const { t } = useTranslation();
	const canAccessDashboard = usePermission('dashboard.access');
	const landingPageRoute = useLandingPageRoute();

	const { userCredentials } = useAppSelector(appSelector);

	const breadcrumbMap = {
		[t('nav.dashboard')]: '',
	};

	if (!canAccessDashboard) {
		return <Navigate to={landingPageRoute} replace />;
	}

	return (
		<div data-cy="dashboard" className="dashboard">
			<AppHeader
				userCredentials={userCredentials}
				breadcrumbMap={breadcrumbMap}
			/>
			<div className="dashboard__background">
				<DashboardContent />
			</div>
			<Footer />
		</div>
	);
};

export default Dashboard;
