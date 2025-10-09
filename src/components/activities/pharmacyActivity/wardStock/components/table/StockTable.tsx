import { CircularProgress } from "@mui/material";
import InfoBox from "components/accessories/infoBox/InfoBox";
import Table from "components/accessories/table/Table";
import { TFilterField } from "components/accessories/table/filter/types";
import { renderDateTime } from "libraries/formatUtils/dataFormatting";
import { useTranslation } from "libraries/hooks";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect, useMemo } from "react";
import { getMovements } from "state/pharmacy";

export function StockTable() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const filter = useAppSelector((state) => state.pharmacy.wardStock.filter);

  const data = useAppSelector(
    (state) => state.pharmacy.wardMovements.data ?? []
  );

  const status = useAppSelector((state) => state.pharmacy.wardMovements.status);

  const errorMessage = useAppSelector(
    (state) =>
      state.pharmacy.getMovements.error?.message || t("errors.somethingwrong")
  ) as string;

  const labelData = {
    date: t("pharmacy.stock.ward.date"),
    type: t("pharmacy.stock.ward.type"),
    recipient: t("pharmacy.stock.ward.recipient"),
    pharmaceutical: t("pharmacy.stock.ward.pharmaceutical"),
    quantity: t("pharmacy.stock.ward.quantity"),
    units: t("pharmacy.stock.ward.units"),
    patient: t("pharmacy.stock.ward.patient"),
    medical: t("pharmacy.stock.ward.medical"),
    wardFrom: t("pharmacy.stock.ward.wardFrom"),
    wardTo: t("pharmacy.stock.ward.wardTo"),
    code: t("pharmacy.stock.ward.code"),
    description: t("pharmacy.stock.ward.description"),
    ward: t("pharmacy.stock.ward.ward"),
    weight: t("pharmacy.stock.ward.weight"),
    age: t("pharmacy.stock.ward.age"),
  };

  type LabelDataKey = keyof typeof labelData;

  const tableHeader: LabelDataKey[] = [
    "date",
    "type",
    "recipient",
    "pharmaceutical",
    "quantity",
    "units",
  ];

  const dateFields: LabelDataKey[] = ["date"];
  const order: LabelDataKey[] = ["pharmaceutical", "quantity"];

  const filters = useMemo(
    () =>
      [
        {
          key: "recipient",
          label: t("pharmacy.stock.ward.recipient"),
          type: "text",
        },
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
        {
          key: "type",
          label: t("pharmacy.stock.ward.type"),
          type: "select",
          options: [
            {
              label: t("pharmacy.stock.ward.movementType.patient"),
              value: "patient",
            },
            {
              label: t("pharmacy.stock.ward.movementType.ward"),
              value: "ward",
            },
          ],
        },
        { key: "date", label: t("pharmacy.stock.ward.date"), type: "date" },
        {
          key: "medical",
          label: t("pharmacy.stock.medical"),
          type: "text",
        },
      ] satisfies TFilterField[],
    [t]
  );

  const formattedData = useMemo(() => {
    return data
      .filter(
        (item) =>
          !filter.type ||
          (filter.type === "incoming" ? item.wardTo : item.wardFrom)?.code ===
            filter.ward?.code
      )
      .map((item) => ({
        recipient:
          (item.patient
            ? `${item.patient.firstName} ${item.patient.secondName}`
            : item.wardTo?.description) ?? "",
        patient: item.patient?.name ?? "",
        pharmaceutical: item.medical?.description ?? "",
        wardFrom: item.wardFrom?.description ?? "",
        wardTo: item.wardTo?.description ?? "",
        date: renderDateTime(item.date),
        code: item.code ?? "",
        units: item.units ?? "",
        description: item.description,
        quantity: item.quantity,
        ward: item.ward.description ?? "",
        weight: item.weight ?? "",
        age: item.age ?? "",
        type: t(
          `pharmacy.stock.ward.movementType.${
            item.patient ? "patient" : "ward"
          }`
        ),
      }));
  }, [data, filter, t]);

  useEffect(() => {
    dispatch(getMovements());
  }, [dispatch]);

  return (
    <div data-cy="ward-stock-table">
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
                rowData={formattedData}
                dateFields={dateFields}
                showEmptyCell={false}
                isCollapsabile={true}
                detailColSpan={6}
                filterColumns={filters}
                rawData={(data ?? []).map((item) => ({
                  ...item,
                  type: item.patient ? "patient" : "ward",
                  pharmaceutical: item.medical?.description ?? "",
                  recipient:
                    (item.patient
                      ? `${item.patient.firstName} ${item.patient.secondName}`
                      : item.wardTo?.description) ?? "",
                }))}
                manualFilter={false}
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
