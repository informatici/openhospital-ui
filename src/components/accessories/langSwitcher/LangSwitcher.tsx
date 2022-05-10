import React, { FunctionComponent, useContext } from "react";
import i18n from "i18next";
import { LangContext } from "../../../libraries/langContext/langContext";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import languages from "../../../customization/available-languages.json";

const LangSwitcher: FunctionComponent = () => {
  const currentLang = i18n.language;
  const { changeLang } = useContext(LangContext);
  const { t } = useTranslation();

  const renderOptions = (): JSX.Element[] => {
    return languages.availableLanguages.map((code: string) => (
      <option key={code} value={code}>
        {t(`languages.${code}`)}
      </option>
    ));
  };

  const getCurrentLang = () => {
    var value = "";
    languages.availableLanguages.forEach((key: string) => {
      if (currentLang === key || currentLang.split("-")[0] === key) {
        value = key;
      }
    });
    return value;
  };

  return (
    <div className="langSwitcher">
      <select
        value={getCurrentLang()}
        onChange={(e) => changeLang(e.target.value as string)}
      >
        {renderOptions()}
      </select>
    </div>
  );
};

export default LangSwitcher;
