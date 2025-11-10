import { PATHS } from "consts";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";
import { getMedicals } from "state/medicals";
import "./styles.scss";
import { PharmacyActivityContent } from "../PharmacyActivityContent";
import { MovementDTO } from "generated";
import {
  dischargeMovements,
  resetDischargeMovements,
} from "state/pharmacy";
import ConfirmationDialog from "components/accessories/confirmationDialog/ConfirmationDialog";
import checkIcon from "../../../../assets/check-icon.png";
import { DisChargeMovementTransitionState } from "./types";
import { useNavigate } from "react-router";
import InfoBox from "components/accessories/infoBox/InfoBox";
import { DischargeMovementForm } from "./components/forms/DischargeMovementForm/DischargeMovementForm";
import { values } from "lodash";

export function DischargeMovement() {
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [activityTransitionState, setActivityTransitionState] =
    useState<DisChargeMovementTransitionState>("IDLE");

  const createStatus = useAppSelector(
    (state) => state.pharmacy.dischargeMovements.status
  );

  const errorMessage = useAppSelector(
    (state) => state.pharmacy.dischargeMovements.error?.message
  ) as string;

  const { breadcrumbMap, setBreadcrumbMap } = useOutletContext<{
    breadcrumbMap: Record<string, string>;
    setBreadcrumbMap: (map: Record<string, string | undefined>) => void;
  }>();

  const addBreadcrumb = () => {
    setBreadcrumbMap({
      ...breadcrumbMap,
      [t("pharmacy.labels.pharmaceutical-stock")]:
        PATHS.pharmacy_pharmaceuticalstock,
      [t("pharmacy.labels.discharge-movement")]:
        PATHS.pharmacy_pharmaceuticalstock_discharge,
    });
  };

  const handleSubmit = useCallback((values: MovementDTO[]) => {
    dispatch(dischargeMovements({ ref: "REF123", movementDTO: values }));
  }, [dispatch, values]);

  const handleReset = useCallback(() => {
    const newMap = { ...breadcrumbMap };
    delete newMap[t("pharmacy.labels.pharmaceutical-stock")];
    delete newMap[t("pharmacy.labels.discharge-movement")];
    dispatch(resetDischargeMovements());
    setBreadcrumbMap(newMap);
    setActivityTransitionState("TO_RESET");
    navigate(PATHS.pharmacy_pharmaceuticalstock, { replace: true });
  }, [dispatch, breadcrumbMap, navigate]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(resetDischargeMovements());
      setActivityTransitionState("IDLE");
    }
  }, [dispatch, activityTransitionState]);

  useEffect(() => {
    addBreadcrumb();
    return () => {
      const newMap = { ...breadcrumbMap };
      delete newMap[t("pharmacy.labels.pharmaceutical-stock")];
      delete newMap[t("pharmacy.labels.discharge-movement")];
      setBreadcrumbMap(newMap);
    };
  }, []);

  useEffect(() => {
    dispatch(getMedicals());
  }, [dispatch]);

  return (
    <PharmacyActivityContent
      data-cy="discharge-movement"
      title={t("pharmacy.labels.discharge-movement")}
    >
      <div className="discharge-movement">
        <DischargeMovementForm
          onSubmit={handleSubmit}
          onCancel={() => {
            const newMap = { ...breadcrumbMap };
            delete newMap[t("pharmacy.labels.pharmaceutical-stock")];
            delete newMap[t("pharmacy.labels.discharge-movement")];
            setBreadcrumbMap(newMap);
            navigate(PATHS.pharmacy_pharmaceuticalstock, { replace: true });
          }}
        />
      </div>
      <ConfirmationDialog
        isOpen={createStatus === "SUCCESS"}
        title={t("pharmacy.labels.discharge-movement-created")}
        icon={checkIcon}
        info={t("pharmacy.labels.discharge-movement-created-successfully")}
        primaryButtonLabel={t("pharmacy.labels.ok")}
        handlePrimaryButtonClick={handleReset}
        handleSecondaryButtonClick={() => ({})}
      />
      {createStatus === "SUCCESS_EMPTY" && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="info" message={t("admission.patientnotadmitted")} />
        </div>
      )}
      {createStatus === "FAIL" && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="error" message={errorMessage} />
        </div>
      )}
    </PharmacyActivityContent>
  );
}
