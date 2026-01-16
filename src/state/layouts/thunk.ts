import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import createDebouncedAsyncThunk from '~/libraries/reduxUtils/createDebounceAsyncThunk';
import { decodeLayoutConfig } from '../../components/accessories/dashboard/layouts/consts';
import { type UserSettingDTO, UserSettingsApi } from '../../generated';
import { customConfiguration } from '../../libraries/apiUtils/configuration';

const api = new UserSettingsApi(customConfiguration());

export const getLayouts = createAsyncThunk(
	'layouts/getLayouts',
	async (_userName: string, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.getUserSettingByUser({ configName: 'dashboard' })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const saveLayouts = createDebouncedAsyncThunk(
	'layouts/saveLayouts',
	async (setting: UserSettingDTO, thunkApi) =>
		firstValueFrom(
			wrapper(() =>
				setting.id > 0
					? api.updateUserSettings({
							id: setting.id,
							userSettingDTO: setting,
						})
					: api.newUserSettings({
							userSettingDTO: setting,
						}),
			),
		)
			.then((data) => ({ ...decodeLayoutConfig(setting.configValue), data }))
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);
