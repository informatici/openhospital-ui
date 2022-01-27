import { CircularProgress } from "@material-ui/core";
import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { date } from "yup";
import { PatientExaminationDTO } from "../../../../generated";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";
import { dateComparator } from "../../../../libraries/sortUtils/sortUtils";
import { examinationsByPatientId } from "../../../../state/examinations/actions";
import { IState } from "../../../../types";
import InfoBox from "../../infoBox/InfoBox";
import Table from "../../table/Table";
interface IOwnProps {
  shouldUpdateTable: boolean;
  handleDelete?: (code: number | undefined) => void;
  handleEdit?: (row: PatientExaminationDTO) => void;
}

const PatientTriageTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
  handleDelete,
  handleEdit,
}) => {
  const { t } = useTranslation();
  const label = {
    pex_ID: t("common.code"),
    pex_date: t("examination.datetriage"),
    pex_height: t("examination.height"),
    pex_weight: t("examination.weight"),
    pex_pa_max: t("examination.ap.max"),
    pex_pa_min: t("examination.ap.min"),
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
        pex_ID: item.pex_ID,
        pex_height: item.pex_height,
        pex_weight: item.pex_weight,
        pex_pa_max: item.pex_pa_max,
        pex_pa_min: item.pex_pa_min,
        pex_fc: item.pex_fc,
        pex_temp: item.pex_temp,
        pex_sat: item.pex_sat,
        pex_note: item.pex_note,
        pex_date: item.pex_date ? renderDate(item.pex_date) : "",
        date: item.pex_date,
      };
    });
  };
  const triageStatus = useSelector<IState, string | undefined>(
    (state) => state.examinations.examinationsByPatientId.status
  );

  const onDelete = (row: PatientExaminationDTO) => {
    handleDelete && handleDelete(row.pex_ID);
  };

  return (
    <div className="patientTriageTable">
      {(() => {
        switch (triageStatus) {
          case "FAIL":
            return (
              <InfoBox type="error" message={t("common.somethingwrong")} />
            );
          case "LOADING":
            return (
              <CircularProgress
                style={{ marginLeft: "50%", position: "relative" }}
              />
            );

          case "SUCCESS":
            return (
              <Table
                title={`${t("summary.triage")} (${data.length})`}
                rowData={formatDataToDisplay(data)}
                compareRows={dateComparator}
                tableHeader={header}
                labelData={label}
                columnsOrder={order}
                rowsPerPage={5}
                onDelete={handleDelete ? onDelete : undefined}
                onEdit={handleEdit}
                isCollapsabile={true}
              />
            );

          case "SUCCESS_EMPTY":
            return <InfoBox type="warning" message={t("common.emptydata")} />;

          default:
            return;
        }
      })()}
    </div>
  );
};

export default PatientTriageTable;
