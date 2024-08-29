import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { ReactNode, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import checkIcon from "../../../../../../../assets/check-icon.png";
import { PregnantTreatmentTypeDTO } from "../../../../../../../generated";
import { scrollToElement } from "../../../../../../../libraries/uiUtils/scrollToElement";
import { deletePregnantTreatmentTypeReset } from "../../../../../../../state/types/pregnantTreatment";
import ConfirmationDialog from "../../../../../confirmationDialog/ConfirmationDialog";
import InfoBox from "../../../../../infoBox/InfoBox";
import Table from "../../../../../table/Table";
import "./styles.scss";

interface IOwnProps {
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
  headerActions?: ReactNode;
}

const PregnantTreatmentTableType = (props: IOwnProps) => {
  const { onDelete, onEdit, headerActions } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const header = ["code", "description"];

  const label = {
    code: t("pregnantTreatmentTypes.code"),
    description: t("pregnantTreatmentTypes.description"),
  };
  const order = ["code", "description"];

  const { data, status, error } = useAppSelector(
    (state) => state.types.pregnantTreatment.getAll
  );

  const deleteDiseaseType = useAppSelector(
    (state) => state.types.pregnantTreatment.delete
  );

  const handleEdit = (row: PregnantTreatmentTypeDTO) => {
    onEdit((data ?? []).find((item) => item.code === row?.code));
  };

  const handleDelete = (row: PregnantTreatmentTypeDTO) => {
    onDelete(row);
  };

  useEffect(() => {
    if (deleteDiseaseType.status === "FAIL") {
      scrollToElement(infoBoxRef.current);
    }
  }, [deleteDiseaseType.status]);

  const formatDataToDisplay = (data: PregnantTreatmentTypeDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code,
        description: item.description,
      };
    });
  };

  return (
    <div className="pregnantTreatmentTypesTable">
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
                {deleteDiseaseType.status === "FAIL" && (
                  <div ref={infoBoxRef} className="info-box-container">
                    <InfoBox
                      type="error"
                      message={deleteDiseaseType.error?.message}
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
                  isOpen={!!deleteDiseaseType.hasSucceeded}
                  title={t("pregnantTreatmentTypes.deleted")}
                  icon={checkIcon}
                  info={t("pregnantTreatmentTypes.deleteSuccess")}
                  primaryButtonLabel="Ok"
                  handlePrimaryButtonClick={() => {
                    dispatch(deletePregnantTreatmentTypeReset());
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

export default PregnantTreatmentTableType;
