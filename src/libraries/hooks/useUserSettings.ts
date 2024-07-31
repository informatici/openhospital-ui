import { useSelector } from "libraries/hooks/redux";
import { UserSettingDTO } from "../../generated";
import { IState } from "../../types";

/**
 * @returns list of all user settings
 */
export const useUserSettings = () =>
  useSelector<IState, UserSettingDTO[]>(
    (state) => state.main.settings?.data || []
  );
