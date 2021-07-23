import { CircularProgress } from "@material-ui/core";
import React, { FunctionComponent, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { dateComparator } from "../../../../libraries/sortUtils/sortUtils";
import { loadSummaryData } from "../../../../state/summary/actions";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { ORDER_BY_DATE_PAGE_SIZE } from "../consts";
import { IDispatchProps, IStateProps, TProps } from "./../types";

const header = ["date", "type"];
const order = ["date"];
const label = {
  date: "Date",
  type: "Typology",
  result: "Result",
  note: "Additional notes",
};

const PatientSummaryByDate: FunctionComponent<TProps> = ({
  loadSummaryData,
  isLoading,
  summaryData = [],
}) => {
  const patientCode = useSelector(
    (state: IState) => state.patients.selectedPatient.data?.code
  );

  useEffect(() => {
    if (patientCode) loadSummaryData(patientCode);
  }, [patientCode, loadSummaryData]);

  return (
    <>
      <div className="patientSummary_date">
        {!isLoading ? (
          <Table
            rowData={summaryData}
            compareRows={dateComparator}
            tableHeader={header}
            labelData={label}
            columnsOrder={order}
            rowsPerPage={ORDER_BY_DATE_PAGE_SIZE}
            isCollapsabile={true}
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
)(PatientSummaryByDate);
