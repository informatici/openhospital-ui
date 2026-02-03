import { createSelector } from "@reduxjs/toolkit";
import { useAppSelector } from "libraries/hooks/redux";

const userPermissionSelector = createSelector(
  (state) => state.main.authentication?.data?.permissions,
  (permissions) => permissions || []
);

/**
 * @returns list of all user permissions
 */
export const usePermissions = () => useAppSelector(userPermissionSelector);
