import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { ReactNode, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import checkIcon from "../../../../../assets/check-icon.png";
import { VaccineDTO } from "../../../../../generated";
import { scrollToElement } from "../../../../../libraries/uiUtils/scrollToElement";
import { getVaccineTypes } from "../../../../../state/types/vaccines";
import { deleteVaccineReset, getVaccines } from "../../../../../state/vaccines";
import ConfirmationDialog from "../../../confirmationDialog/ConfirmationDialog";
import InfoBox from "../../../infoBox/InfoBox";
import { TFilterField } from "../../../table/filter/types";
import Table from "../../../table/Table";
import classes from "./VaccinesTable.module.scss";

interface IOwnProps {
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
  headerActions?: ReactNode;
}

export const VaccinesTable = ({
  onEdit,
  onDelete,
  headerActions,
}: IOwnProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getVaccines());
    dispatch(getVaccineTypes());
  }, [dispatch]);

  const infoBoxRef = useRef<HTMLDivElement>(null);

  const header = ["code", "type", "description"];

  const label = {
    code: t("vaccine.code"),
    type: t("vaccine.vaccinetype"),
    description: t("vaccine.description"),
  };

  const order = ["code", "type", "description"];

  const { data, status, error } = useAppSelector(
    (state) => state.vaccines.vaccineList
  );

  const { data: vaccineTypes } = useAppSelector(
    (state) => state.types.vaccines.getVaccineTypes
  );

  const deleteVaccine = useAppSelector((state) => state.vaccines.delete);

  const filters: TFilterField[] = [
    {
      key: "type",
      label: t("vaccine.vaccinetype"),
      type: "select",
      options:
        vaccineTypes?.map((vt) => ({
          label: vt.description,
          value: vt.description,
        })) ?? [],
    },
    { key: "description", label: t("vaccine.description"), type: "text" },
  ];

  const handleEdit = (row: VaccineDTO) => {
    onEdit((data ?? []).find((item) => item.code === row?.code));
  };

  const handleDelete = (row: VaccineDTO) => {
    onDelete(row);
  };

  useEffect(() => {
    if (deleteVaccine.status === "FAIL") {
      scrollToElement(infoBoxRef.current);
    }
  }, [deleteVaccine.status]);

  const formatDataToDisplay = (data: VaccineDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code ?? "",
        type: item.vaccineType?.description ?? "",
        description: item.description ?? "",
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
              <div style={{ minWidth: "100%" }}>
                <CircularProgress
                  style={{ marginLeft: "50%", position: "relative" }}
                />
              </div>
            );

          case "SUCCESS":
            return (
              <>
                {deleteVaccine.status === "FAIL" && (
                  <div ref={infoBoxRef} className="info-box-container">
                    <InfoBox
                      type="error"
                      message={deleteVaccine.error?.message}
                    />
                  </div>
                )}
                <Table
                  rowData={formatDataToDisplay(data ?? [])}
                  tableHeader={header}
                  labelData={label}
                  columnsOrder={order}
                  rowsPerPage={10}
                  isCollapsabile={false}
                  showEmptyCell={false}
                  filterColumns={filters}
                  manualFilter={false}
                  rowKey="code"
                  headerActions={headerActions}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
                <ConfirmationDialog
                  isOpen={!!deleteVaccine.hasSucceeded}
                  title={t("vaccine.deleted")}
                  icon={checkIcon}
                  info={t("vaccine.deleteSuccess")}
                  primaryButtonLabel="Ok"
                  handlePrimaryButtonClick={() => {
                    dispatch(deleteVaccineReset());
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
