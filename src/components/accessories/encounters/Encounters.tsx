import "moment/min/locales";
import React from "react";
import { useTranslation } from "react-i18next";

export const Encounters = () => {
  const { t } = useTranslation();
  return (
    <div className="encounters">
      <h1>{t("patient.encounters")}</h1>
    </div>
  );
};
