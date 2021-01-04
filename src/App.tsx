import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import "./App.scss";
import Routes from "./Routes";
import { tx } from '@transifex/native';

// Transifex init with the default language
tx.init({ token: process.env.REACT_APP_TRANSIFEX_TOKEN, sourceLocale: 'en' });

const App: FunctionComponent = () => {  
  return (
    <div className="App">
      <Routes />
    </div>
  );
};

export default connect()(App);
