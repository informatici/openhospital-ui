import { createAsyncThunk } from "@reduxjs/toolkit";
import { SettingsApi, UpdateSettingDTO } from "generated";
import { customConfiguration } from "libraries/apiUtils/configuration";
import { firstValueFrom } from "rxjs";

const api = new SettingsApi(customConfiguration());

export const getAllSettings = createAsyncThunk(
  "settings/getAll",
  async (_, thunkApi) =>
    firstValueFrom(api.getAllSettings()).catch((error) =>
      thunkApi.rejectWithValue(error.response)
    )
);

export const getSettingByCode = createAsyncThunk(
  "settings/getByCode",
  async (code: string, thunkApi) =>
    firstValueFrom(api.getSettingByCode({ code })).catch((error) =>
      thunkApi.rejectWithValue(error.response)
    )
);

export const getSettingById = createAsyncThunk(
  "settings/getById",
  async (id: number, thunkApi) =>
    firstValueFrom(api.getSettingById({ id })).catch((error) =>
      thunkApi.rejectWithValue(error.response)
    )
);

export const updateSetting = createAsyncThunk(
  "settings/update",
  async (dto: { code: string; setting: UpdateSettingDTO }, thunkApi) =>
    firstValueFrom(
      api.updateSetting({ code: dto.code, updateSettingDTO: dto.setting })
    ).catch((error) => thunkApi.rejectWithValue(error.response))
);

export const resetAllSettings = createAsyncThunk(
  "settings/resetAll",
  async (_, thunkApi) =>
    firstValueFrom(api.resetAllSettings()).catch((error) =>
      thunkApi.rejectWithValue(error.response)
    )
);
