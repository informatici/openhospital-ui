import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import PharmaceuticalActions from "./components/pharmaceuticalActions/PharmaceuticalActions";
import { PATHS } from "consts";
import { useOutletContext } from "react-router";
import PharmaceuticalTable from "./components/pharmaceuticalTable/PharmaceuticalTable";
import { PharmacyActivityContent } from "../PharmacyActivityContent";

export default function Pharmaceutical() {
  const { t } = useTranslation();
  const { breadcrumbMap, setBreadcrumbMap } = useOutletContext<{
    breadcrumbMap: Record<string, string>;
    setBreadcrumbMap: (map: Record<string, string>) => void;
  }>();

  const addBreadcrumb = () => {
    setBreadcrumbMap({
      ...breadcrumbMap,
      [t("pharmacy.labels.pharmaceutical-title")]:
        PATHS.pharmacy_pharmaceutical,
    });
  };

  const removeBreadcrumb = () => {
    const updatedMap = { ...breadcrumbMap };
    delete updatedMap[t("pharmacy.labels.pharmaceutical-title")];
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
      data-cy="pharmaceutical"
      title={t("pharmacy.labels.pharmaceutical-title")}
    >
      <div className="pharmaceutical">
        <div data-cy="pharmaceutical-actions">
          <PharmaceuticalActions />
        </div>

        <div data-cy="pharmaceutical-table">
          <PharmaceuticalTable />
        </div>
      </div>
    </PharmacyActivityContent>
  );
}
