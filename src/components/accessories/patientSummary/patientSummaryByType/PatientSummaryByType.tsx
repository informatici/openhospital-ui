import { CircularProgress } from "@material-ui/core";
import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect, useSelector } from "react-redux";
import { loadSummaryData } from "../../../../state/summary/actions";
import { SummaryDataType } from "../../../../state/summary/types";
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
  loadSummaryData,
  isLoading,
}) => {
  const { t } = useTranslation();
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

  const filterByType = (type: string) => {
    return summaryData.filter((item) => item.type === type)
      ? summaryData.filter((item) => item.type === type)
      : Array<SummaryDataType>();
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
)(PatientSummaryByType);
