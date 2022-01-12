import { CircularProgress } from "@material-ui/core";
import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect, useSelector } from "react-redux";
import { MedicalDTO } from "../../../../generated";
import { renderSummary } from "../../../../libraries/reduxUtils/convert";
import { dateComparator } from "../../../../libraries/sortUtils/sortUtils";
import { loadSummaryData } from "../../../../state/summary/actions";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { ORDER_BY_TYPE_PAGE_SIZE } from "../consts";

import { IDispatchProps, IStateProps, SummaryType, TProps } from "../types";
import useSummaryMetaData from "../useSummaryMetaData";

const PatientSummaryByType: FunctionComponent<TProps> = ({
  loadSummaryData,
  isLoading,
  summaryData = [],
}) => {
  const { t } = useTranslation();
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

  const filterByType = (type: string) => {
    return summaryData.filter((item) => item.type === type);
  };

  return (
    <>
      {!isLoading ? (
        <div className="patientSummary_type">
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
              compareRows={dateComparator}
              tableHeader={header}
              labelData={labels}
              columnsOrder={order}
              rowsPerPage={ORDER_BY_TYPE_PAGE_SIZE}
              isCollapsabile={true}
              showEmptyCell={false}
            />
          </div>

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
              compareRows={dateComparator}
              tableHeader={header}
              labelData={labels}
              columnsOrder={order}
              rowsPerPage={ORDER_BY_TYPE_PAGE_SIZE}
              isCollapsabile={true}
              showEmptyCell={false}
            />
          </div>

          <div className="patientSummary_type_row">
            <h4>
              {t("summary.therapy")}({filterByType(SummaryType.THERAPY).length})
            </h4>
            <Table
              rowData={renderSummary(
                filterByType(SummaryType.THERAPY),
                dateFields,
                labels,
                medicals
              )}
              compareRows={dateComparator}
              tableHeader={header}
              labelData={labels}
              columnsOrder={order}
              rowsPerPage={ORDER_BY_TYPE_PAGE_SIZE}
              isCollapsabile={true}
              showEmptyCell={false}
            />
          </div>

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
              compareRows={dateComparator}
              tableHeader={header}
              labelData={labels}
              columnsOrder={order}
              rowsPerPage={ORDER_BY_TYPE_PAGE_SIZE}
              isCollapsabile={true}
              showEmptyCell={false}
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
