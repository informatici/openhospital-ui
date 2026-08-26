import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AUTH_KEY, PATHS } from '../consts';
import { isAuthenticated } from '../libraries/authUtils/isAuthenticated';
import { useAuthentication } from '../libraries/authUtils/useAuthentication';
import { SessionStorage } from '../libraries/storage/storage';

export const Private = () => {
	useAuthentication();
	const location = useLocation();

	if (!isAuthenticated()) {
		return <Navigate to={PATHS.login} replace />;
	}

	// OP-896: until the password has been changed, confine the user to the change-password page
	const mustChangePassword =
		SessionStorage.read(AUTH_KEY)?.mustChangePassword === true;
	if (mustChangePassword && location.pathname !== PATHS.change_password) {
		return <Navigate to={PATHS.change_password} replace />;
	}

	return <Outlet />;
};
