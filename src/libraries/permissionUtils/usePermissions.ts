import { useAppSelector } from "libraries/hooks/redux";

/**
 * @returns list of all user permissions
 */
export const usePermissions = () =>
  useAppSelector((state) => state.main.authentication?.data?.permissions || []);
