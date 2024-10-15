import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FunctionComponent, ReactNode, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import checkIcon from "../../../../../assets/check-icon.png";
import { WardDTO } from "../../../../../generated";
import { scrollToElement } from "../../../../../libraries/uiUtils/scrollToElement";
import { deleteWardReset, getWards } from "../../../../../state/ward";
import ConfirmationDialog from "../../../confirmationDialog/ConfirmationDialog";
import InfoBox from "../../../infoBox/InfoBox";
import { TFilterField } from "../../../table/filter/types";
import Table from "../../../table/Table";
import classes from "./WardTable.module.scss";

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
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const header = ["code", "description", "beds", "nurs", "docs"];

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

  const { data, status, error } = useAppSelector(
    (state) => state.wards.allWards
  );

  const deleteWard = useAppSelector((state) => state.wards.delete);

  const handleEdit = (row: WardDTO) => {
    onEdit((data ?? []).find((item) => item.code === row?.code));
  };

  const handleDelete = (row: WardDTO) => {
    onDelete(row);
  };

  useEffect(() => {
    if (deleteWard.status === "FAIL") {
      scrollToElement(infoBoxRef.current);
    }

    if (
      deleteWard.status === "SUCCESS" ||
      deleteWard.status === "SUCCESS_EMPTY"
    ) {
      dispatch(getWards());
    }
  }, [deleteWard.status, dispatch]);

  const formatDataToDisplay = (data: WardDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code ?? "",
        description: item.description ?? "",
        beds: item.beds ?? "",
        nurs: item.nurs ?? "",
        docs: item.docs ?? "",
        opd: item.opd ? (
          <CheckOutlined fontSize="small" />
        ) : (
          <CloseOutlined color="primary" fontSize="small" />
        ),
        male: item.male ? (
          <CheckOutlined fontSize="small" />
        ) : (
          <CloseOutlined color="primary" fontSize="small" />
        ),
        female: item.female ? (
          <CheckOutlined fontSize="small" />
        ) : (
          <CloseOutlined color="primary" fontSize="small" />
        ),
        pharmacy: item.pharmacy ? (
          <CheckOutlined fontSize="small" />
        ) : (
          <CloseOutlined color="primary" fontSize="small" />
        ),
        email: item.email ?? "",
        telephone: item.telephone ?? "",
        fax: item.fax ?? "",
        visitDuration: item.visitDuration ?? "",
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
                {deleteWard.status === "FAIL" && (
                  <div ref={infoBoxRef} className="info-box-container">
                    <InfoBox type="error" message={deleteWard.error?.message} />
                  </div>
                )}
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
