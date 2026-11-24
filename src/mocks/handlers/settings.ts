import type { UserSettingDTO } from '~/generated';
import {
	getMockDashboardSetting,
	saveMockDashboardSetting,
} from '../dashboardSettingStorage';
import { http } from '../utils';

const saveSetting = (setting: UserSettingDTO) =>
	setting.configName === 'dashboard'
		? saveMockDashboardSetting(setting)
		: setting;

export const settings = [
	http.get('/usersettings', async ({ response }) => {
		return response(200).json([
			{ id: 1, configName: 'landing', configValue: '/', user: 'john' },
		]);
	}),
	http.get('/usersettings/{configName}', async ({ response, params }) => {
		const setting =
			params.configName === 'dashboard'
				? getMockDashboardSetting()
				: {
						id: 1,
						configName: 'layout',
						configValue: 'DxD',
						user: 'john',
					};
		return response(200).json(setting as UserSettingDTO);
	}),
	http.post('/usersettings', async ({ request, response }) => {
		const setting = await request.json();
		return response(201).json(saveSetting(setting));
	}),
	http.put('/usersettings/{id}', async ({ request, response }) => {
		const setting = await request.json();
		return response(200).json(saveSetting(setting));
	}),
];
