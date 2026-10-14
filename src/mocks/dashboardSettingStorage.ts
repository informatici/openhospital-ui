import type { UserSettingDTO } from '../generated';
import { dashboardSettingDTO } from './fixtures/dashboardSettingDTO';

export const DASHBOARD_SETTING_STORAGE_KEY = 'oh-mock-dashboard-setting-v1';

export function getMockDashboardSetting(): UserSettingDTO {
	try {
		const stored = localStorage.getItem(DASHBOARD_SETTING_STORAGE_KEY);
		if (stored) {
			const setting: UserSettingDTO = JSON.parse(stored);
			if (
				setting?.configName === 'dashboard' &&
				Number.isInteger(setting.id) &&
				setting.id > 0 &&
				typeof setting.configValue === 'string' &&
				typeof setting.user === 'string'
			) {
				return setting;
			}
		}
	} catch {
		// A damaged or unavailable browser store falls back to the fixture.
	}
	return { ...dashboardSettingDTO };
}

export function saveMockDashboardSetting(
	setting: UserSettingDTO,
): UserSettingDTO {
	const saved = { ...setting, id: getMockDashboardSetting().id };
	localStorage.setItem(DASHBOARD_SETTING_STORAGE_KEY, JSON.stringify(saved));
	return saved;
}
