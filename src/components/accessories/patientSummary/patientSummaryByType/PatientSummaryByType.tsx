import { CircularProgress } from "@material-ui/core";
import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect, useSelector } from "react-redux";
import { dateComparator } from "../../../../libraries/sortUtils/sortUtils";
import { loadSummaryData } from "../../../../state/summary/actions";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { ORDER_BY_TYPE_PAGE_SIZE } from "../consts";

import { IDispatchProps, IStateProps, SummaryType, TProps } from "../types";

const header = ["date"];
const order = ["date"];
const label = {
  date: "Date",
  type: "Typology",
  result: "Result",
  note: "Additional notes",
};

const PatientSummaryByType: FunctionComponent<TProps> = ({
  loadSummaryData,
  isLoading,
  summaryData = [],
}) => {
  const { t } = useTranslation();

  const patientCode = useSelector(
    (state: IState) => state.patients.selectedPatient.data?.code
  );

  useEffect(() => {
    if (patientCode) loadSummaryData(patientCode);
  }, [patientCode, loadSummaryData]);

  const filterByType = (type: string) => {
    return summaryData.filter((item) => item.type === type);
  };
  return (
    <>
      {!isLoading ? (
        <div className="patientSummary_type">
          <div className="patientSummary_type_row">
            <h4>
              {t("summary.visits")}({filterByType(SummaryType.VISIT).length})
            </h4>
            <Table
              rowData={filterByType(SummaryType.VISIT)}
              compareRows={dateComparator}
              tableHeader={header}
              labelData={label}
              columnsOrder={order}
              rowsPerPage={ORDER_BY_TYPE_PAGE_SIZE}
              isCollapsabile={true}
            />
          </div>

          <div className="patientSummary_type_row">
            <h4>
              {t("summary.triage")}({filterByType(SummaryType.TRIAGE).length})
            </h4>
            <Table
              rowData={filterByType(SummaryType.TRIAGE)}
              compareRows={dateComparator}
              tableHeader={header}
              labelData={label}
              columnsOrder={order}
              rowsPerPage={ORDER_BY_TYPE_PAGE_SIZE}
              isCollapsabile={true}
            />
          </div>

          <div className="patientSummary_type_row">
            <h4>
              {t("summary.therapy")}({filterByType(SummaryType.THERAPY).length})
            </h4>
            <Table
              rowData={filterByType(SummaryType.THERAPY)}
              compareRows={dateComparator}
              tableHeader={header}
              labelData={label}
              columnsOrder={order}
              rowsPerPage={ORDER_BY_TYPE_PAGE_SIZE}
              isCollapsabile={true}
            />
          </div>

          <div className="patientSummary_type_row">
            <h4>
              {t("summary.opd")}({filterByType(SummaryType.OPD).length})
            </h4>
            <Table
              rowData={filterByType(SummaryType.OPD)}
              compareRows={dateComparator}
              tableHeader={header}
              labelData={label}
              columnsOrder={order}
              rowsPerPage={ORDER_BY_TYPE_PAGE_SIZE}
              isCollapsabile={true}
            />
          </div>
        </div>
      ) : (
        <CircularProgress style={{ marginLeft: "50%", position: "relative" }} />
      )}
    </>
  );
};

const mapStateToProps = (state: IState): IStateProps => ({
  isLoading: state.summary.summaryApisCall.status === "LOADING",
  hasSucceeded: state.summary.summaryApisCall.status === "SUCCESS",
  hasFailed: state.summary.summaryApisCall.status === "FAIL",
  summaryData: state.summary.summaryApisCall.data,
});

const mapDispatchToProps: IDispatchProps = {
  loadSummaryData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientSummaryByType);
