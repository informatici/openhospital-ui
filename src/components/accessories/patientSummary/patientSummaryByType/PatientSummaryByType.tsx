import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect, useSelector } from "react-redux";
import { loadSummaryData } from "../../../../state/summary/actions";
import { ISummaryState, SummaryData } from "../../../../state/summary/types";
import { IState } from "../../../../types";
import Table from "../../table/Table";

import { IDispatchProps, IStateProps, TProps } from "../types";

const header = ["date", "type", "result"];
const order = ["date"];
const label = {
  date: "Date",
  type: "Typology",
  result: "Result",
  note: "Additional notes",
};

const PatientSummaryByType: FunctionComponent<TProps> = ({
  isLoading,
  hasSucceeded,
  hasFailed,
  loadSummaryData,
}) => {
  const { t } = useTranslation();
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
    <div className="patientSummary_type">
      <div className="patientSummary_type_row">
        <h4>
          {t("summary.visits")}(
          {summaryData
            ? summaryData.filter((item) => item.type === "visit").length
            : 0}
          )
        </h4>
        <Table
          rowData={
            summaryData
              ? summaryData.filter((item) => item.type === "visit")
              : []
          }
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={3}
          isCollapsabile={true}
        />
      </div>

      <div className="patientSummary_type_row">
        <h4>
          {t("summary.triage")}(
          {summaryData
            ? summaryData.filter((item) => item.type === "triage").length
            : 0}
          )
        </h4>
        <Table
          rowData={
            summaryData
              ? summaryData.filter((item) => item.type === "triage")
              : []
          }
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={3}
          isCollapsabile={true}
        />
      </div>

      <div className="patientSummary_type_row">
        <h4>
          {t("summary.therapy")}(
          {summaryData
            ? summaryData.filter((item) => item.type === "therapy").length
            : 0}
          )
        </h4>
        <Table
          rowData={
            summaryData
              ? summaryData.filter((item) => item.type === "therapy")
              : []
          }
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={3}
          isCollapsabile={true}
        />
      </div>

      <div className="patientSummary_type_row">
        <h4>
          {t("summary.opd")}(
          {summaryData
            ? summaryData.filter((item) => item.type === "opd").length
            : 0}
          )
        </h4>
        <Table
          rowData={
            summaryData ? summaryData.filter((item) => item.type === "opd") : []
          }
          tableHeader={header}
          labelData={label}
          columnsOrder={order}
          rowsPerPage={3}
          isCollapsabile={true}
        />
      </div>
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
)(PatientSummaryByType);
