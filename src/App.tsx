import React, { FunctionComponent, useState } from "react";
import "./App.scss";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { LangContext } from "./libraries/langContext/langContext";
import { initReactI18next } from "react-i18next";
import resources from "./resources";
import { I18N_FALLBACK_LNG } from "./resources/config";
import { createTheme, ThemeProvider } from "@mui/material";
import { MainRouter } from "./routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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

  const pickerTheme = createTheme({
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={pickerTheme}>
          <LangContext.Provider value={{ changeLang }}>
            <MainRouter />
          </LangContext.Provider>
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
};

export default App;
