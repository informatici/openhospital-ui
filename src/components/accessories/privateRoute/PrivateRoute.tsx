import React, { FunctionComponent } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../../libraries/authUtils/isAuthenticated";

const PrivateRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {
  const location = useLocation();
  return (
    <Route {...rest}>
      {isAuthenticated() ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location },
          }}
        />
      )}
    </Route>
  );
};

export default PrivateRoute;
