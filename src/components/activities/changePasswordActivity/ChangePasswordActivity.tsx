import classNames from 'classnames';
import { useFormik } from 'formik';
import { get, has } from 'lodash';
import { type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { object, ref, string } from 'yup';
import { useAppDispatch } from '~/libraries/hooks/redux';
import logo from '../../../assets/logo-color.svg';
import { AUTH_KEY } from '../../../consts';
import { useLandingPageRoute } from '../../../libraries/hooks/useLandingPageRoute';
import { SessionStorage } from '../../../libraries/storage/storage';
import { changePassword, clearMustChangePassword } from '../../../state/main';
import Button from '../../accessories/button/Button';
import Footer from '../../accessories/footer/Footer';
import TextField from '../../accessories/textField/TextField';
import '../loginActivity/styles.scss';
import type { IValues } from './types';

// Mirrors the server-side password policy (GeneralData STRONGLENGTH default and
// UserBrowsingManager.isPasswordStrong); the backend remains the source of truth.
const MIN_PASSWORD_LENGTH = 6;
const STRONG_PASSWORD_REGEX =
	/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\\_$&+,:;=?@#|/'<>.^*()%!-])(?=\S+$).+$/;

export const ChangePasswordActivity: FC = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const landingPageRoute = useLandingPageRoute();

	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const initialValues: IValues = {
		newPassword: '',
		repeatPassword: '',
	};

	const validationSchema = object({
		newPassword: string()
			.required(t('login.insertthepassword'))
			.min(MIN_PASSWORD_LENGTH, t('changepassword.passwordtooshort'))
			.matches(STRONG_PASSWORD_REGEX, t('changepassword.passwordnotstrong')),
		repeatPassword: string()
			.required(t('login.insertthepassword'))
			.oneOf([ref('newPassword')], t('changepassword.passwordsdonotmatch')),
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values: IValues) => {
			setIsLoading(true);
			setErrorMessage('');
			try {
				await dispatch(
					changePassword({ password: values.newPassword }),
				).unwrap();
				// keep the session/redux flag in sync so the guard lets the user through
				const auth = SessionStorage.read(AUTH_KEY);
				SessionStorage.write(AUTH_KEY, { ...auth, mustChangePassword: false });
				dispatch(clearMustChangePassword());
				navigate(landingPageRoute, { replace: true });
			} catch (error) {
				// the rejected value is the raw API error response
				const message = (error as { message?: string })?.message;
				setErrorMessage(t(message ?? 'errors.somethingwrong'));
			} finally {
				setIsLoading(false);
			}
		},
	});

	const isValid = (fieldName: string): boolean => {
		return has(formik.touched, fieldName) && has(formik.errors, fieldName);
	};

	const getErrorText = (fieldName: string): string => {
		return has(formik.touched, fieldName) ? get(formik.errors, fieldName) : '';
	};

	// explain why the change is forced: a lease expiry (with the configured days) or an administrator reset.
	// read from the session so the reason survives a page refresh (redux rehydration drops the extra fields).
	const auth = SessionStorage.read(AUTH_KEY);
	const description =
		auth?.passwordExpired && auth?.passwordLeaseDays != null
			? t('changepassword.expired', { days: auth.passwordLeaseDays })
			: t('changepassword.adminreset');

	return (
		<div className="login">
			<div className="container login__background">
				<img
					src={logo}
					alt="Open Hospital"
					className="login__logo"
					width="150px"
				/>
				<div className="login__title">{t('changepassword.title')}</div>
				<div data-cy="change-password-panel" className="login__panel">
					<div className="login__panel__description">{description}</div>
					<form className="login__panel__form" onSubmit={formik.handleSubmit}>
						<div className="login__panel__textField">
							<TextField
								field={formik.getFieldProps('newPassword')}
								theme="regular"
								label={t('changepassword.newpassword')}
								type="password"
								isValid={isValid('newPassword')}
								errorText={getErrorText('newPassword')}
								onBlur={formik.handleBlur}
								inputProps={{
									autoComplete: 'new-password',
								}}
							/>
						</div>
						<div className="login__panel__textField">
							<TextField
								field={formik.getFieldProps('repeatPassword')}
								theme="regular"
								label={t('changepassword.repeatpassword')}
								type="password"
								isValid={isValid('repeatPassword')}
								errorText={getErrorText('repeatPassword')}
								onBlur={formik.handleBlur}
								inputProps={{
									autoComplete: 'new-password',
								}}
							/>
						</div>
						<div
							data-cy="change-password-error"
							className={classNames('login__invalidCredentials', {
								hidden: !errorMessage,
							})}
						>
							{errorMessage}
						</div>
						<div className="login__buttonContainer">
							<Button
								type="submit"
								variant="contained"
								color="primary"
								disabled={isLoading}
							>
								{t('changepassword.submit')}
							</Button>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ChangePasswordActivity;
