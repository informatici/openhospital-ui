import type { UserSettingDTO } from '~/generated';
import { http } from '../utils';

export const settings = [
	http.get('/usersettings', async ({ response }) => {
		return response(200).json([
			{ id: 1, configName: 'landing', configValue: '/', user: 'john' },
		]);
	}),
	http.get('/usersettings/{configName}', async ({ response, params }) => {
		const setting =
			params.configName === 'dashboard'
				? {}
				: {
						id: 1,
						configName: 'layout',
						configValue: 'DxD',
						user: 'john',
					};
		return response(200).json(setting as UserSettingDTO);
	}),
];
