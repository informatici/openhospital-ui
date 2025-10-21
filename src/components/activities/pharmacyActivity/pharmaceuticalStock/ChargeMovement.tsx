import { PATHS } from "consts";
import { useAppDispatch } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";
import { getMedicals } from "state/medicals";
import { PharmacyActivityContent } from "../PharmacyActivityContent";
import { ChargeMovementForm } from "./components/forms";
import "./styles.scss";

export function ChargeMovement() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { breadcrumbMap, setBreadcrumbMap } = useOutletContext<{
    breadcrumbMap: Record<string, string>;
    setBreadcrumbMap: (map: Record<string, string | undefined>) => void;
  }>();

  const addBreadcrumb = () => {
    setBreadcrumbMap({
      ...breadcrumbMap,
      [t("pharmacy.labels.pharmaceutical-stock")]:
        PATHS.pharmacy_pharmaceuticalstock,
      [t("pharmacy.labels.charge-movement")]:
        PATHS.pharmacy_pharmaceuticalstock_charge,
    });
  };

  const removeBreadcrumb = () => {
    setBreadcrumbMap({
      ...breadcrumbMap,
      [t("pharmacy.labels.pharmaceutical-stock")]: undefined,
      [t("pharmacy.labels.charge-movement")]: undefined,
    });
  };

  useEffect(() => {
    addBreadcrumb();
    return removeBreadcrumb;
  }, [breadcrumbMap]);

  useEffect(() => {
    dispatch(getMedicals());
  }, [dispatch]);

  return (
    <PharmacyActivityContent
      data-cy="charge-movement"
      title={t("pharmacy.labels.charge-movement")}
    >
      <div className="charge-movement">
        <ChargeMovementForm onSubmit={console.log} />
      </div>
    </PharmacyActivityContent>
  );
}
