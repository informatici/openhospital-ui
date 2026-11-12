import { dashboardSettingDTO } from '../../src/mocks/fixtures/dashboardSettingDTO';
import { http, jsonResponse, lastPathSegment, notFound } from '../utils';

let currentDashboardSetting = { ...dashboardSettingDTO };

export const settings = [
	http.get('/usersettings', () =>
		jsonResponse([
			{ id: 2, configName: 'landing', configValue: '/', user: 'admin' },
		]),
	),
	http.get('/usersettings/{configName}', (req) => {
		if (lastPathSegment(req.url) === 'dashboard') {
			return jsonResponse(currentDashboardSetting);
		}
		return notFound({ message: 'No setting found' });
	}),
	http.post('/usersettings', (req) => {
		const setting = req.body;
		if (setting.configName === 'dashboard') {
			currentDashboardSetting = { ...setting, id: currentDashboardSetting.id };
			return jsonResponse(currentDashboardSetting);
		}
		return jsonResponse(setting);
	}),
	http.put('/usersettings/{id}', (req) => {
		const setting = req.body;
		if (setting.configName === 'dashboard') {
			currentDashboardSetting = { ...setting, id: currentDashboardSetting.id };
			return jsonResponse(currentDashboardSetting);
		}
		return jsonResponse(setting);
	}),
];
