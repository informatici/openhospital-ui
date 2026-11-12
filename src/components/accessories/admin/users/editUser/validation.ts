import { boolean, object, ref, string } from 'yup';
import { passwordPolicySchema } from '~/libraries/authUtils/passwordPolicy';
import type { PasswordPolicyDTO, UserGroupDTO } from '../../../../../generated';

export const userSchema = (
	t: (key: string) => string,
	passwordPolicy?: PasswordPolicyDTO,
) =>
	object().shape({
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
		).notRequired(),
		deleted: boolean(),
		passwd2: string()
			.oneOf([ref('passwd')], t('user.validatePasswordMustMatch'))
			.notRequired()
			.when('passwd', ([passwd], schema) => {
				return passwd
					? schema.required(t('user.validatePasswordNeeded'))
					: schema;
			}),
		desc: string(),
	});
