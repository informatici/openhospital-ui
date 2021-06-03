import React, { FunctionComponent, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { IPatientsState } from "../../../../state/patients/types";
import { loadSummaryData } from "../../../../state/summary/actions";
import { ISummaryState } from "../../../../state/summary/types";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import {
  IDispatchProps,
  IStateProps,
  SummaryTransitionState,
  TProps,
} from "./../types";

const data = [
  {
    date: "21/12/2021",
    type: "Pharmacologic treatment",
    result: "Result (1)",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    date: "21/12/2021",
    type: "Pharmacologic treatment",
    result: "Result (1)",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    date: "21/12/2020",
    type: "Pharmacologic treatment",
    result: "Result (1)",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    date: "21/12/2020",
    type: "Pharmacologic treatment",
    result: "Result (1)",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    date: "21/12/2020",
    type: "Pharmacologic treatment",
    result: "Result (1)",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    date: "21/12/2020",
    type: "Pharmacologic treatment",
    result: "Result (1)",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    date: "21/12/2021",
    type: "Pharmacologic treatment",
    result: "Result (1)",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    date: "21/12/2018",
    type: "Pharmacologic treatment",
    result: "Result (1)",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    date: "21/12/2019",
    type: "Pharmacologic treatment",
    result: "Result (1)",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    date: "21/12/2019",
    type: "Pharmacologic treatment",
    result: "Result (1)",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    date: "21/12/2019",
    type: "Pharmacologic treatment",
    result: "Result (1)",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const header = ["date", "type", "result"];
const order = ["date"];
const label = {
  date: "Date",
  type: "Typology",
  result: "Result",
  note: "Additional notes",
};

const PatientSummaryByDate: FunctionComponent<TProps> = ({
  isLoading,
  hasSucceeded,
  hasFailed,
  loadSummaryData,
}) => {
  const [summaryData, setSummaryData] = useState(data);
  const summary = useSelector<IState, ISummaryState>((state) => state.summary);
  const patient = useSelector<IState, IPatientsState>(
    (state) => state.patients
  );
  useEffect(() => {
    if (
      patient.selectedPatient.data &&
      summary.loadSummaryData.status === "IDLE"
    )
      loadSummaryData(patient.selectedPatient.data?.code!);
    if (hasSucceeded) setSummaryData(summary.loadSummaryData.data!);
  }, [summary, patient]);

  return (
    <div className="patientSummary_date">
      <Table
        rowData={summaryData}
        tableHeader={header}
        labelData={label}
        columnsOrder={order}
        rowsPerPage={10}
        isCollapsabile={true}
      />
    </div>
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
