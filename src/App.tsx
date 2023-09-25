import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import "./App.scss";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { LangContext } from "./libraries/langContext/langContext";
import { initReactI18next } from "react-i18next";
import resources from "./resources";
import { I18N_FALLBACK_LNG } from "./resources/config";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { MainRouter } from "./routes";
import { LocalizationProvider } from "@material-ui/pickers";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: I18N_FALLBACK_LNG,
    supportedLngs: ["en", "fr", "it", "sq", "de"],
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

  const pickerTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#fc1812",
        contrastText: "#fff",
      },
      secondary: {
        light: "#444444",
        main: "#444444",
        contrastText: "#fff",
      },
    },
  });

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={DateFnsUtils}>
        <MuiThemeProvider theme={pickerTheme}>
          <LangContext.Provider value={{ changeLang }}>
            <MainRouter />
          </LangContext.Provider>
        </MuiThemeProvider>
      </LocalizationProvider>
    </div>
  );
};

export default connect()(App);
