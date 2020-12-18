import React, { FunctionComponent, useContext } from "react";
import { useLanguages } from '@transifex/react';
import { LangContext } from "../../../libraries/langContext/langContext";

const LangSwitcher: FunctionComponent = () => {
  const languages = useLanguages();
  const { changeLang } = useContext(LangContext);

  const renderOptions = ():JSX.Element[] => {
    return languages.map(({ code, name }: Record<string, string>) => (
      <option key={code} value={code}>{name}</option>
    ))
  }
  
  return (
    <div>
      <select onChange={(e) => changeLang(e.target.value as string)}>
        { renderOptions() }
      </select>
    </div>
  );
};

export default LangSwitcher;
