import { useAppSelector } from "libraries/hooks/redux";

/**
 * @returns list of all user settings
 */
export const useUserSettings = () =>
  useAppSelector((state) => state.main.settings?.data || []);
