import checkIcon from "assets/check-icon.png";
import ConfirmationDialog from "components/accessories/confirmationDialog/ConfirmationDialog";
import InfoBox from "components/accessories/infoBox/InfoBox";
import { PATHS } from "consts";
import { MedicalDTO } from "generated";
import { useNavigationHandler, useTranslation } from "libraries/hooks";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useCallback, useEffect, useRef } from "react";
import { useOutletContext } from "react-router";
import { getMedicalTypes, newMedical, resetNewMedical } from "state/pharmacy";
import { PharmacyActivityContent } from "../PharmacyActivityContent";
import { PharmaceuticalForm } from "./components/forms/pharmaceuticalForm/PharmaceuticalForm";
import "./styles.scss";

export function NewPharmaceutical() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const { setBreadcrumbMap } = useOutletContext<{
    breadcrumbMap: Record<string, string>;
    setBreadcrumbMap: (map: Record<string, string | undefined>) => void;
  }>();

  useEffect(() => {
    setBreadcrumbMap({
      [t("nav.pharmacy")]: PATHS.pharmacy,
      [t("pharmacy.labels.pharmaceutical-title")]:
        PATHS.pharmacy_pharmaceutical,
      [t("pharmacy.labels.new-pharmaceutical-title")]:
        PATHS.pharmacy_pharmaceutical_new,
    });
    return () => {
      setBreadcrumbMap({
        [t("nav.pharmacy")]: PATHS.pharmacy,
      });
    };
  }, [t, setBreadcrumbMap]);

  const status = useAppSelector((state) => state.pharmacy.newMedical.status);

  const errorMessage = useAppSelector(
    (state) =>
      state.pharmacy.newMedical.error?.message ??
      t("pharmacy.messages.new-pharmaceutical-fail.description")
  );

  const handleGoBack = useNavigationHandler(PATHS.pharmacy_pharmaceutical, {
    replace: true,
  });

  const handleSubmit = useCallback(
    (data: MedicalDTO) => {
      dispatch(newMedical({ medicalDTO: data }));
    },
    [dispatch]
  );

  const handleDialogActions = useCallback(() => {
    dispatch(resetNewMedical());
    if (status === "SUCCESS") {
      handleGoBack();
    }
  }, [dispatch, handleGoBack]);

  useEffect(() => {
    dispatch(getMedicalTypes());
  }, [dispatch]);

  return (
    <PharmacyActivityContent
      data-cy="new-pharmaceutical"
      title={t("pharmacy.labels.new-pharmaceutical-title")}
    >
      <div className="new-pharmaceutical">
        <PharmaceuticalForm
          onSubmit={handleSubmit}
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
        title={t("pharmacy.messages.new-pharmaceutical-success.title")}
        icon={checkIcon}
        info={t("pharmacy.messages.new-pharmaceutical-success.description")}
        primaryButtonLabel="OK"
        handlePrimaryButtonClick={handleDialogActions}
        handleSecondaryButtonClick={handleDialogActions}
      />
    </PharmacyActivityContent>
  );
}
