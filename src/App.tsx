import React, { FunctionComponent, useState } from "react";
import "./App.css";
import { TProps, IStateProps, IState, IDispatchProps } from "./types";
import LoginActivity from "./components/activities/loginActivity/LoginActivity";
import { connect } from "react-redux";
import { setToken } from "./state/main/actions";
import Routes from "./Routes";

const App: FunctionComponent<TProps> = ({ userCredentials, setToken }) => {
  let { token } = userCredentials;
  const browserStored = window.localStorage.getItem("sessionId");
  if (!token && browserStored) {
    setToken(browserStored);
    return null;
  }
  return <div className="App">{token ? <Routes /> : <LoginActivity />}</div>;
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.userCredentials,
});

const mapDispatchToProps: IDispatchProps = {
  setToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
