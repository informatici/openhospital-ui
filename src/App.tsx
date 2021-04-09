import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import "./App.scss";
import Routes from "./Routes";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { LangContext } from "./libraries/langContext/langContext";
import { initReactI18next } from "react-i18next";
import resources from "./resources";
import { I18N_FALLBACK_LNG } from "./resources/config";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: I18N_FALLBACK_LNG,
    interpolation: {
      escapeValue: false,
    },
  });

const App: FunctionComponent = () => {
  const [, setLang] = useState(i18n.language);
  const changeLang = (l: string) => {
    i18n.changeLanguage(l).then(() => {
      setLang(l);
    });
  };

  return (
    <div className="App">
      <LangContext.Provider value={{ changeLang }}>
        <Routes />
      </LangContext.Provider>
    </div>
  );
};

export default connect()(App);
