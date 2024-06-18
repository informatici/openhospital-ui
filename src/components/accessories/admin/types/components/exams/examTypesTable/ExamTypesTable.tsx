import React, { ReactNode, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ApiResponse } from "../../../../../../../state/types";
import { IState } from "../../../../../../../types";
import { ExamTypeDTO } from "../../../../../../../generated";
import InfoBox from "../../../../../infoBox/InfoBox";
import { CircularProgress } from "@material-ui/core";
import Table from "../../../../../table/Table";
import ConfirmationDialog from "../../../../../confirmationDialog/ConfirmationDialog";
import { deleteExamTypeReset } from "../../../../../../../state/types/exams/actions";
import checkIcon from "../../../../../../../assets/check-icon.png";
import "./styles.scss";

interface IOwnProps {
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
  headerActions?: ReactNode;
}

const ExamTypesTable = (props: IOwnProps) => {
  const { onDelete, onEdit, headerActions } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const header = ["code", "description"];

  const label = {
    code: t("examTypes.code"),
    description: t("examTypes.description"),
  };
  const order = ["code", "description"];

  const { data, status, error } = useSelector<
    IState,
    ApiResponse<ExamTypeDTO[]>
  >((state) => state.types.exams.getAll);

  const deleteExamType = useSelector<IState, ApiResponse<boolean>>(
    (state) => state.types.exams.delete
  );

  const handleEdit = (row: ExamTypeDTO) => {
    onEdit((data ?? []).find((item) => item.code === row?.code));
  };

  const handleDelete = (row: ExamTypeDTO) => {
    onDelete(row);
  };

  const formatDataToDisplay = (data: ExamTypeDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code,
        description: item.description,
      };
    });
  };

  return (
    <div className="examTypesTable">
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
                {deleteExamType.status === "FAIL" && (
                  <div ref={infoBoxRef} className="info-box-container">
                    <InfoBox
                      type="error"
                      message={deleteExamType.error?.message}
                    />
                  </div>
                )}
                <ConfirmationDialog
                  isOpen={!!deleteExamType.hasSucceeded}
                  title={t("examTypes.deleted")}
                  icon={checkIcon}
                  info={t("examTypes.deleteSuccess")}
                  primaryButtonLabel="Ok"
                  handlePrimaryButtonClick={() => {
                    dispatch(deleteExamTypeReset());
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

export default ExamTypesTable;
