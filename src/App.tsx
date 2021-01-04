import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import "./App.scss";
import Routes from "./Routes";
import { tx } from '@transifex/native';
import { LangContext } from "./libraries/langContext/langContext";
import { useLanguages } from "@transifex/react";
import _ from "lodash";

// Transifex init with the default language
tx.init({ token: process.env.REACT_APP_TRANSIFEX_TOKEN, sourceLocale: 'en' });

const App: FunctionComponent = () => {

  // LANGUAGE SWITCHER
  // When the changeLang is invokated from the language switcher component
  // the tx lang will be updated and the App will be rerendered
  const [, setLang] = useState("en");
  const changeLang = (l: string) => {
    tx.setCurrentLocale(l).then(() => {
      setLang(l);
    });
  };

  // transifex avaiable lanuages
  const languages = useLanguages();
  
  // LANGUAGE BROWSER NEGOTIATION:
  // The code updates the App' language based on the 
  // first browser language who matchs the Transifex avaiable langugages 
  useEffect(() => {
    var userLangs = navigator.languages
    userLangs.forEach((lang) => {
      if(_.find(languages, {code: lang})) {
        changeLang(lang);
        return;
      }
    })
  }, [languages])
  
  return (
    <div className="App">
      <LangContext.Provider value={{ changeLang }}>
        <Routes />
      </LangContext.Provider>
    </div>
  );
};

export default connect()(App);
