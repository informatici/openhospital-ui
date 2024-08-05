import { useAppSelector } from "libraries/hooks/redux";
import { IState } from "../../types";

/**
 * @returns list of all user permissions
 */
export const usePermissions = () =>
  useAppSelector((state) => state.main.authentication?.data?.permissions || []);
