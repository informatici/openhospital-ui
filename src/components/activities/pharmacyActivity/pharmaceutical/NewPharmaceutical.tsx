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
import { PharmaceuticalForm } from "./components/forms/mewPharmaceuticalForm/PharmaceuticalForm";
import "./styles.scss";

export function NewPharmaceutical() {
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
      [t("pharmacy.labels.pharmaceutical")]: PATHS.pharmacy_pharmaceutical,
      [t("pharmacy.labels.new-pharmaceutical-title")]:
        PATHS.pharmacy_pharmaceutical_new,
    });
  }, [t, breadcrumbMap]);

  const removeBreadcrumb = useCallback(() => {
    setBreadcrumbMap({
      ...breadcrumbMap,
      [t("pharmacy.labels.pharmaceutical")]: PATHS.pharmacy_pharmaceutical,
      [t("pharmacy.labels.new-pharmaceutical-title")]:
        PATHS.pharmacy_pharmaceutical_new,
    });
  }, [t, breadcrumbMap]);

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
    addBreadcrumb();
    return removeBreadcrumb;
  }, [breadcrumbMap]);

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
