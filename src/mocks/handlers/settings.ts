import { http } from '../utils';

export const settings = [
	http.get('/usersettings', async ({ response }) => {
		return response(200).json([
			{ id: 1, configName: 'landing', configValue: '/' },
		]);
	}),
	http.get('/usersettings/dashboard', async ({ response }) => {
		return response(200).json({});
	}),
];
