import type { TFunction } from 'react-i18next';
import { object, string } from 'yup';
import type { UserGroupDTO } from '../../../../../generated';

export const userGroupSchema = (t: TFunction<'translation'>) =>
	object().shape<UserGroupDTO>({
		code: string().min(2).required(t('user.validateGroupCode')),
		desc: string(),
	});
