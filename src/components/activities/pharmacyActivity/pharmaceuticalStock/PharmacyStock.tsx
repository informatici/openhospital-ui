import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import ActionStock from "./actionStock/ActionStock";
import StockTable from "./table/StockTable";
import { useOutletContext } from "react-router";
import { PATHS } from "consts";

export default function PharmacyStock() {
  const { t } = useTranslation();

  const { breadcrumbMap, setBreadcrumbMap } = useOutletContext<{ breadcrumbMap: Record<string, string>; setBreadcrumbMap: (map: Record<string, string>) => void }>();

  const addBreadcrumb = () => {
    setBreadcrumbMap({ ...breadcrumbMap, [t("pharmacy.labels.pharmaceutical-stock")]: PATHS.pharmacy_pharmaceuticalstock });
  };

  useEffect(() => {
    addBreadcrumb();
  }, []);

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
