import { SettingDTO } from "generated";
import { ApiResponse } from "state/types";

export type ISettingsState = {
  getAll: ApiResponse<Array<SettingDTO>>;
  getByCode: ApiResponse<SettingDTO>;
  getById: ApiResponse<SettingDTO>;
  update: ApiResponse<SettingDTO>;
  resetAll: ApiResponse<Boolean>;
};
