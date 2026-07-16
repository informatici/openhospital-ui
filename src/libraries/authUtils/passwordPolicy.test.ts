import { describe, expect, it } from 'vitest';
import type { PasswordPolicyDTO } from '../../generated';
import { passwordPolicySchema } from './passwordPolicy';

// mirrors the server-side strong-password policy (the source of truth is the backend)
const enforced: PasswordPolicyDTO = {
	strongPasswordEnabled: true,
	minLength: 6,
	regex:
		/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\\_$&+,:;=?@#|/'<>.^*()%!-])(?=\S+$).+$/
			.source,
};

describe('passwordPolicySchema', () => {
	const required = () =>
		passwordPolicySchema(enforced, 'too short', 'too weak').required(
			'required',
		);

	it('accepts a password meeting the policy', async () => {
		await expect(required().validate('Abcdef1@')).resolves.toBe('Abcdef1@');
	});

	it('rejects a password shorter than the minimum length', async () => {
		await expect(required().validate('Ab1@')).rejects.toThrow('too short');
	});

	it('rejects a password missing a required character class', async () => {
		await expect(required().validate('abcdefgh')).rejects.toThrow('too weak');
	});

	it('reports the required error for an empty required field', async () => {
		await expect(required().validate('')).rejects.toThrow('required');
	});

	it('skips the policy for an empty optional field (edit without password change)', async () => {
		const optional = passwordPolicySchema(
			enforced,
			'too short',
			'too weak',
		).notRequired();
		await expect(optional.validate('')).resolves.toBe('');
		await expect(optional.validate(undefined)).resolves.toBeUndefined();
	});

	it('skips the strength check when the policy is disabled', async () => {
		const disabled = passwordPolicySchema(
			{ strongPasswordEnabled: false, minLength: 0 },
			'too short',
			'too weak',
		).required('required');
		await expect(disabled.validate('abcdefgh')).resolves.toBe('abcdefgh');
	});

	it('falls back to a minimum length while the policy is still loading', async () => {
		const loading = passwordPolicySchema(
			undefined,
			'too short',
			'too weak',
		).required('required');
		await expect(loading.validate('Ab1@')).rejects.toThrow('too short');
		await expect(loading.validate('abcdef')).resolves.toBe('abcdef');
	});
});
