import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/login/Login";
import { BASE_PATH } from "./config/constants";
import AppRoutes from "./routes";
import withRootTheme from "./withRootTheme";
import "./App.scss";

export const ROOT_PATH = process.env.NODE_ENV === "production" ? "/oh20" : "";
export const LOGIN_PATH = `${ROOT_PATH}/login`;

class App extends React.Component {
  public render() {
    const login = window.localStorage.getItem("user") === "true";

    if (!login && window.location.pathname != LOGIN_PATH) {
      window.location.pathname = LOGIN_PATH;
    }

    return <Router basename={BASE_PATH}>{login ? <AppRoutes /> : <Login successRoute="/dashboard" />}</Router>;
  }
}

export default withRootTheme(App);
