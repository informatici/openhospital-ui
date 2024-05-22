import React, { useEffect } from "react";
import Table from "../../../table/Table";
import { useTranslation } from "react-i18next";
import InfoBox from "../../../infoBox/InfoBox";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../types";
import { SupplierDTO } from "../../../../../generated";
import { IApiResponse } from "../../../../../state/types";
import { getSuppliers } from "../../../../../state/suppliers/actions";
import { TFilterField } from "../../../table/filter/types";
import classes from "./SuppliersTable.module.scss";

export const SuppliersTable = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getSuppliers());
  }, [dispatch]);

  const header = ["name"];

  const label = {
    name: t("supplier.name"),
    address: t("supplier.address"),
    taxcode: t("supplier.taxcode"),
    phone: t("supplier.phone"),
    fax: t("supplier.fax"),
    email: t("supplier.email"),
    note: t("supplier.note"),
  };

  const order = ["name"];

  const filters: TFilterField[] = [
    { key: "name", label: t("supplier.name"), type: "text" },
  ];

  const { data, status, error } = useSelector<
    IState,
    IApiResponse<SupplierDTO[]>
  >((state) => state.suppliers.supplierList);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const formatDataToDisplay = (data: SupplierDTO[]) => {
    return data.map((item) => {
      return {
        name: item.supName ?? "",
        address: item.supAddress ?? "",
        taxcode: item.supTaxcode ?? "",
        phone: item.supPhone ?? "",
        fax: item.supFax ?? "",
        email: item.supEmail ?? "",
        note: item.supNote ?? "",
      };
    });
  };

  return (
    <div className={classes.table}>
      {(() => {
        switch (status) {
          case "FAIL":
            return <InfoBox type="error" message={error?.message} />;
          case "LOADING":
            return (
              <CircularProgress
                style={{ marginLeft: "50%", position: "relative" }}
              />
            );

          case "SUCCESS":
            return (
              <Table
                rowData={formatDataToDisplay(data ?? [])}
                tableHeader={header}
                labelData={label}
                columnsOrder={order}
                rowsPerPage={10}
                filterColumns={filters}
                isCollapsabile={true}
                showEmptyCell={false}
                rowKey="name"
                manualFilter={false}
              />
            );
          case "SUCCESS_EMPTY":
            return <InfoBox type="info" message={t("common.emptydata")} />;
          default:
            return;
        }
      })()}
    </div>
  );
};
