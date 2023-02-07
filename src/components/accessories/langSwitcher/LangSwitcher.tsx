import React, { FunctionComponent, useContext } from "react";
import i18n from "i18next";
import { LangContext } from "../../../libraries/langContext/langContext";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import availableLanguages from "../../../customization/available-languages.json";
import { isEmpty } from "lodash";

const fallbackLanguages = [
  "en",
  "it",
  "de",
  "fr",
  "es",
  "pt",
  "ar",
  "sw",
  "am",
  "cs",
  "sq",
  "zh",
];

const LangSwitcher: FunctionComponent = () => {
  const currentLang = i18n.language;
  const { changeLang } = useContext(LangContext);
  const { t } = useTranslation();

  const languages = isEmpty(availableLanguages.availableLanguages)
    ? fallbackLanguages
    : availableLanguages.availableLanguages;

  const renderOptions = (): JSX.Element[] => {
    return languages.map((code: string) => (
      <option key={code} value={code}>
        {t(`languages.${code}`)}
      </option>
    ));
  };

  const getCurrentLang = () => {
    var value = "";
    languages.forEach((key: string) => {
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
