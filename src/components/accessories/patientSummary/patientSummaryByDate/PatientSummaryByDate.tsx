import { CircularProgress } from "@material-ui/core";
import React, { FunctionComponent, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { loadSummaryData } from "../../../../state/summary/actions";
import { SummaryDataType } from "../../../../state/summary/types";
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
  loadSummaryData,
  isLoading,
}) => {
  const summaryData = useSelector<IState, Array<SummaryDataType>>((state) =>
    state.summary.summaryData.data
      ? state.summary.summaryData.data
      : new Array<SummaryDataType>()
  );
  const patient = useSelector((state: IState) => state.patients);

  useEffect(() => {
    if (patient.selectedPatient.data?.code)
      loadSummaryData(patient.selectedPatient.data.code);
  }, [patient]);

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
  isLoading: state.summary.summaryData.status === "LOADING",
  hasSucceeded: state.summary.summaryData.status === "SUCCESS",
  hasFailed: state.summary.summaryData.status === "FAIL",
});

const mapDispatchToProps: IDispatchProps = {
  loadSummaryData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientSummaryByDate);
