import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PATHS } from "../consts";
import { isAuthenticated } from "../libraries/authUtils/isAuthenticated";
import { useAuthentication } from "../libraries/authUtils/useAuthentication";

export const Private = () => {
  useAuthentication();
  const { pathname } = useLocation();

  return isAuthenticated() ? <Outlet /> : <Navigate to={PATHS.login} replace />;
};
