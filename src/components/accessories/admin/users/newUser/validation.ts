import { boolean, object, ref, string } from 'yup';
import { passwordPolicySchema } from '~/libraries/authUtils/passwordPolicy';
import type { PasswordPolicyDTO, UserGroupDTO } from '../../../../../generated';

export const userNameRules = /^[a-z0-9-._]+$/;

export const userSchema = (
	t: (key: string) => string,
	passwordPolicy?: PasswordPolicyDTO,
) =>
	object().shape({
		userName: string()
			.min(2)
			.max(50)
			.matches(userNameRules, t('user.validateUserNameRegex'))
			.required(t('user.validateUserName')),
		userGroupName: object<UserGroupDTO>({
			code: string().required(t('user.validateUserNeedsGroup')),
			desc: string(),
		})
			.nullable()
			.required(t('user.validateUserNeedsGroup')),
		passwd: passwordPolicySchema(
			passwordPolicy,
			t('user.validatePasswordTooShort'),
			t('user.validatePasswordTooWeak'),
		).required(t('user.validatePasswordNeeded')),
		passwd2: string()
			.required(t('user.validatePasswordNeeded'))
			.oneOf([ref('passwd')], t('user.validatePasswordMustMatch')),
		desc: string(),
		deleted: boolean(),
	});
