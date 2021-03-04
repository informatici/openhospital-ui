import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import "./App.scss";
import Routes from "./Routes";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./resources";
import { I18N_DEFAULT_LNG, I18N_FALLBACK_LNG } from "./resources/config";

i18n.use(initReactI18next).init({
  resources,
  lng: I18N_DEFAULT_LNG,
  fallbackLng: I18N_FALLBACK_LNG,
  interpolation: {
    escapeValue: false,
  },
});

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <Routes />
    </div>
  );
};

export default connect()(App);
