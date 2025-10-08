import { PATHS } from "consts";
import { useAppDispatch } from "libraries/hooks/redux";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";
import { getWardMovements } from "state/pharmacy";
import { getWards } from "state/ward";
import { PharmacyActivityContent } from "../PharmacyActivityContent";
import { StockTable, WardStockHeader } from "./components";
import "./styles.scss";
import { TWardStockFIlter } from "./types";

export function WardStock() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { breadcrumbMap, setBreadcrumbMap } = useOutletContext<{
    breadcrumbMap: Record<string, string>;
    setBreadcrumbMap: (map: Record<string, string>) => void;
  }>();

  const addBreadcrumb = () => {
    setBreadcrumbMap({
      ...breadcrumbMap,
      [t("pharmacy.labels.ward-stock")]: PATHS.pharmacy_ward_stock,
    });
  };

  const removeBreadcrumb = () => {
    const updatedMap = { ...breadcrumbMap };
    delete updatedMap[t("pharmacy.labels.pharmaceutical-stock")];
    setBreadcrumbMap(updatedMap);
  };

  useEffect(() => {
    addBreadcrumb();
    return () => {
      removeBreadcrumb();
    };
  }, []);

  useEffect(() => {
    dispatch(getWards());
  }, [dispatch]);

  const handleFilterChange = useCallback(
    (filter: TWardStockFIlter) => {
      if (filter.ward?.code) {
        dispatch(getWardMovements({ wardCode: filter.ward.code }));
      }
    },
    [dispatch]
  );

  return (
    <PharmacyActivityContent
      data-cy="ward-stock"
      title={t("pharmacy.labels.ward-stock")}
    >
      <div className="ward-stock">
        <WardStockHeader onFilterChange={handleFilterChange} />
        <StockTable />
      </div>
    </PharmacyActivityContent>
  );
}
