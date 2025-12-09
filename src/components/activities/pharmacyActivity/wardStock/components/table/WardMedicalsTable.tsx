import { CircularProgress } from "@mui/material";
import InfoBox from "components/accessories/infoBox/InfoBox";
import Table from "components/accessories/table/Table";
import { TFilterField } from "components/accessories/table/filter/types";
import { PATHS } from "consts";
import { MedicalWardDTO } from "generated";
import { useTranslation } from "libraries/hooks";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { getMovements } from "state/pharmacy";

export function WardMedicalsTable() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const filter = useAppSelector((state) => state.pharmacy.wardStock.filter);

  const data = useAppSelector(
    (state) => state.pharmacy.wardMedicals.data ?? []
  );

  const status = useAppSelector((state) => state.pharmacy.wardMedicals.status);

  const errorMessage = useAppSelector(
    (state) =>
      state.pharmacy.wardMedicals.error?.message || t("errors.somethingwrong")
  ) as string;

  const labelData = {
    pharmaceutical: t("pharmacy.stock.ward.pharmaceutical"),
    quantity: t("pharmacy.stock.ward.quantity"),
    units: t("pharmacy.stock.ward.units"),
  };

  type LabelDataKey = keyof typeof labelData;

  const tableHeader: LabelDataKey[] = ["pharmaceutical", "quantity", "units"];

  const dateFields: LabelDataKey[] = [];
  const order: LabelDataKey[] = ["pharmaceutical", "quantity"];

  const filters = useMemo(
    () =>
      [
        {
          key: "units",
          label: t("pharmacy.stock.ward.units"),
          type: "text",
        },
        {
          key: "quantity",
          label: t("pharmacy.stock.ward.quantity"),
          type: "number",
        },
        { key: "date", label: t("pharmacy.stock.ward.date"), type: "date" },
        {
          key: "pharmaceutical",
          label: t("pharmacy.stock.ward.pharmaceutical"),
          type: "text",
        },
      ] satisfies TFilterField[],
    [t]
  );

  const formattedData = useMemo(() => {
    return data.map((item) => ({
      code: item.id?.medical?.code ?? "",
      wardCode: item.id?.ward.code ?? "",
      lotCode: item.id?.lot?.code ?? "",
      pharmaceutical: item.id?.medical?.description ?? "",
      units: "",
      quantity: (item.in_quantity ?? 0) - (item.out_quantity ?? 0),
    }));
  }, [data, filter, t]);

  useEffect(() => {
    dispatch(getMovements());
  }, [dispatch]);

    const handleRectify = (medical: any) => {
        navigate(
          PATHS.pharmacy_ward_stock_rectify.replace(
            ":medCode",
            medical.code.toString() ?? ""
          ).replace(
            ":wardCode",
            medical.wardCode ?? ""
          ).replace(
            ":lotCode",
            medical.lotCode ?? ""
          )
        );
      };
  

  return (
    <div data-cy="ward-movements-table">
      {(() => {
        switch (status) {
          case "IDLE":
            return <CircularProgress />;
          case "SUCCESS":
            return (
              <Table
                labelData={labelData}
                tableHeader={tableHeader}
                rowsPerPage={10}
                columnsOrder={order}
                initialOrderBy="pharmaceutical"
                rowData={formattedData}
                dateFields={dateFields}
                showEmptyCell={false}
                filterColumns={filters}
                rawData={(data ?? []).map((item) => ({
                  ...item,
                  code: item.id?.medical?.code ?? "",
                  pharmaceutical: item.id?.medical?.description ?? "",
                  units: item.id?.medical?.prodCode ?? "",
                  quantity: (item.in_quantity ?? 0) - (item.out_quantity ?? 0),
                }))}
                manualFilter={false}
                onRectify={(row) => handleRectify(row)}
              />
            );
          case "SUCCESS_EMPTY":
            return <InfoBox type="info" message={t("common.emptydata")} />;
          case "FAIL":
            return <InfoBox type="error" message={errorMessage} />;
          default:
            return <CircularProgress />;
        }
      })()}
    </div>
  );
}
