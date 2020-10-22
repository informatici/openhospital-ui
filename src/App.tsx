import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import "./App.scss";
import Routes from "./Routes";

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <Routes />
    </div>
  );
};

export default connect()(App);
