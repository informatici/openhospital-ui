import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import "./App.scss";
import Routes from "./Routes";
import { tx } from '@transifex/native';
import { useLanguages } from "@transifex/react";
import _ from "lodash";

// Transifex init with the default language
tx.init({ token: process.env.REACT_APP_TRANSIFEX_TOKEN, sourceLocale: 'en' });

const App: FunctionComponent = () => {

  // transifex avaiable lanuages
  const languages = useLanguages();
  
  // LANGUAGE BROWSER NEGOTIATION:
  // The code updates the App' language based on the 
  // first browser language who matchs the Transifex avaiable langugages 
  useEffect(() => {
    var userLangs = navigator.languages
    userLangs.forEach((lang) => {
      if(_.find(languages, {code: lang})) {
        tx.setCurrentLocale(lang);
        return;
      }
    })
  }, [languages])
  
  return (
    <div className="App">
      <Routes />
    </div>
  );
};

export default connect()(App);
