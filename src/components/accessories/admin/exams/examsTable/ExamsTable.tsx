import React, { useEffect, ReactNode,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@material-ui/core";

import { TFilterField } from "../../../table/filter/types";
import { getExams } from "../../../../../state/exams/actions";
import { getExamTypes } from "../../../../../state/types/exams";
import { IState } from "../../../../../types";
import { ExamDTO, ExamTypeDTO } from "../../../../../generated";
import { ApiResponse } from "../../../../../state/types";
import { deleteExamReset } from "../../../../../state/exams/actions";
import { ExamProps } from "../types";

import InfoBox from "../../../infoBox/InfoBox";
import Table from "../../../table/Table";
import ConfirmationDialog from "../../../confirmationDialog/ConfirmationDialog";
import checkIcon from "../../../../../assets/check-icon.png";
import classes from "./ExamsTable.module.scss";

interface IOwnProps {
  onDelete: (row: ExamDTO) => void;
  onEdit: (row: ExamDTO) => void;
  headerActions: ReactNode;
}

export const ExamsTable = ({ onDelete, onEdit, headerActions }: IOwnProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getExams());
    dispatch(getExamTypes());
  }, [dispatch]);

  const header: Array<ExamProps> = [
    "code",
    "type",
    "description",
    "procedure",
    "defaultResult",
  ];
  const examTypesOptions = useSelector<
    IState,
    { label: string; value: string }[]
  >(
    (state) =>
      state.types.exams.getAll.data?.map((item: ExamTypeDTO) => ({
        value: item.code ?? "",
        label: item.description ?? item.code ?? "",
      })) ?? []
  );


  const filters: TFilterField[] = [
    {
      key: "type",
      label: t("exam.examtype"),
      type: "select",
      options: examTypesOptions,
    },
    { key: "description", label: t("exam.description"), type: "text" },
    { key: "defaultResult", label: t("exam.defaultResult"), type: "text" },
  ];

  const label = {
    code: t("exam.code"),
    type: t("exam.examtype"),
    description: t("exam.description"),
    procedure: t("exam.procedure"),
    defaultResult: t("exam.defaultResult"),
  };
  const order: Array<ExamProps> = [
    "code",
    "type",
    "description",
    "procedure",
    "defaultResult",
  ];

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

  const handleEdit = (row: ExamDTO) => {
    const examDTO = (data ?? []).find((item) => item.code === row?.code) as ExamDTO
    onEdit(examDTO);
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
                  onEdit={handleEdit}
                  onDelete={onDelete}
                  headerActions={headerActions}
                  filterColumns={filters}
                  rawData={(data ?? []).map((exam) => ({
                    ...exam,
                    type: exam.examtype?.description ?? exam.examtype?.code,
                  }))}
                  manualFilter={false}
                  rowKey="code"
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
