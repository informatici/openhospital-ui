import React, { FunctionComponent } from "react";
import Table from "../../../table/Table";
import { useTranslation } from "react-i18next";
import InfoBox from "../../../infoBox/InfoBox";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { IState } from "../../../../../types";
import { OperationDTO } from "../../../../../generated";
import { IApiResponse } from "../../../../../state/types";
import classes from "./OperationTable.module.scss";

interface IOwnProps {
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
}

export const OperationTable: FunctionComponent<IOwnProps> = ({
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();

  const header = ["code", "type", "description", "class"];

  const label = {
    code: t("operation.code"),
    type: t("operation.type"),
    description: t("operation.description"),
    class: t("operation.class"),
  };
  const order = ["code", "type", "description", "class"];

  const { data, status, error } = useSelector<
    IState,
    IApiResponse<OperationDTO[]>
  >((state) => state.operations.operationList);

  const handleEdit = (row: OperationDTO) => {
    onEdit((data ?? []).find((item) => item.code === row?.code));
  };

  const handleDelete = (row: OperationDTO) => {
    onDelete(row);
  };

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
                <Table
                  rowData={formatDataToDisplay(data ?? [])}
                  tableHeader={header}
                  labelData={label}
                  columnsOrder={order}
                  rowsPerPage={20}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  showEmptyCell={false}
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
