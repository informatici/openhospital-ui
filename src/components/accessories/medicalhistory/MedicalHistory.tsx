import "moment/min/locales";
import React from "react";
import { useTranslation } from "react-i18next";

export const MedicalHistory = () => {
  const { t } = useTranslation();
  return (
    <div className="medicalHistory">
      <h1>{t("patient.medicalHistory")}</h1>
    </div>
  );
};
