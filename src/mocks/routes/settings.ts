import type { InterceptHandler, PollyServer } from '@pollyjs/core';
import type { UserSettingDTO } from '../../generated';
import {
	getMockDashboardSetting,
	saveMockDashboardSetting,
} from '../dashboardSettingStorage';

export const settingsRoutes = (server: PollyServer) => {
	server.namespace('/usersettings', () => {
		server.get('/').intercept((_req, res) => {
			res
				.status(200)
				.json([
					{ id: 2, configName: 'landing', configValue: '/', user: 'admin' },
				]);
		});
		server.get('/:configName').intercept((req, res) => {
			const setting =
				req.params.configName === 'dashboard'
					? getMockDashboardSetting()
					: undefined;
			res
				.status(setting ? 200 : 404)
				.json(setting ?? { message: 'No setting found' });
		});
		const save: InterceptHandler = (req, res) => {
			try {
				const setting = req.jsonBody() as UserSettingDTO;
				res
					.status(200)
					.json(
						setting.configName === 'dashboard'
							? saveMockDashboardSetting(setting)
							: setting,
					);
			} catch {
				res
					.status(500)
					.json({ message: 'Unable to save demo settings in this browser' });
			}
		};
		server.post('/').intercept(save);
		server.put('/:id').intercept(save);
	});
};
