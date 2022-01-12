import { CircularProgress } from "@material-ui/core";
import React, { FunctionComponent, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { MedicalDTO } from "../../../../generated";
import { renderSummary } from "../../../../libraries/reduxUtils/convert";
import { dateComparator } from "../../../../libraries/sortUtils/sortUtils";
import { loadSummaryData } from "../../../../state/summary/actions";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { ORDER_BY_DATE_PAGE_SIZE } from "../consts";
import useSummaryMetaData from "../useSummaryMetaData";
import { IDispatchProps, IStateProps, TProps } from "./../types";

const PatientSummaryByDate: FunctionComponent<TProps> = ({
  loadSummaryData,
  isLoading,
  summaryData = [],
}) => {
  const { labels, dateFields, header, order } = useSummaryMetaData();
  const patientCode = useSelector(
    (state: IState) => state.patients.selectedPatient.data?.code
  );

  useEffect(() => {
    if (patientCode) loadSummaryData(patientCode);
  }, [patientCode, loadSummaryData]);

  const medicals = useSelector<IState, MedicalDTO[]>((state) =>
    state.medicals.getMedicals.data
      ? state.medicals.getMedicals.data
      : []
  );

  return (
    <>
      <div className="patientSummary_date">
        {!isLoading ? (
          <Table
            rowData={renderSummary(summaryData, dateFields, labels, medicals)}
            compareRows={dateComparator}
            tableHeader={header}
            labelData={labels}
            columnsOrder={order}
            rowsPerPage={ORDER_BY_DATE_PAGE_SIZE}
            isCollapsabile={true}
            showEmptyCell={false}
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
