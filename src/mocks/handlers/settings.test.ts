import { setupServer } from 'msw/node';
import {
	afterAll,
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest';
import { DASHBOARD_SETTING_STORAGE_KEY } from '../dashboardSettingStorage';
import { dashboardSettingDTO } from '../fixtures/dashboardSettingDTO';
import { settings } from './settings';

const server = setupServer(...settings);
const baseUrl = 'http://localhost:8080/usersettings';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('mock user settings handlers', () => {
	beforeEach(() => {
		const data = new Map<string, string>();
		vi.stubGlobal('localStorage', {
			getItem: (key: string) => data.get(key) ?? null,
			setItem: (key: string, value: string) => data.set(key, value),
		});
	});
	afterEach(() => vi.unstubAllGlobals());

	it('loads the initial dashboard and persists an updated layout', async () => {
		const initial = await fetch(`${baseUrl}/dashboard`);
		expect(initial.status).toBe(200);
		expect(await initial.json()).toEqual(dashboardSettingDTO);

		const updated = { ...dashboardSettingDTO, configValue: 'updated layout' };
		const saved = await fetch(`${baseUrl}/${updated.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updated),
		});
		expect(saved.status).toBe(200);
		expect(await saved.json()).toEqual(updated);
		expect(await (await fetch(`${baseUrl}/dashboard`)).json()).toEqual(updated);
		expect(localStorage.getItem(DASHBOARD_SETTING_STORAGE_KEY)).toBe(
			JSON.stringify(updated),
		);
	});

	it('creates the dashboard setting and recovers from invalid storage', async () => {
		const created = await fetch(baseUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				configName: 'dashboard',
				configValue: 'new layout',
				user: 'admin',
			}),
		});
		expect(created.status).toBe(201);
		expect(await created.json()).toEqual({
			...dashboardSettingDTO,
			configValue: 'new layout',
		});

		localStorage.setItem(DASHBOARD_SETTING_STORAGE_KEY, '{broken');
		expect(await (await fetch(`${baseUrl}/dashboard`)).json()).toEqual(
			dashboardSettingDTO,
		);
	});
});
