import { CircularProgress } from "@mui/material";
import InfoBox from "components/accessories/infoBox/InfoBox";
import Table from "components/accessories/table/Table";
import { MovementDTO } from "generated";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getMovements } from "state/pharmacy";
import { TFilterField } from "components/accessories/table/filter/types";

export default function StockTable() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const data = useAppSelector((state) =>
    state.pharmacy.getMovements.data ? state.pharmacy.getMovements.data : []
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const status = useAppSelector((state) => state.pharmacy.getMovements.status);

  const errorMessage = useAppSelector(
    (state) =>
      state.pharmacy.getMovements.error?.message || t("errors.somethingwrong")
  ) as string;

  const labelData = {
    refNo: t("pharmacy.stock.refNo"),
    lot: t("pharmacy.stock.lot"),
    expDate: t("pharmacy.stock.expDate"),
    type: t("pharmacy.stock.type"),
    quantity: t("pharmacy.stock.quantity"),
    medical: t("pharmacy.stock.medical"),
    cost: t("pharmacy.stock.cost"),
    total: t("pharmacy.stock.total"),
    prepDate: t("pharmacy.stock.prepDate"),
  };

  const tableHeader = [
    "refNo",
    "lot",
    "expDate",
    "type",
    "quantity",
    "medical",
    "cost",
    "total",
  ];

  const dateFields = ["expDate", "prepDate", "type"];
  const order = ["quantity", "cost", "total"];

  const filters: TFilterField[] = [
    { key: "refNo", label: t("pharmacy.stock.refNo"), type: "text" },
    { key: "lot", label: t("pharmacy.stock.lot"), type: "text" },
    { key: "type", label: t("pharmacy.stock.type"), type: "text" },
    { key: "expDate", label: t("pharmacy.stock.expDate"), type: "date" },
    { key: "medical", label: t("pharmacy.stock.medical"), type: "text" },
  ];

  const formatDataToDisplay = (data: MovementDTO[]) => {
    return data.map((item) => {
      return {
        refNo: item.refNo,
        lot: item.lot?.code,
        expDate: formatDate(item.date),
        type: item.type?.type == "+" ? "Charge" : "Discharge",
        quantity: item.quantity,
        medical: item.medical?.description,
        cost: item.lot?.cost,
        total: item.lot?.cost ? item.lot?.cost * item.quantity : 0,
        prepDate: formatDate(item.lot?.preparationDate ?? ""),
      };
    });
  };

  useEffect(() => {
    dispatch(getMovements());
  }, [dispatch]);

  return (
    <div>
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
                initialOrderBy="quantity"
                rowData={formatDataToDisplay(data)}
                dateFields={dateFields}
                showEmptyCell={false}
                isCollapsabile={true}
                detailColSpan={6}
                filterColumns={filters}
                rowKey="refNo"
                rawData={(data ?? []).map((item) => ({
                  ...item,
                  lot: item.lot?.code,
                  type: item.type?.type == "+" ? "Charge" : "Discharge",
                  medical: item.medical?.description,
                  expDate: formatDate(item.date),
                }))}
                manualFilter={false}
                adjustQuantity={(data ?? []).some(
                  (item) => item.type?.type === "+"
                )}
              />
            );
          case "SUCCESS_EMPTY":
            return <InfoBox type="info" message={t("common.emptydata")} />;
          default:
            return <InfoBox type="error" message={errorMessage} />;
        }
      })()}
    </div>
  );
}
