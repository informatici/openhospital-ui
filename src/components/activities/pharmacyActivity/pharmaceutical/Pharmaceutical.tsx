import { PATHS } from "consts";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";
import { PharmacyActivityContent } from "../PharmacyActivityContent";
import PharmaceuticalActions from "./components/pharmaceuticalActions/PharmaceuticalActions";
import PharmaceuticalTable from "./components/pharmaceuticalTable/PharmaceuticalTable";

export default function Pharmaceutical() {
  const { t } = useTranslation();
  const { breadcrumbMap, setBreadcrumbMap } = useOutletContext<{
    breadcrumbMap: Record<string, string>;
    setBreadcrumbMap: (map: Record<string, string>) => void;
  }>();

  useEffect(() => {
    setBreadcrumbMap({
      [t("nav.pharmacy")]: PATHS.pharmacy,
      [t("pharmacy.labels.pharmaceutical-title")]:
        PATHS.pharmacy_pharmaceutical,
    });
    return () => {
      setBreadcrumbMap({
        [t("nav.pharmacy")]: PATHS.pharmacy,
      });
    };
  }, [t, setBreadcrumbMap]);

  return (
    <PharmacyActivityContent
      data-cy="pharmacy"
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
