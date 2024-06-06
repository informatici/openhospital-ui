import React, { useEffect, useRef } from "react";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { getExams } from "../../../../../state/exams/actions";
import { IState } from "../../../../../types";
import { ExamDTO } from "../../../../../generated";
import { ApiResponse } from "../../../../../state/types";
import { deleteExamReset } from "../../../../../state/exams/actions";

import InfoBox from "../../../infoBox/InfoBox";
import Table from "../../../table/Table";
import ConfirmationDialog from "../../../confirmationDialog/ConfirmationDialog";
import checkIcon from "../../../../../assets/check-icon.png";
import classes from "./ExamsTable.module.scss";

interface IOwnProps {
  onDelete: (row: ExamDTO) => void;
}

export const ExamsTable = ({ onDelete }: IOwnProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getExams());
  }, [dispatch]);

  const header = ["code", "type", "description", "procedure", "defaultResult"];

  const label = {
    code: t("exam.code"),
    type: t("exam.examtype"),
    description: t("exam.description"),
    procedure: t("exam.procedure"),
    defaultResult: t("exam.defaultResult"),
  };
  const order = ["code", "type", "description", "procedure", "defaultResult"];

  const { data, status, error } = useSelector<IState, ApiResponse<ExamDTO[]>>(
    (state) => state.exams.examList
  );

  const deleteExam = useSelector<IState, ApiResponse<boolean>>(
    (state) => state.exams.examDelete
  );

  const formatDataToDisplay = (data: ExamDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code ?? "",
        type: item.examtype?.description ?? "",
        description: item.description ?? "",
        procedure: item.procedure ?? "",
        defaultResult: item.defaultResult ?? "",
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
                  rowsPerPage={10}
                  isCollapsabile={false}
                  onDelete={onDelete}
                />
                {deleteExam.status === "FAIL" && (
                  <div ref={infoBoxRef} className="info-box-container">
                    <InfoBox
                      type="error"
                      message={deleteExam.error?.message || "unknown error"}
                    />
                  </div>
                )}
                <ConfirmationDialog
                  isOpen={deleteExam.status === "SUCCESS"}
                  title={t("operation.deleted")}
                  icon={checkIcon}
                  info={t("operation.deleteSuccess")}
                  primaryButtonLabel="Ok"
                  handlePrimaryButtonClick={() => {
                    dispatch(deleteExamReset());
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
