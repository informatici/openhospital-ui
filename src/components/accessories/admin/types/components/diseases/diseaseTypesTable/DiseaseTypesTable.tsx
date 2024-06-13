import React, { ReactNode, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ApiResponse } from "../../../../../../../state/types";
import { IState } from "../../../../../../../types";
import { DiseaseTypeDTO } from "../../../../../../../generated";
import InfoBox from "../../../../../infoBox/InfoBox";
import { CircularProgress } from "@material-ui/core";
import Table from "../../../../../table/Table";
import ConfirmationDialog from "../../../../../confirmationDialog/ConfirmationDialog";
import { deleteDiseaseTypeReset } from "../../../../../../../state/types/diseases/actions";
import checkIcon from "../../../../../../../assets/check-icon.png";
import "./styles.scss";

interface IOwnProps {
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
  headerActions?: ReactNode;
}

const DiseaseTypesTable = (props: IOwnProps) => {
  const { onDelete, onEdit, headerActions } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const header = ["code", "description"];

  const label = {
    code: t("diseaseTypes.code"),
    description: t("diseaseTypes.description"),
  };
  const order = ["code", "description"];

  const { data, status, error } = useSelector<
    IState,
    ApiResponse<DiseaseTypeDTO[]>
  >((state) => state.types.diseases.getAll);

  const deleteDiseaseType = useSelector<IState, ApiResponse<boolean>>(
    (state) => state.types.diseases.delete
  );

  const handleEdit = (row: DiseaseTypeDTO) => {
    onEdit((data ?? []).find((item) => item.code === row?.code));
  };

  const handleDelete = (row: DiseaseTypeDTO) => {
    onDelete(row);
  };

  const formatDataToDisplay = (data: DiseaseTypeDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code,
        description: item.description,
      };
    });
  };

  return (
    <div className="diseaseTypesTable">
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
                {deleteDiseaseType.status === "FAIL" && (
                  <div ref={infoBoxRef} className="info-box-container">
                    <InfoBox
                      type="error"
                      message={deleteDiseaseType.error?.message}
                    />
                  </div>
                )}
                <ConfirmationDialog
                  isOpen={!!deleteDiseaseType.hasSucceeded}
                  title={t("diseaseTypes.deleted")}
                  icon={checkIcon}
                  info={t("diseaseTypes.deleteSuccess")}
                  primaryButtonLabel="Ok"
                  handlePrimaryButtonClick={() => {
                    dispatch(deleteDiseaseTypeReset());
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

export default DiseaseTypesTable;
