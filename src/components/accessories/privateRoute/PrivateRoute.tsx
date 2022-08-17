import React, { FunctionComponent } from "react";
import { Navigate, Route, RouteProps, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../../libraries/authUtils/isAuthenticated";
import { useAuthentication } from "../../../libraries/authUtils/useAuthentication";

const PrivateRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {
  const location = useLocation();
  useAuthentication();
  console.log(location.pathname);

  return isAuthenticated() ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Navigate to={location} replace />
  );
};

export default PrivateRoute;
