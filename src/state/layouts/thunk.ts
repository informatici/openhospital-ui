import { createAsyncThunk } from "@reduxjs/toolkit";
import { decodeLayoutConfig } from "../../components/accessories/dashboard/layouts/consts";
import { UserSettingDTO, UserSettingsApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new UserSettingsApi(customConfiguration());

export const getLayouts = createAsyncThunk(
  "layouts/getLayouts",
  async (userName: string, thunkApi) =>
    api
      .getUserSettingByUser({ configName: "dashboard" })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const saveLayouts = createAsyncThunk(
  "layouts/saveLayouts",
  async (setting: UserSettingDTO, thunkApi) =>
    (setting.id > 0
      ? api.updateUserSettings({
          id: setting.id,
          userSettingDTO: setting,
        })
      : api.newUserSettings({
          userSettingDTO: setting,
        })
    )
      .toPromise()
      .then((data) => ({ ...decodeLayoutConfig(setting.configValue), data }))
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
