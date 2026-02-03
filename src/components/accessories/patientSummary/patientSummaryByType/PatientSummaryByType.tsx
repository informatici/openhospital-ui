import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { renderSummary } from "../../../../libraries/reduxUtils/convert";
import { loadSummaryData } from "../../../../state/summary";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { ORDER_BY_TYPE_PAGE_SIZE } from "../consts";

import { SummaryType } from "../types";
import useSummaryMetaData from "../useSummaryMetaData";

const PatientSummaryByType = () => {
  const { t } = useTranslation();
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

  const filterByType = (type: string) => {
    return summaryData.filter((item) => item.type === type);
  };

  return (
    <>
      {!isLoading ? (
        <div className="patientSummary_type">
          {filterByType(SummaryType.OPD).length > 0 && (
            <div className="patientSummary_type_row">
              <h4>
                {t("summary.opd")}({filterByType(SummaryType.OPD).length})
              </h4>
              <Table
                rowData={renderSummary(
                  filterByType(SummaryType.OPD),
                  dateFields,
                  labels
                )}
                dateFields={dateFields}
                tableHeader={header.type.opd}
                labelData={labels}
                columnsOrder={order}
                rowsPerPage={ORDER_BY_TYPE_PAGE_SIZE}
                isCollapsabile={true}
                showEmptyCell={false}
                detailsExcludedFields={["date"]}
              />
            </div>
          )}

          {filterByType(SummaryType.ADMISSION).length > 0 && (
            <div className="patientSummary_type_row">
              <h4>
                {t("summary.admission")}(
                {filterByType(SummaryType.ADMISSION).length})
              </h4>
              <Table
                rowData={renderSummary(
                  filterByType(SummaryType.ADMISSION),
                  dateFields,
                  labels,
                  medicals
                )}
                dateFields={dateFields}
                tableHeader={header.type.admission}
                labelData={labels}
                columnsOrder={order}
                rowsPerPage={ORDER_BY_TYPE_PAGE_SIZE}
                isCollapsabile={true}
                showEmptyCell={false}
                detailsExcludedFields={["date"]}
              />
            </div>
          )}

          {filterByType(SummaryType.VISIT).length > 0 && (
            <div className="patientSummary_type_row">
              <h4>
                {t("summary.visits")}({filterByType(SummaryType.VISIT).length})
              </h4>
              <Table
                rowData={renderSummary(
                  filterByType(SummaryType.VISIT),
                  dateFields,
                  labels,
                  medicals
                )}
                dateFields={dateFields}
                tableHeader={header.type.visit}
                labelData={labels}
                columnsOrder={order}
                rowsPerPage={ORDER_BY_TYPE_PAGE_SIZE}
                isCollapsabile={true}
                showEmptyCell={false}
                detailsExcludedFields={["date"]}
              />
            </div>
          )}

          {filterByType(SummaryType.OPERATION).length > 0 && (
            <div className="patientSummary_type_row">
              <h4>
                {t("summary.operation")}(
                {filterByType(SummaryType.OPERATION).length})
              </h4>
              <Table
                rowData={renderSummary(
                  filterByType(SummaryType.OPERATION),
                  dateFields,
                  labels,
                  medicals
                )}
                dateFields={dateFields}
                tableHeader={header.type.operation}
                labelData={labels}
                columnsOrder={order}
                rowsPerPage={ORDER_BY_TYPE_PAGE_SIZE}
                isCollapsabile={true}
                showEmptyCell={false}
                detailsExcludedFields={["date"]}
              />
            </div>
          )}

          {filterByType(SummaryType.TRIAGE).length > 0 && (
            <div className="patientSummary_type_row">
              <h4>
                {t("summary.triage")}({filterByType(SummaryType.TRIAGE).length})
              </h4>
              <Table
                rowData={renderSummary(
                  filterByType(SummaryType.TRIAGE),
                  dateFields,
                  labels
                )}
                dateFields={dateFields}
                tableHeader={header.type.triage}
                labelData={labels}
                columnsOrder={order}
                rowsPerPage={ORDER_BY_TYPE_PAGE_SIZE}
                isCollapsabile={true}
                showEmptyCell={false}
                detailsExcludedFields={["date"]}
              />
            </div>
          )}

          {filterByType(SummaryType.EXAMS).length > 0 && (
            <div className="patientSummary_type_row">
              <h4>
                {t("summary.exams")}({filterByType(SummaryType.EXAMS).length})
              </h4>
              <Table
                rowData={renderSummary(
                  filterByType(SummaryType.EXAMS),
                  dateFields,
                  labels
                )}
                dateFields={dateFields}
                tableHeader={header.type.exam}
                labelData={labels}
                columnsOrder={order}
                rowsPerPage={ORDER_BY_TYPE_PAGE_SIZE}
                isCollapsabile={true}
                showEmptyCell={false}
                detailsExcludedFields={["date"]}
              />
            </div>
          )}

          {filterByType(SummaryType.THERAPY).length > 0 && (
            <div className="patientSummary_type_row">
              <h4>
                {t("summary.therapy")}(
                {filterByType(SummaryType.THERAPY).length})
              </h4>
              <Table
                rowData={renderSummary(
                  filterByType(SummaryType.THERAPY),
                  dateFields,
                  labels
                )}
                dateFields={dateFields}
                tableHeader={header.type.therapy}
                labelData={labels}
                columnsOrder={order}
                rowsPerPage={ORDER_BY_TYPE_PAGE_SIZE}
                isCollapsabile={true}
                showEmptyCell={false}
                detailsExcludedFields={["date"]}
              />
            </div>
          )}
        </div>
      ) : (
        <CircularProgress style={{ marginLeft: "50%", position: "relative" }} />
      )}
    </>
  );
};

export default PatientSummaryByType;
