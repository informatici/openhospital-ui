import { useSelector } from "react-redux";
import { IState } from "../../types";

/**
 * @returns list of all user permissions
 */
export const usePermissions = () =>
  useSelector<IState, string[]>(
    (state) => state.main.authentication?.data?.permission || []
  );
