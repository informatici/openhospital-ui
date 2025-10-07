import React from "react";
import { useTranslation } from "react-i18next";
import { PharmacyActivityContent } from "../PharmacyActivityContent";
import PharmaceuticalActions from "./pharmaceuticalActions/PharmaceuticalActions";

export default function Pharmaceutical() {
  const { t } = useTranslation();

  return (
    <PharmacyActivityContent
      data-cy="pharmaceutical"
      title={t("pharmacy.labels.pharmaceutical-title")}
    >
      <div className="pharmaceutical__content">
        <PharmaceuticalActions />
      </div>
    </PharmacyActivityContent>
  );
}
