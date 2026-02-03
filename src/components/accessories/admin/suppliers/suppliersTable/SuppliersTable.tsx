import { CircularProgress } from "@mui/material";
import ConfirmationDialog from "components/accessories/confirmationDialog/ConfirmationDialog";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { ReactNode, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { SupplierDTO } from "../../../../../generated";
import {
  deleteSupplierReset,
  getSuppliers,
} from "../../../../../state/suppliers";
import InfoBox from "../../../infoBox/InfoBox";
import Table from "../../../table/Table";
import { TFilterField } from "../../../table/filter/types";
import classes from "./SuppliersTable.module.scss";

import checkIcon from "../../../../../assets/check-icon.png";

interface IOwnProps {
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
  headerActions?: ReactNode;
}

export const SuppliersTable = ({
  onEdit,
  onDelete,
  headerActions,
}: IOwnProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);

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

  const { data, status, error } = useAppSelector(
    (state) => state.suppliers.supplierList
  );

  const deleteSupplier = useAppSelector((state) => state.suppliers.delete);

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
        supId: item.supId,
      };
    });
  };

  const handleEdit = (row: SupplierDTO) => {
    onEdit((data ?? []).find((item) => item.supId === row?.supId));
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
              <>
                <Table
                  rowData={formatDataToDisplay(data ?? [])}
                  tableHeader={header}
                  labelData={label}
                  columnsOrder={order}
                  rowsPerPage={10}
                  isCollapsabile={true}
                  onEdit={handleEdit}
                  onDelete={onDelete}
                  filterColumns={filters}
                  showEmptyCell={false}
                  rowKey="name"
                  manualFilter={false}
                  headerActions={headerActions}
                />
                {deleteSupplier.isLoading && (
                  <div ref={infoBoxRef} className="info-box-container">
                    <InfoBox type="info" message={t("supplier.deleting")} />
                  </div>
                )}
                {deleteSupplier.status === "FAIL" && (
                  <div ref={infoBoxRef} className="info-box-container">
                    <InfoBox
                      type="error"
                      message={deleteSupplier.error?.message || "unknown error"}
                    />
                  </div>
                )}
                <ConfirmationDialog
                  isOpen={deleteSupplier.status === "SUCCESS"}
                  title={t("supplier.deleted")}
                  icon={checkIcon}
                  info={t("supplier.deleteSuccess")}
                  primaryButtonLabel="Ok"
                  handlePrimaryButtonClick={() => {
                    dispatch(getSuppliers());
                    dispatch(deleteSupplierReset());
                  }}
                  handleSecondaryButtonClick={() => ({})}
                />
              </>
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
