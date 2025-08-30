import { createSelector } from "@reduxjs/toolkit";
import { SettingDTO } from "generated/models";
import { useMemo } from "react";
import { IState } from "types";
import { useAppSelector } from "./redux";

const settingsSelector = createSelector(
  (state: IState) => state.settings.getAll.data,
  (settings) => settings || []
);

const settingByCodeSelector = createSelector(
  (state: IState) => state.settings.getByCode.data,
  (setting) => setting ?? null
);

export const useSettings = () =>
  useAppSelector<any, SettingDTO[]>(settingsSelector);

export const useSettingByCode = (code: string) =>
  useAppSelector<any, SettingDTO | null>(settingByCodeSelector);

export const useEncountersEnabled = () => {
  const settings = useSettings();

  const enabled = useMemo(
    () =>
      settings.some(
        (setting) =>
          setting.code === "ENCOUNTERS_ENABLED" &&
          setting.value?.toLowerCase() === "false"
      ),
    [settings]
  );

  return enabled;
};
