import checkIcon from "assets/check-icon.png";
import ConfirmationDialog from "components/accessories/confirmationDialog/ConfirmationDialog";
import InfoBox from "components/accessories/infoBox/InfoBox";
import { PATHS } from "consts";
import { MovementDTO } from "generated";
import { useNavigationHandler, useTranslation } from "libraries/hooks";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useCallback, useEffect, useRef } from "react";
import { useOutletContext } from "react-router";
import { getMedicals } from "state/medicals";
import { chargeMovements, resetChargeMovements } from "state/pharmacy";
import { getSuppliers } from "state/suppliers";
import { PharmacyActivityContent } from "../PharmacyActivityContent";
import { ChargeMovementForm } from "./components/forms";
import "./styles.scss";

export function ChargeMovement() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const { breadcrumbMap, setBreadcrumbMap } = useOutletContext<{
    breadcrumbMap: Record<string, string>;
    setBreadcrumbMap: (map: Record<string, string | undefined>) => void;
  }>();

  const addBreadcrumb = useCallback(() => {
    setBreadcrumbMap({
      ...breadcrumbMap,
      [t("pharmacy.labels.pharmaceutical-stock")]:
        PATHS.pharmacy_pharmaceuticalstock,
      [t("pharmacy.labels.charge-movement")]:
        PATHS.pharmacy_pharmaceuticalstock_charge,
    });
  }, [t, breadcrumbMap]);

  const removeBreadcrumb = useCallback(() => {
    setBreadcrumbMap({
      ...breadcrumbMap,
      [t("pharmacy.labels.pharmaceutical-stock")]: undefined,
      [t("pharmacy.labels.charge-movement")]: undefined,
    });
  }, [t, breadcrumbMap]);

  const status = useAppSelector(
    (state) => state.pharmacy.chargeMovements.status
  );

  const errorMessage = useAppSelector(
    (state) =>
      state.pharmacy.chargeMovements.error?.message ??
      t("pharmacy.messages.charge-movement-fail.description")
  );

  const handleGoBack = useNavigationHandler(
    PATHS.pharmacy_pharmaceuticalstock,
    { replace: true }
  );

  const handleMovementCharge = useCallback(
    (values: MovementDTO) => {
      dispatch(
        chargeMovements({
          movementDTO: [
            {
              ...values,
              type: { code: "charge", description: "Charge", type: "+" },
            },
          ],
          ref: values.refNo,
        })
      );
    },
    [dispatch]
  );

  const handleDialogActions = useCallback(() => {
    dispatch(resetChargeMovements());
    if (status === "SUCCESS") {
      handleGoBack();
    }
  }, [dispatch, handleGoBack]);

  useEffect(() => {
    addBreadcrumb();
    return removeBreadcrumb;
  }, [breadcrumbMap]);

  useEffect(() => {
    dispatch(getMedicals());
    dispatch(getSuppliers());
  }, [dispatch]);

  return (
    <PharmacyActivityContent
      data-cy="charge-movement"
      title={t("pharmacy.labels.charge-movement")}
    >
      <div className="charge-movement">
        <ChargeMovementForm
          onSubmit={handleMovementCharge}
          loading={status === "LOADING"}
        />
        {status === "FAIL" && (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}
      </div>
      <ConfirmationDialog
        isOpen={status === "SUCCESS"}
        title={t("pharmacy.messages.charge-movement-success.title")}
        icon={checkIcon}
        info={t("pharmacy.messages.charge-movement-success.description")}
        primaryButtonLabel="OK"
        handlePrimaryButtonClick={handleDialogActions}
        handleSecondaryButtonClick={handleDialogActions}
      />
    </PharmacyActivityContent>
  );
}
