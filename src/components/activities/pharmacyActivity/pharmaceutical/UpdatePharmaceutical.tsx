import checkIcon from "assets/check-icon.png";
import ConfirmationDialog from "components/accessories/confirmationDialog/ConfirmationDialog";
import InfoBox from "components/accessories/infoBox/InfoBox";
import { PATHS } from "consts";
import { MedicalDTO } from "generated";
import { useNavigationHandler, useTranslation } from "libraries/hooks";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { omit } from "lodash";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Navigate, useOutletContext, useParams } from "react-router";
import {
  getMedical,
  getMedicalTypes,
  resetNewMedical,
  resetUpdateMedical,
  updateMedical,
} from "state/pharmacy";
import { PharmacyActivityContent } from "../PharmacyActivityContent";
import { PharmaceuticalForm } from "./components/forms/pharmaceuticalForm/PharmaceuticalForm";
import "./styles.scss";

export function UpdatePharmaceutical() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();

  const { breadcrumbMap, setBreadcrumbMap } = useOutletContext<{
    breadcrumbMap: Record<string, string>;
    setBreadcrumbMap: (map: Record<string, string | undefined>) => void;
  }>();

  const addBreadcrumb = useCallback(() => {
    setBreadcrumbMap({
      ...breadcrumbMap,
      [t("pharmacy.labels.pharmaceutical")]: PATHS.pharmacy_pharmaceutical,
      [t("pharmacy.labels.update-pharmaceutical-title")]:
        PATHS.pharmacy_pharmaceutical_update.replace(":id", id ?? ""),
    });
  }, [id, t, breadcrumbMap]);

  const removeBreadcrumb = useCallback(() => {
    setBreadcrumbMap({
      ...breadcrumbMap,
      [t("pharmacy.labels.pharmaceutical")]: PATHS.pharmacy_pharmaceutical,
      [t("pharmacy.labels.update-pharmaceutical-title")]:
        PATHS.pharmacy_pharmaceutical_update.replace(":id", id ?? ""),
    });
  }, [t, breadcrumbMap]);

  const status = useAppSelector((state) => state.pharmacy.updateMedical.status);

  const errorMessage = useAppSelector(
    (state) =>
      state.pharmacy.updateMedical.error?.message ??
      t("pharmacy.messages.update-pharmaceutical-fail.description")
  );

  const medical = useAppSelector((state) => state.pharmacy.getMedical.data);

  const handleGoBack = useNavigationHandler(PATHS.pharmacy_pharmaceutical, {
    replace: true,
  });

  const handleSubmit = useCallback(
    (data: MedicalDTO & { ignoreSimilar?: boolean }) => {
      dispatch(
        updateMedical({
          medicalDTO: {
            ...omit(data, ["ignoreSimilar"]),
            code: +id!,
          },
          ignoreSimilar: data.ignoreSimilar,
        })
      );
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
    dispatch(getMedical({ code: +(id ?? "0") }));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getMedicalTypes());
    return () => {
      dispatch(resetUpdateMedical());
    };
  }, [dispatch]);

  if (!id) {
    return <Navigate to={PATHS.pharmacy_pharmaceutical} replace />;
  }

  return (
    <PharmacyActivityContent
      data-cy="update-pharmaceutical"
      title={t("pharmacy.labels.update-pharmaceutical-title")}
    >
      <div className="update-pharmaceutical">
        {medical && (
          <PharmaceuticalForm
            onSubmit={handleSubmit}
            loading={status === "LOADING"}
            pharmaceutical={medical}
          />
        )}
        {status === "FAIL" && (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}
      </div>
      <ConfirmationDialog
        isOpen={status === "SUCCESS"}
        title={t("pharmacy.messages.update-pharmaceutical-success.title")}
        icon={checkIcon}
        info={t("pharmacy.messages.update-pharmaceutical-success.description")}
        primaryButtonLabel="OK"
        handlePrimaryButtonClick={handleDialogActions}
        handleSecondaryButtonClick={handleDialogActions}
      />
    </PharmacyActivityContent>
  );
}
