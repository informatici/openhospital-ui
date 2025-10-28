import { PATHS } from "consts";
import { useAppDispatch } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";
import { getMedicals } from "state/medicals";
import "./styles.scss";
import { PharmacyActivityContent } from "../PharmacyActivityContent";
import { DisChargeMovementForm } from "./components/forms/DisChargeMovementForm/DisChargeMovementForm";

export function DisChargeMovement() {
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
      [t("pharmacy.labels.DisCharge-movement")]:
        PATHS.pharmacy_pharmaceuticalstock_discharge,
    });
  };

  const removeBreadcrumb = () => {
    setBreadcrumbMap({
      ...breadcrumbMap,
      [t("pharmacy.labels.pharmaceutical-stock")]: undefined,
      [t("pharmacy.labels.DisCharge-movement")]: undefined,
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
      data-cy="DisCharge-movement"
      title={t("pharmacy.labels.DisCharge-movement")}
    >
      <div className="DisCharge-movement">
        <DisChargeMovementForm onSubmit={console.log} />
      </div>
    </PharmacyActivityContent>
  );
}
