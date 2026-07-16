import type React from 'react';
import { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAppSelector } from '~/libraries/hooks/redux';
import { PATHS } from '../../../consts';
import { useLandingPageRoute } from '../../../libraries/hooks/useLandingPageRoute';
import type { IMainState } from '../../../state/main';
import type { IRedirectAfterLogin } from './types';

export const RedirectAfterLogin: React.FC<IRedirectAfterLogin> = ({
	children,
}) => {
	const location = useLocation();
	const landingPageRoute = useLandingPageRoute();
	const to = useMemo(
		() => location.state?.from || landingPageRoute,
		[landingPageRoute, location],
	);

	const state: IMainState = useAppSelector((state) => state.main);

	const status = useMemo(
		() =>
			['SUCCESS', 'FAIL'].includes(state.settings.status ?? '')
				? state.authentication.status
				: state.settings.status,
		[state.settings.status, state.authentication.status],
	);

	if (status === 'SUCCESS') {
		// OP-896: force the password change before reaching the landing page
		if (state.authentication.data?.mustChangePassword) {
			return <Navigate to={PATHS.change_password} replace />;
		}
		return <Navigate to={to} />;
	}

	return <>{children}</>;
};
