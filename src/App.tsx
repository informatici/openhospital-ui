import React, { FunctionComponent } from "react";
import "./App.scss";
import LoginActivity from "./components/activities/loginActivity/LoginActivity";
import { AUTH_TOKEN_KEY } from "./consts";
import { SessionStorage } from "./libraries/storage/storage";
import Routes from "./Routes";

const App: FunctionComponent = () => {
  const isAuthenticated = SessionStorage.read(AUTH_TOKEN_KEY);
  if (isAuthenticated && window.location.pathname === "/") {
    window.location.href = "/dashboard";
  }
  return (
    <div className="App">
      {isAuthenticated ? (
        <Routes />
      ) : (
        <LoginActivity successRoute="/dashboard" />
      )}
    </div>
  );
};

export default App;
