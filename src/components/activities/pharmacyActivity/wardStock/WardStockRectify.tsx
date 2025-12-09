import { PATHS } from "consts";
import { MedicalWardDTO, MovementWardDTO } from "generated";
import { useTranslation } from "libraries/hooks";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useCallback, useEffect, useRef } from "react";
import { useOutletContext, useParams } from "react-router";
import { newMovementWard } from "state/pharmacy";
import { PharmacyActivityContent } from "../PharmacyActivityContent";
import RectifyQuantityForm from "./components/form/RectifyQuantityForm";

const WardStockRectify: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const params = useParams<{
    medCode?: string;
    wardCode?: string;
    lotCode?: string;
  }>();

  const { breadcrumbMap, setBreadcrumbMap } = useOutletContext<{
    breadcrumbMap: Record<string, string>;
    setBreadcrumbMap: (map: Record<string, string | undefined>) => void;
  }>();

  const addBreadcrumb = useCallback(() => {
    setBreadcrumbMap({
      ...breadcrumbMap,
      [t("pharmacy.labels.ward-stock")]: PATHS.pharmacy_ward_stock,
      [t("pharmacy.labels.rectify-ward-stock")]:
        PATHS.pharmacy_ward_stock_rectify
          .replace(":medCode", params.medCode ?? "")
          .replace(":wardCode", params.wardCode ?? "")
          .replace(":lotCode", params.lotCode ?? ""),
    });
  }, [params.medCode, params.wardCode, params.lotCode, t, breadcrumbMap]);

  const removeBreadcrumb = useCallback(() => {
    setBreadcrumbMap({
      ...breadcrumbMap,
      [t("pharmacy.labels.ward-stock")]: PATHS.pharmacy_ward_stock,
      [t("pharmacy.labels.rectify-ward-stock")]:
        PATHS.pharmacy_ward_stock_rectify
          .replace(":medCode", params.medCode ?? "")
          .replace(":wardCode", params.wardCode ?? "")
          .replace(":lotCode", params.lotCode ?? ""),
    });
  }, [t, breadcrumbMap]);

  const selectedMedical = useAppSelector((state) =>
    state.pharmacy.wardMedicals.data?.find((med: MedicalWardDTO) => {
      return (
        String(med.id?.ward?.code ?? "") === String(params.wardCode ?? "") &&
        String(med.id?.medical?.code ?? "") === String(params.medCode ?? "")
      );
    })
  );
  const handleSubmit = useCallback(
    (updatedMedical: MovementWardDTO) => {
      dispatch(
        newMovementWard(updatedMedical)
      );
    },
    [dispatch]
  );

  useEffect(() => {
    addBreadcrumb();
    return removeBreadcrumb;
  }, [addBreadcrumb, removeBreadcrumb]);

  return (
    <PharmacyActivityContent
      data-cy="rectify-ward-stock"
      title={t("pharmacy.labels.rectify-ward-stock")}
    >
      <div className="update-pharmaceutical">
        {selectedMedical && (
          <RectifyQuantityForm
            onSubmit={handleSubmit}
            pharmaceutical={selectedMedical}
            // loading={status === "LOADING"}
          />
        )}
      </div>
    </PharmacyActivityContent>
  );
};

export default WardStockRectify;
