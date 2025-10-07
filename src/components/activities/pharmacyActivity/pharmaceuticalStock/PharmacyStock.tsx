import { PATHS } from "consts";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";
import { PharmacyActivityContent } from "../PharmacyActivityContent";
import { StockActions, StockTable } from "./components";
import "./styles.scss";

export default function PharmacyStock() {
  const { t } = useTranslation();

  const { breadcrumbMap, setBreadcrumbMap } = useOutletContext<{
    breadcrumbMap: Record<string, string>;
    setBreadcrumbMap: (map: Record<string, string>) => void;
  }>();

  const addBreadcrumb = () => {
    setBreadcrumbMap({
      ...breadcrumbMap,
      [t("pharmacy.labels.pharmaceutical-stock")]:
        PATHS.pharmacy_pharmaceuticalstock,
    });
  };

  const removeBreadcrumb = () => {
    const updatedMap = { ...breadcrumbMap };
    delete updatedMap[t("pharmacy.labels.pharmaceutical-stock")];
    setBreadcrumbMap(updatedMap);
  };

  useEffect(() => {
    addBreadcrumb();
    return () => {
      removeBreadcrumb();
    };
  }, []);

  return (
    <PharmacyActivityContent
      data-cy="pharmaceutical-stock"
      title={t("pharmacy.labels.pharmaceutical-stock")}
    >
      <div className="pharmaceutical-stock">
        <StockActions />
        <StockTable />
      </div>
    </PharmacyActivityContent>
  );
}
