import React, { FunctionComponent, useContext } from "react";
import { useLanguages } from '@transifex/react';
import { LangContext } from "../../../libraries/langContext/langContext";
import "./styles.scss";
import { tx } from "@transifex/native";

const LangSwitcher: FunctionComponent = () => {
  const languages = useLanguages();
  const { changeLang } = useContext(LangContext);

  const currentLang = tx.getCurrentLocale();

  const renderOptions = (): JSX.Element[] => {
    return languages.map(({ code, name }: Record<string, string>) => (
      <option key={code} value={code} selected={(code == currentLang) ? true : false}>{name}</option>
    ))
  }
  
  return (
    <div className="langSwitcher">
      <select onChange={(e) => changeLang(e.target.value as string)}>
        { renderOptions() }
      </select>
    </div>
  );
};

export default LangSwitcher;
