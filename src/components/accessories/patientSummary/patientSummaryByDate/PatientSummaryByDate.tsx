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
import { ORDER_BY_DATE_PAGE_SIZE } from "../consts";
import { IDispatchProps, IStateProps, TProps } from "./../types";

const PatientSummaryByDate: FunctionComponent<TProps> = ({
  loadSummaryData,
  isLoading,
  summaryData = [],
}) => {
  const { t } = useTranslation();
  const header = ["date"];
  const order = ["date"];
  const labels: any = {
    date: t("common.date"),
    type: t("common.type"),
    startDate: t("therapy.startDate"),
    endDate: t("therapy.endDate"),
    qty: t("therapy.quantity"),
    freqInDay: t("therapy.frequencyInDay"),
    freqInPeriod: t("therapy.frequencyInPeriod"),
    note: t("therapy.note"),
    medicalId: t("therapy.medical"),
    disease: t("opd.disease1"),
    disease2: t("opd.disease2"),
    disease3: t("opd.disease3"),
    pex_height: t("examination.height"),
    pex_weight: t("examination.weight"),
    pex_pa_max: t("examination.ap.max"),
    pex_pa_min: t("examination.ap.min"),
    pex_fc: t("examination.heartrate"),
    pex_temp: t("examination.temperature"),
    pex_sat: t("examination.saturation"),
    pex_note: t("examination.note"),
    exam: t("lab.exam"),
    material: t("lab.material"),
    result: t("lab.result"),
  };
  const dateFields = ["date", "startDate", "endDate"];

  const patientCode = useSelector(
    (state: IState) => state.patients.selectedPatient.data?.code
  );

  useEffect(() => {
    if (patientCode) loadSummaryData(patientCode);
  }, [patientCode, loadSummaryData]);

  const medicals = useSelector<IState, MedicalDTO[]>((state) =>
    state.medicals.medicalsOrderByName.data
      ? state.medicals.medicalsOrderByName.data
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
