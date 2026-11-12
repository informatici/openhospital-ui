import { describe, expect, it } from 'vitest';
import type { PasswordPolicyDTO } from '../../../../../generated';
import { userSchema } from './validation';

const t = (key: string) => key;

const policy: PasswordPolicyDTO = {
	strongPasswordEnabled: true,
	minLength: 6,
	regex:
		/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\\_$&+,:;=?@#|/'<>.^*()%!-])(?=\S+$).+$/
			.source,
};

const base = { userGroupName: { code: 'admin' } };

describe('editUser userSchema', () => {
	it('allows saving without changing the password (both blank)', async () => {
		await expect(
			userSchema(t, policy).validate({ ...base, passwd: '', passwd2: '' }),
		).resolves.toBeTruthy();
	});

	it('requires the retype once a new password is entered', async () => {
		await expect(
			userSchema(t, policy).validate({
				...base,
				passwd: 'Abcdef1@',
				passwd2: '',
			}),
		).rejects.toThrow();
	});

	it('rejects a new password that violates the policy', async () => {
		await expect(
			userSchema(t, policy).validate({
				...base,
				passwd: 'abcdefgh',
				passwd2: 'abcdefgh',
			}),
		).rejects.toThrow();
	});

	it('accepts a matching, policy-compliant new password', async () => {
		await expect(
			userSchema(t, policy).validate({
				...base,
				passwd: 'Abcdef1@',
				passwd2: 'Abcdef1@',
			}),
		).resolves.toBeTruthy();
	});
});
