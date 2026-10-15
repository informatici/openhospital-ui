import { boolean, object, ref, string } from 'yup';
import { FIELD_LENGTHS } from '~/consts';
import type { UserGroupDTO } from '../../../../../generated';
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
export const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const userNameRules = /^[a-z0-9-._]+$/;

export const userSchema = (t: (key: string) => string) =>
	object().shape({
		userName: string()
			.min(2)
			.max(FIELD_LENGTHS.UserDTO.userName)
			.matches(userNameRules, t('user.validateUserNameRegex'))
			.required(t('user.validateUserName')),
		userGroupName: object<UserGroupDTO>({
			code: string().required(t('user.validateUserNeedsGroup')),
			desc: string(),
		})
			.nullable()
			.required(t('user.validateUserNeedsGroup')),
		passwd: string()
			.required(t('user.validatePasswordNeeded'))
			.min(5, t('user.validatePasswordTooShort'))
			.matches(passwordRules, {
				message: t('user.validatePasswordTooWeak'),
			}),
		passwd2: string()
			.required(t('user.validatePasswordNeeded'))
			.oneOf([ref('passwd')], t('user.validatePasswordMustMatch')),
		desc: string(),
		deleted: boolean(),
	});
