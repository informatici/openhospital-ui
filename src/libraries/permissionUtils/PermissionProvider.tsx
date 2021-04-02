import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoThunk } from "../../state/main/actions";
import { IState } from "../../types";

export const PermissionProvider: FunctionComponent = ({ children }) => {
  const dispatch = useDispatch();
  const authenticatedUser = useSelector<IState, string | undefined>(
    (state) => state.main.authentication?.data?.displayName
  );

  useEffect(() => {
    if (!authenticatedUser) {
      return;
    }
    // reload permissions when user authenticates
    getUserInfoThunk()(dispatch);
  }, [authenticatedUser, dispatch]);

  // TODO: display fallback when loading
  // TODO: handle errors

  return <>{children}</>;
};
