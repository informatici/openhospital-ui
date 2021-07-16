import { CircularProgress } from "@material-ui/core";
import moment from "moment";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { PatientExaminationDTO } from "../../../../generated";
import { examinationsByPatientId } from "../../../../state/examinations/actions";
import { IState } from "../../../../types";
import Table from "../../table/Table";
interface IOwnProps {
  shouldUpdateTable: boolean;
}

const PatientTriageTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
}) => {
  const { t } = useTranslation();

  const label = {
    pex_date: t("examination.datetriage"),
    pex_height: t("examination.height"),
    pex_weight: t("examination.weight"),
    pex_pa_max: t("examination.pa.max"),
    pex_pa_min: t("examination.pa.min"),
    pex_fc: t("examination.heartrate"),
    pex_temp: t("examination.temperature"),
    pex_sat: t("examination.saturation"),
    pex_note: t("examination.note"),
  };
  const header = ["pex_date"];
  const order = ["pex_date"];

  const dispatch = useDispatch();
  const data = useSelector<IState, PatientExaminationDTO[]>((state) =>
    state.examinations.examinationsByPatientId.data
      ? state.examinations.examinationsByPatientId.data
      : []
  );

  const patientCode = useSelector<IState, number | undefined>(
    (state) => state.patients.selectedPatient.data?.code
  );
  useEffect(() => {
    dispatch(examinationsByPatientId(patientCode));
  }, [dispatch, patientCode, shouldUpdateTable]);

  const formatDataToDisplay = (data: PatientExaminationDTO[]) => {
    return data.map((item) => {
      return {
        pex_height: item.pex_height,
        pex_weight: item.pex_weight,
        pex_pa_max: item.pex_pa_max,
        pex_pa_min: item.pex_pa_min,
        pex_fc: item.pex_fc,
        pex_temp: item.pex_temp,
        pex_sat: item.pex_sat,
        pex_note: item.pex_note,
        pex_date: item.pex_date
          ? moment(item.pex_date).format("DD/MM/YYYY")
          : "",
      };
    });
  };
  const isLoading = useSelector<IState, boolean>(
    (state) => state.examinations.examinationsByPatientId.status === "LOADING"
  );

  const onDelete = () => {
    console.log("delete");
  };

  return (
    <>
      <div className="patientTriageTable">
        {!isLoading ? (
          <Table
            rowData={formatDataToDisplay(data)}
            tableHeader={header}
            labelData={label}
            columnsOrder={order}
            rowsPerPage={5}
            onDelete={onDelete}
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

export default PatientTriageTable;
