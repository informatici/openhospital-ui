import { boolean, object, string } from 'yup';

export const userGroupSchema = (t: (key: string) => string) =>
	object().shape({
		code: string().min(2).required(t('user.validateGroupCode')),
		desc: string(),
		deleted: boolean(),
	});
