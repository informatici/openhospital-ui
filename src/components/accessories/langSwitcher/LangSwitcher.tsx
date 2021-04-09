import React, { FunctionComponent, useContext } from "react";
import i18n from "i18next";
import { LangContext } from "../../../libraries/langContext/langContext";
import "./styles.scss";

const languageVocabolary: Record<string, string> = {
  en: "English",
  it: "Italian",
  de: "German",
  fr: "French",
  es: "Spanish",
  pt: "Portoguese",
  ar: "Arabic",
  sw: "Swahili",
  am: "Amharic",
  cs: "Czech",
  sq: "Albanian",
  zh: "Chinese",
};

const LangSwitcher: FunctionComponent = () => {
  const languages = Object.keys(i18n.services.resourceStore.data);
  const currentLang = i18n.language;
  const { changeLang } = useContext(LangContext);

  const renderOptions = (): JSX.Element[] => {
    return languages.map((code: string) => (
      <option key={code} value={code}>
        {languageVocabolary[code] || "undefined"}
      </option>
    ));
  };

  const getCurrentLang = () => {
    var value = "";
    Object.keys(languageVocabolary).forEach((key: string) => {
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
