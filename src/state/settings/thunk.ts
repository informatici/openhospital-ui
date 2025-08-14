import { createAsyncThunk } from "@reduxjs/toolkit";
import { SettingsApi, UpdateSettingDTO } from "generated";
import { customConfiguration } from "libraries/apiUtils/configuration";

const api = new SettingsApi(customConfiguration());

export const getAllSettings = createAsyncThunk(
  "settings/getAll",
  async (_, thunkApi) =>
    api
      .getAllSettings()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getSettingByCode = createAsyncThunk(
  "settings/getByCode",
  async (code: string, thunkApi) =>
    api
      .getSettingByCode({ code })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getSettingById = createAsyncThunk(
  "settings/getById",
  async (id: number, thunkApi) =>
    api
      .getSettingById({ id })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateSetting = createAsyncThunk(
  "settings/update",
  async (dto: { code: string; setting: UpdateSettingDTO }, thunkApi) =>
    api
      .updateSetting({ code: dto.code, updateSettingDTO: dto.setting })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const resetAllSettings = createAsyncThunk(
  "settings/resetAll",
  async (_, thunkApi) =>
    api
      .resetAllSettings()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
