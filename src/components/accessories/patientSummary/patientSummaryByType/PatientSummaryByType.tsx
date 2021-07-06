import { CircularProgress } from "@material-ui/core";
import { CenterFocusStrong } from "@material-ui/icons";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect, useSelector } from "react-redux";
import { loadSummaryData } from "../../../../state/summary/actions";
import { ISummaryState, SummaryData } from "../../../../state/summary/types";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { ORDER_BY_TYPE_PAGE_SIZE } from "../consts";

import { IDispatchProps, IStateProps, SummaryType, TProps } from "../types";

const header = ["date", "type", "result"];
const order = ["date"];
const label = {
  date: "Date",
  type: "Typology",
  result: "Result",
  note: "Additional notes",
};

const PatientSummaryByType: FunctionComponent<TProps> = ({
  hasSucceeded,
  loadSummaryData,
  isLoading,
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
