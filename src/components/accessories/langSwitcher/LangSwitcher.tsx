import React, { FunctionComponent, useContext } from "react";
import i18n from "i18next";
import { LangContext } from "../../../libraries/langContext/langContext";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import availableLanguages from "../../../customization/available-languages.json";
import { isEmpty } from "lodash";

const fallbackLanguages: Record<string, string> = {
  en: "English",
  it: "Italiano",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  pt: "Português",
  ar: "عرب",
  sw: "Svenska",
  am: "አማርኛ",
  cs: "čeština",
  sq: "Shqiptar",
  zh: "中国人",
};

const LangSwitcher: FunctionComponent = () => {
  const currentLang = i18n.language;
  const { changeLang } = useContext(LangContext);

  const languages = isEmpty(availableLanguages.availableLanguages)
    ? Object.keys(fallbackLanguages)
    : availableLanguages.availableLanguages;

  const renderOptions = (): JSX.Element[] => {
    return languages.map((code: string) => (
      <option key={code} value={code}>
        {fallbackLanguages[code]}
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
