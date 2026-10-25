import type { PasswordPolicyDTO } from '../../generated/models';

// mirrors the server-side strong-password policy so the mocked flow matches the real backend
export const passwordPolicyDTO: PasswordPolicyDTO = {
	strongPasswordEnabled: true,
	minLength: 6,
	regex:
		/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\\_$&+,:;=?@#|/'<>.^*()%!-])(?=\S+$).+$/
			.source,
};
