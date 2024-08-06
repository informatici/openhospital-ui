import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { ReactNode, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import checkIcon from "../../../../../../../assets/check-icon.png";
import { MedicalTypeDTO } from "../../../../../../../generated";
import { scrollToElement } from "../../../../../../../libraries/uiUtils/scrollToElement";
import { deleteMedicalTypeReset } from "../../../../../../../state/types/medicals";
import ConfirmationDialog from "../../../../../confirmationDialog/ConfirmationDialog";
import InfoBox from "../../../../../infoBox/InfoBox";
import Table from "../../../../../table/Table";
import "./styles.scss";

interface IOwnProps {
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
  headerActions?: ReactNode;
}

const MedicalTypesTable = (props: IOwnProps) => {
  const { onDelete, onEdit, headerActions } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const header = ["code", "description"];

  const label = {
    code: t("medicalTypes.code"),
    description: t("medicalTypes.description"),
  };
  const order = ["code", "description"];

  const { data, status, error } = useAppSelector(
    (state) => state.types.medicals.getAll
  );

  const deleteMedicalType = useAppSelector(
    (state) => state.types.medicals.delete
  );

  const handleEdit = (row: MedicalTypeDTO) => {
    onEdit((data ?? []).find((item) => item.code === row?.code));
  };

  const handleDelete = (row: MedicalTypeDTO) => {
    onDelete(row);
  };

  useEffect(() => {
    if (deleteMedicalType.status === "FAIL") {
      scrollToElement(infoBoxRef.current);
    }
  }, [deleteMedicalType.status]);

  const formatDataToDisplay = (data: MedicalTypeDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code,
        description: item.description,
      };
    });
  };

  return (
    <div className="medicalTypesTable">
      {(() => {
        switch (status) {
          case "FAIL":
            return (
              <div className="fullWidth">
                <InfoBox
                  type="error"
                  message={error?.error || error?.message}
                />
              </div>
            );
          case "LOADING":
            return <CircularProgress className="loader" />;

          case "SUCCESS":
            return (
              <>
                {deleteMedicalType.status === "FAIL" && (
                  <div ref={infoBoxRef} className="info-box-container">
                    <InfoBox
                      type="error"
                      message={deleteMedicalType.error?.message}
                    />
                  </div>
                )}
                <Table
                  rowData={formatDataToDisplay(data ?? [])}
                  tableHeader={header}
                  labelData={label}
                  columnsOrder={order}
                  rowsPerPage={20}
                  isCollapsabile={false}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  showEmptyCell={false}
                  rawData={data}
                  manualFilter={false}
                  rowKey="code"
                  headerActions={headerActions}
                />
                <ConfirmationDialog
                  isOpen={!!deleteMedicalType.hasSucceeded}
                  title={t("medicalTypes.deleted")}
                  icon={checkIcon}
                  info={t("medicalTypes.deleteSuccess")}
                  primaryButtonLabel="Ok"
                  handlePrimaryButtonClick={() => {
                    dispatch(deleteMedicalTypeReset());
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

export default MedicalTypesTable;
