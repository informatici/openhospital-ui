import React, { FunctionComponent, useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { AUTH_KEY } from "../../../consts";
import { SessionStorage } from "../../../libraries/storage/storage";
import { setAuthenticationSuccess } from "../../../state/main/actions";
import { isAuthenticated } from "../../../libraries/authUtils/isAuthenticated";
import { connect } from "react-redux";
import { IState } from "../../../types";
import { IStateProps, TProps, IDispatchProps } from "./types";

const PrivateRoute: FunctionComponent<TProps> = ({
  children,
  userCredentials,
  setAuthenticationSuccess,
  ...rest
}) => {
  const location = useLocation();

  useEffect(() => {
    if (!userCredentials) {
      const userCredentialsLocal = SessionStorage.read(AUTH_KEY);
      if (userCredentialsLocal) {
        setAuthenticationSuccess(userCredentialsLocal);
      }
    }
  }, [userCredentials, setAuthenticationSuccess]);

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

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.authentication.data,
});

const mapDispatchToProps: IDispatchProps = {
  setAuthenticationSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
