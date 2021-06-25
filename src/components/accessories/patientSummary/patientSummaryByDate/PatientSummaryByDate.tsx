import { CircularProgress } from "@material-ui/core";
import React, { FunctionComponent, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { loadSummaryData } from "../../../../state/summary/actions";
import { ISummaryState, SummaryData } from "../../../../state/summary/types";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { ORDER_BY_DATE_PAGE_SIZE } from "../consts";
import { IDispatchProps, IStateProps, TProps } from "./../types";

const header = ["date", "type"];
const order = ["date"];
const label = {
  date: "Date",
  type: "Typology",
};

const PatientSummaryByDate: FunctionComponent<TProps> = ({
  hasSucceeded,
  loadSummaryData,
  isLoading,
}) => {
  const [summaryData, setSummaryData] = useState(Array<SummaryData>());
  const summary = useSelector<IState, ISummaryState>((state) => state.summary);
  const patient = useSelector((state: IState) => state.patients);

  useEffect(() => {
    loadSummaryData(patient.selectedPatient?.data?.code!);
  }, [patient]);

  useEffect(() => {
    if (hasSucceeded) {
      setSummaryData(summary.loadSummaryData.data!);
    }
  }, [summary]);

  return (
    <>
      <div className="patientSummary_date">
        {!isLoading ? (
          <Table
            rowData={summaryData}
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
  isLoading: state.summary.loadSummaryData.status === "LOADING",
  hasSucceeded: state.summary.loadSummaryData.status === "SUCCESS",
  hasFailed: state.summary.loadSummaryData.status === "FAIL",
});

const mapDispatchToProps: IDispatchProps = {
  loadSummaryData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientSummaryByDate);
