import React, { FunctionComponent, ReactNode, useRef } from "react";
import Table from "../../../table/Table";
import { useTranslation } from "react-i18next";
import InfoBox from "../../../infoBox/InfoBox";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../types";
import { WardDTO } from "../../../../../generated";
import { ApiResponse } from "../../../../../state/types";
import { CheckOutlined } from "@material-ui/icons";
import classes from "./WardTable.module.scss";
import ConfirmationDialog from "../../../confirmationDialog/ConfirmationDialog";
import checkIcon from "../../../../../assets/check-icon.png";
import { deleteWardReset } from "../../../../../state/ward/actions";
import { TFilterField } from "../../../table/filter/types";

interface IOwnProps {
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
  headerActions?: ReactNode;
}

export const WardTable: FunctionComponent<IOwnProps> = ({
  onEdit,
  onDelete,
  headerActions,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const header = [
    "code",
    "description",
    "beds",
    "nurs",
    "docs",
    "opd",
    "pharmacy",
    "male",
    "female",
  ];

  const label = {
    code: t("ward.code"),
    description: t("ward.description"),
    opd: t("ward.opd"),
    male: t("ward.male"),
    female: t("ward.female"),
    pharmacy: t("ward.pharmacy"),
    beds: t("ward.beds"),
    nurs: t("ward.nurs"),
    docs: t("ward.docs"),
    email: t("ward.email"),
    telephone: t("ward.telephone"),
    fax: t("ward.fax"),
    visitDuration: t("ward.visitDuration"),
  };
  const order = ["code", "description", "beds", "nurs", "docs"];

  const filters: TFilterField[] = [
    { key: "pharmacy", label: t("ward.pharmacy"), type: "boolean" },
    { key: "male", label: t("ward.male"), type: "boolean" },
    { key: "female", label: t("ward.female"), type: "boolean" },
    { key: "opd", label: t("ward.opd"), type: "boolean" },
  ];

  const { data, status, error } = useSelector<IState, ApiResponse<WardDTO[]>>(
    (state) => state.wards.allWards
  );

  const deleteWard = useSelector<IState, ApiResponse<boolean>>(
    (state) => state.wards.delete
  );

  const handleEdit = (row: WardDTO) => {
    onEdit((data ?? []).find((item) => item.code === row?.code));
  };

  const handleDelete = (row: WardDTO) => {
    onDelete(row);
  };

  const formatDataToDisplay = (data: WardDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code ?? "",
        description: item.description ?? "",
        beds: item.beds ?? "",
        nurs: item.nurs ?? "",
        docs: item.docs ?? "",
        opd: item.opd ? <CheckOutlined fontSize="small" /> : "",
        male: item.male ? <CheckOutlined fontSize="small" /> : "",
        female: item.female ? <CheckOutlined fontSize="small" /> : "",
        pharmacy: item.pharmacy ? <CheckOutlined fontSize="small" /> : "",
        email: item.email ?? "",
        telephone: item.telephone ?? "",
        fax: item.fax ?? "",
        visitDuration: item.visitDuration ?? "",
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
                  isCollapsabile={true}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  showEmptyCell={false}
                  filterColumns={filters}
                  rawData={data}
                  manualFilter={false}
                  rowKey="code"
                  headerActions={headerActions}
                />
                {deleteWard.status === "FAIL" && (
                  <div ref={infoBoxRef} className="info-box-container">
                    <InfoBox type="error" message={deleteWard.error?.message} />
                  </div>
                )}
                <ConfirmationDialog
                  isOpen={!!deleteWard.hasSucceeded}
                  title={t("ward.deleted")}
                  icon={checkIcon}
                  info={t("ward.deleteSuccess")}
                  primaryButtonLabel="Ok"
                  handlePrimaryButtonClick={() => {
                    dispatch(deleteWardReset());
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
