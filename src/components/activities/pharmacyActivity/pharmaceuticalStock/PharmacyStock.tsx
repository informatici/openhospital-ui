import React from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import ActionStock from "./actionStock/ActionStock";
import StockTable from "./table/StockTable";

export default function PharmacyStock() {
  const { t } = useTranslation();

  return (
    <div className="pharmaceuticalStock">
      <h3 className="pharmaceuticalStock__title">
        {t("pharmacy.labels.pharmaceutical-stock")}
      </h3>
      <div className="pharmaceuticalStock__content">
        <ActionStock />
        <StockTable />
      </div>
    </div>
  );
}
