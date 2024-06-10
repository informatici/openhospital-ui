import React, { useEffect } from "react";
import Table from "../../../table/Table";
import { TFilterField } from "../../../table/filter/types";
import { useTranslation } from "react-i18next";
import InfoBox from "../../../infoBox/InfoBox";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getExams } from "../../../../../state/exams/actions";
import { IState } from "../../../../../types";
import { ExamDTO, ExamTypeDTO } from "../../../../../generated";
import { ApiResponse } from "../../../../../state/types";
import classes from "./ExamsTable.module.scss";
import { getExamTypes } from "../../../../../state/examTypes/actions";

export const ExamsTable = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getExams());
    dispatch(getExamTypes());
  }, [dispatch]);

  const examTypesOptions = useSelector<
    IState,
    { label: string; value: string }[]
  >(
    (state) =>
      state.examTypes.getExamTypes.data?.map((item: ExamTypeDTO) => ({
        value: item.code ?? "",
        label: item.description ?? item.code ?? "",
      })) ?? []
  );

  const header = ["code", "type", "description", "procedure", "defaultResult"];

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
  const order = ["code", "type", "description", "procedure", "defaultResult"];

  const { data, status, error } = useSelector<IState, ApiResponse<ExamDTO[]>>(
    (state) => state.exams.examList
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
              <Table
                rowData={formatDataToDisplay(data ?? [])}
                tableHeader={header}
                labelData={label}
                columnsOrder={order}
                rowsPerPage={10}
                isCollapsabile={false}
                filterColumns={filters}
                rawData={(data ?? []).map((exam) => ({
                  ...exam,
                  type: exam.examtype?.code,
                }))}
                manualFilter={false}
                rowKey="code"
              />
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
