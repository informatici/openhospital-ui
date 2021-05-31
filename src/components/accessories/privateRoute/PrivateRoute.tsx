import React, { FunctionComponent } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../../libraries/authUtils/isAuthenticated";
import { useAuthentication } from "../../../libraries/authUtils/useAuthentication";

const PrivateRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {
  const location = useLocation();
  useAuthentication();

  return isAuthenticated() ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: location },
      }}
    />
  );
};

export default PrivateRoute;
