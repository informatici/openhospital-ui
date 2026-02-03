import { createSelector } from "@reduxjs/toolkit";
import { useAppSelector } from "libraries/hooks/redux";
import { UserSettingDTO } from "../../generated";

const userSettingsSelector = createSelector(
  (state) => state.main.settings?.data,
  (settings) => settings || []
);

/**
 * @returns list of all user settings
 */
export const useUserSettings = () =>
  useAppSelector<any, UserSettingDTO[]>(userSettingsSelector);
