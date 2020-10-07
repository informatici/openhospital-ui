import React, { FunctionComponent } from "react";
import "./App.scss";
import { TProps, IStateProps, IState, IDispatchProps } from "./types";
import LoginActivity from "./components/activities/loginActivity/LoginActivity";
import { connect } from "react-redux";
import { setToken } from "./state/main/actions";
import Routes from "./Routes";
import { LocalStorage } from "./libraries/storage/storage";
import { SESSION_ID_KEY } from "./consts";

const App: FunctionComponent<TProps> = ({ token, setToken }) => {
  const storedSessionId = LocalStorage.read(SESSION_ID_KEY);
  if (!token && storedSessionId) {
    setToken(storedSessionId);
    return null;
  }
  if (token && window.location.pathname === "/") {
    window.location.href = "/dashboard";
  }
  return (
    <div className="App">
      {token ? <Routes /> : <LoginActivity successRoute="/dashboard" />}
    </div>
  );
};

const mapStateToProps = (state: IState): IStateProps => ({
  token: state.main.token,
});

const mapDispatchToProps: IDispatchProps = {
  setToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
