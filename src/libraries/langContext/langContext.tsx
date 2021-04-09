import React from "react";

interface ILangContext {
  changeLang: (lang: string) => void;
}

const langContextInitialValues = {
  changeLang: (): Record<string, unknown> => ({}),
};

export const LangContext = React.createContext<ILangContext>(
  langContextInitialValues
);
