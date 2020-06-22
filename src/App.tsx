import React, { FunctionComponent } from "react";
import "./App.scss";
import { TProps, IStateProps, IState, IDispatchProps } from "./types";
import LoginActivity from "./components/activities/loginActivity/LoginActivity";
import { connect } from "react-redux";
import { setToken } from "./state/main/actions";
import Routes from "./Routes";
import { LocalStorage } from "./libraries/storage/storage";

const App: FunctionComponent<TProps> = ({ userCredentials, setToken }) => {
  const browserStoredId = LocalStorage.read("sessionId");
  if (!userCredentials && browserStoredId) {
    setToken(browserStoredId);
    return null;
  }
  return (
    <div className="App">
      {userCredentials ? (
        <Routes />
      ) : (
        <LoginActivity successRoute="/dashboard" />
      )}
    </div>
  );
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.authentication.data?.credentials,
});

const mapDispatchToProps: IDispatchProps = {
  setToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
