import React, { useEffect } from "react";
import Table from "../../../table/Table";
import { useTranslation } from "react-i18next";
import InfoBox from "../../../infoBox/InfoBox";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getExams } from "../../../../../state/exams/actions";
import { IState } from "../../../../../types";
import { ExamDTO } from "../../../../../generated";
import { IApiResponse } from "../../../../../state/types";
import classes from "./ExamsTable.module.scss";

export const ExamsTable = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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

  const { data, status, error } = useSelector<IState, IApiResponse<ExamDTO[]>>(
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
