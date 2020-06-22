import React, { FunctionComponent } from "react";
import "./App.scss";
import { TProps, IStateProps, IState, IDispatchProps } from "./types";
import LoginActivity from "./components/activities/loginActivity/LoginActivity";
import { connect } from "react-redux";
import { setToken } from "./state/main/actions";
import Routes from "./Routes";
import { LocalStorage } from "./libraries/storage/storage";

const App: FunctionComponent<TProps> = ({ token, setToken }) => {
  const browserStoredID = LocalStorage.read("sessionID");
  if (!token && browserStoredID) {
    setToken(browserStoredID);
    return null;
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
