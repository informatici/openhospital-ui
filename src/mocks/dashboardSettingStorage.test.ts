import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
	DASHBOARD_SETTING_STORAGE_KEY,
	getMockDashboardSetting,
	saveMockDashboardSetting,
} from './dashboardSettingStorage';
import { dashboardSettingDTO } from './fixtures/dashboardSettingDTO';

describe('mock dashboard setting', () => {
	beforeEach(() => {
		const data = new Map<string, string>();
		vi.stubGlobal('localStorage', {
			getItem: (key: string) => data.get(key) ?? null,
			setItem: (key: string, value: string) => data.set(key, value),
			removeItem: (key: string) => data.delete(key),
		});
	});
	afterEach(() => vi.unstubAllGlobals());

	it('persists only the dashboard setting across module reloads', async () => {
		const saved = saveMockDashboardSetting({
			...dashboardSettingDTO,
			configValue: 'new layout',
		});
		vi.resetModules();
		const reloaded = await import('./dashboardSettingStorage');
		expect(reloaded.getMockDashboardSetting()).toEqual(saved);
		expect(dashboardSettingDTO.configValue).not.toBe('new layout');
		expect(localStorage.getItem(DASHBOARD_SETTING_STORAGE_KEY)).toBeTruthy();
	});

	it('recovers a damaged setting from the fixture', () => {
		localStorage.setItem(DASHBOARD_SETTING_STORAGE_KEY, '{broken');
		expect(getMockDashboardSetting()).toEqual(dashboardSettingDTO);
		localStorage.setItem(
			DASHBOARD_SETTING_STORAGE_KEY,
			JSON.stringify({ configName: 'other' }),
		);
		expect(getMockDashboardSetting()).toEqual(dashboardSettingDTO);
	});
});
