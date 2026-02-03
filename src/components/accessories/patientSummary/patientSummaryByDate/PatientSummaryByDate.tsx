import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { renderSummary } from "../../../../libraries/reduxUtils/convert";
import { loadSummaryData } from "../../../../state/summary";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { ORDER_BY_DATE_PAGE_SIZE } from "../consts";
import useSummaryMetaData from "../useSummaryMetaData";

const PatientSummaryByDate = () => {
  const dispatch = useAppDispatch();
  const { labels, dateFields, header, order } = useSummaryMetaData();
  const patientCode = useAppSelector(
    (state: IState) => state.patients.selectedPatient.data?.code
  );

  const { isLoading, summaryData } = useAppSelector((state) => ({
    isLoading: state.summary.summaryApisCall.status === "LOADING",
    hasSucceeded: state.summary.summaryApisCall.status === "SUCCESS",
    hasFailed: state.summary.summaryApisCall.status === "FAIL",
    summaryData: state.summary.summaryApisCall.data ?? [],
  }));

  useEffect(() => {
    if (patientCode) dispatch(loadSummaryData(patientCode));
  }, [patientCode, dispatch]);

  const medicals = useAppSelector((state) =>
    state.medicals.medicalsOrderByName.data
      ? state.medicals.medicalsOrderByName.data
      : []
  );

  return (
    <>
      <div className="patientSummary_date">
        {!isLoading ? (
          <Table
            rowData={renderSummary(summaryData, dateFields, labels, medicals)}
            dateFields={dateFields}
            tableHeader={header.date}
            labelData={labels}
            columnsOrder={order}
            rowsPerPage={ORDER_BY_DATE_PAGE_SIZE}
            isCollapsabile={true}
            showEmptyCell={false}
            detailsExcludedFields={["date"]}
          />
        ) : (
          <CircularProgress
            style={{ marginLeft: "50%", position: "relative" }}
          />
        )}
      </div>
    </>
  );
};

export default PatientSummaryByDate;
