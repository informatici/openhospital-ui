import * as React from 'react';
import AppBar from './modules/header/ApplicationBar';
import { BrowserRouter as Router } from "react-router-dom";
import { BASE_PATH, ENV_NAME } from "./config/constants";
import AppRoutes from "./routes";
import withRootTheme from './withRootTheme';

class App extends React.Component {
  public render() {
    return (
      // <AppBar />
      <Router basename={BASE_PATH}>
        <AppRoutes />
      </Router>
    );
  }
}

export default withRootTheme(App);