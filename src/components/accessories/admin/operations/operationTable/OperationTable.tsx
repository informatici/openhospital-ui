import React, { FunctionComponent, ReactNode, useEffect, useRef } from "react";
import Table from "../../../table/Table";
import { useTranslation } from "react-i18next";
import InfoBox from "../../../infoBox/InfoBox";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../types";
import { OperationDTO } from "../../../../../generated";
import { ApiResponse } from "../../../../../state/types";
import classes from "./OperationTable.module.scss";
import { TFilterField } from "../../../table/filter/types";
import { deleteOperationReset } from "../../../../../state/operations";
import ConfirmationDialog from "../../../confirmationDialog/ConfirmationDialog";
import checkIcon from "../../../../../assets/check-icon.png";
import { scrollToElement } from "../../../../../libraries/uiUtils/scrollToElement";

interface IOwnProps {
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
  headerActions?: ReactNode;
}

export const OperationTable: FunctionComponent<IOwnProps> = ({
  onEdit,
  onDelete,
  headerActions,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const operationTypesOptions = useSelector<
    IState,
    { label: string; value: string }[]
  >(
    (state) =>
      state.types.operations.getAll.data?.map((item) => ({
        label: item.description,
        value: item.code,
      })) ?? []
  );

  const header = ["code", "type", "description", "class"];

  const label = {
    code: t("operation.code"),
    type: t("operation.type"),
    description: t("operation.description"),
    class: t("operation.class"),
  };
  const order = ["code", "type", "description", "class"];
  const filters: TFilterField[] = [
    { key: "description", label: t("operation.description"), type: "text" },
    {
      key: "type",
      label: t("operation.type"),
      type: "select",
      options: operationTypesOptions,
    },
    {
      key: "class",
      label: t("operation.class"),
      type: "select",
      options: [
        { label: t("operation.classes.minor"), value: "0" },
        { label: t("operation.classes.major"), value: "1" },
      ],
    },
  ];

  const { data, status, error } = useSelector<
    IState,
    ApiResponse<OperationDTO[]>
  >((state) => state.operations.operationList);

  const deleteOperation = useSelector<IState, ApiResponse<boolean>>(
    (state) => state.operations.delete
  );

  const handleEdit = (row: OperationDTO) => {
    onEdit((data ?? []).find((item) => item.code === row?.code));
  };

  const handleDelete = (row: OperationDTO) => {
    onDelete(row);
  };

  useEffect(() => {
    if (deleteOperation.status === "FAIL") {
      scrollToElement(infoBoxRef.current);
    }
  }, [deleteOperation.status]);

  const formatDataToDisplay = (data: OperationDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code ?? "",
        type: item.type?.description ?? "",
        description: item.description ?? "",
        class:
          item.major === 0
            ? t("operation.classes.minor")
            : t("operation.classes.major"),
        lock: item.lock,
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
              <>
                {deleteOperation.status === "FAIL" && (
                  <div ref={infoBoxRef} className="info-box-container">
                    <InfoBox
                      type="error"
                      message={deleteOperation.error?.message}
                    />
                  </div>
                )}
                <Table
                  rowData={formatDataToDisplay(data ?? [])}
                  tableHeader={header}
                  labelData={label}
                  columnsOrder={order}
                  rowsPerPage={20}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  showEmptyCell={false}
                  filterColumns={filters}
                  rowKey="code"
                  manualFilter={false}
                  rawData={
                    data?.map((operation) => ({
                      ...operation,
                      class: operation.major.toString(),
                      type: operation.type?.code,
                    })) ?? []
                  }
                  headerActions={headerActions}
                />
                <ConfirmationDialog
                  isOpen={deleteOperation.status === "SUCCESS"}
                  title={t("operation.deleted")}
                  icon={checkIcon}
                  info={t("operation.deleteSuccess")}
                  primaryButtonLabel="Ok"
                  handlePrimaryButtonClick={() => {
                    dispatch(deleteOperationReset());
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
