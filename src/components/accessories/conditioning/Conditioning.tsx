import "moment/min/locales";
import React from "react";
import { useTranslation } from "react-i18next";

export const Conditioning = () => {
  const { t } = useTranslation();
  return (
    <div className="conditioning">
      <h1>{t("patient.conditioning")}</h1>
    </div>
  );
};
