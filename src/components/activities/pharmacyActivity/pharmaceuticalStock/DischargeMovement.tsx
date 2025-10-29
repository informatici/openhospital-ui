import { PATHS } from "consts";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";
import { getMedicals } from "state/medicals";
import "./styles.scss";
import { PharmacyActivityContent } from "../PharmacyActivityContent";
import { MovementDTO } from "generated";
import {
  createMovementReset,
  dischargeMovements,
  resetDischargeMovements,
} from "state/pharmacy";
import ConfirmationDialog from "components/accessories/confirmationDialog/ConfirmationDialog";
import { DisChargeMovementForm } from "./components/forms/DisChargeMovementForm/DisChargeMovementForm";
import checkIcon from "../../../../assets/check-icon.png";
import { DisChargeMovementTransitionState } from "./types";
import { useNavigate } from "react-router";
import InfoBox from "components/accessories/infoBox/InfoBox";

export function DisChargeMovement() {
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

  const handleSubmit = (values: MovementDTO[]) => {
    console.log("handleSubmit", values);
    dispatch(dischargeMovements({ ref: "REF123", movementDTO: values }));
  };

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(resetDischargeMovements());
      setActivityTransitionState("IDLE");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, activityTransitionState]);

  useEffect(() => {
    addBreadcrumb();
    return () => {
      const newMap = { ...breadcrumbMap };
      delete newMap[t("pharmacy.labels.pharmaceutical-stock")];
      delete newMap[t("pharmacy.labels.DisCharge-movement")];
      setBreadcrumbMap(newMap);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getMedicals());
  }, [dispatch]);

  return (
    <PharmacyActivityContent
      data-cy="DisCharge-movement"
      title={t("pharmacy.labels.DisCharge-movement")}
    >
      <div className="DisCharge-movement">
        <DisChargeMovementForm
          onSubmit={handleSubmit}
          onCancel={() => {
            const newMap = { ...breadcrumbMap };
            delete newMap[t("pharmacy.labels.pharmaceutical-stock")];
            delete newMap[t("pharmacy.labels.DisCharge-movement")];
            setBreadcrumbMap(newMap);
            navigate(PATHS.pharmacy_pharmaceuticalstock, { replace: true });
          }}
        />
      </div>
      <ConfirmationDialog
        isOpen={createStatus === "SUCCESS"}
        title="Discharge movement created"
        icon={checkIcon}
        info="Discharge movement created successfully"
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => {
          const newMap = { ...breadcrumbMap };
          delete newMap[t("pharmacy.labels.pharmaceutical-stock")];
          delete newMap[t("pharmacy.labels.DisCharge-movement")];
          dispatch(resetDischargeMovements());
          setBreadcrumbMap(newMap);
          setActivityTransitionState("TO_RESET");
          navigate(PATHS.pharmacy_pharmaceuticalstock, { replace: true });
        }}
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
