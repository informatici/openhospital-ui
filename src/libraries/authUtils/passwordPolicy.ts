import { string } from 'yup';
import type { PasswordPolicyDTO } from '../../generated';

// fallback minimum length used only while the policy is still loading; never presented as "the rule"
const DEFAULT_MIN_PASSWORD_LENGTH = 6;

/**
 * Builds a yup password validator from the server-side policy, so the client validates consistently with the
 * backend instead of hardcoding its own rules. Both checks tolerate an empty value, so the caller decides
 * required/optional via .required()/.notRequired(): a required field surfaces its own "required" message, an
 * optional one (e.g. edit user, leaving the password unchanged) skips the policy when left blank. The minimum
 * length is always applied (0 = none) and the strength regex only when the policy is enabled, mirroring the
 * core isPasswordValid.
 */
export const passwordPolicySchema = (
	policy: PasswordPolicyDTO | undefined,
	tooShortMessage: string,
	tooWeakMessage: string,
) => {
	const minLength =
		policy && policy.minLength != null
			? policy.minLength
			: DEFAULT_MIN_PASSWORD_LENGTH;
	return string()
		.test(
			'password-min-length',
			tooShortMessage,
			(value) => !value || value.length >= minLength,
		)
		.test(
			'password-strength',
			tooWeakMessage,
			(value) =>
				!policy?.strongPasswordEnabled ||
				!policy.regex ||
				!value ||
				new RegExp(policy.regex).test(value),
		);
};
