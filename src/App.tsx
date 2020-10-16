import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import "./App.scss";
import LoginActivity from "./components/activities/loginActivity/LoginActivity";
import { AUTH_KEY } from "./consts";
import { LoginResponse } from "./generated";
import { SessionStorage } from "./libraries/storage/storage";
import Routes from "./Routes";
import { setUserCredentials } from "./state/main/actions";
import { IDispatchProps, IState, IStateProps, TProps } from "./types";

const App: FunctionComponent<TProps> = ({
  appStoredToken,
  setUserCredentials,
}) => {
  const auth = SessionStorage.read(AUTH_KEY) as LoginResponse;
  if (!appStoredToken && auth) {
    setUserCredentials(auth);
    return null;
  }
  if (appStoredToken && window.location.pathname === process.env.PUBLIC_URL) {
    window.location.href = process.env.PUBLIC_URL + "/dashboard";
  }
  return (
    <div className="App">
      {appStoredToken ? (
        <Routes />
      ) : (
        <LoginActivity successRoute="/dashboard" />
      )}
    </div>
  );
};

const mapStateToProps = (state: IState): IStateProps => ({
  appStoredToken: state.main.authentication.data?.token,
});

const mapDispatchToProps: IDispatchProps = {
  setUserCredentials,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
