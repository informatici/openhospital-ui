import { CircularProgress } from "@material-ui/core";
import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { PatientExaminationDTO } from "../../../../generated";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";
import { examinationsByPatientId } from "../../../../state/examinations/actions";
import { IState } from "../../../../types";
import InfoBox from "../../infoBox/InfoBox";
import Table from "../../table/Table";
interface IOwnProps {
  shouldUpdateTable: boolean;
  handleDelete: (code: number | undefined) => void;
  handleEdit: (row: PatientExaminationDTO) => void;
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
    pex_ap_max: t("examination.ap.max"),
    pex_ap_min: t("examination.ap.min"),
    pex_rr: t("examination.heartrate"),
    pex_temp: t("examination.temperature"),
    pex_sat: t("examination.saturation"),
    pex_note: t("examination.note"),
  };
  const header = ["pex_date"];
  const order = ["pex_date"];
  const dateFields = ["pex_date"];

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
        pex_ap_max: item.pex_ap_max,
        pex_ap_min: item.pex_ap_min,
        pex_rr: item.pex_rr,
        pex_hgt: item.pex_hgt,
        pex_hr: item.pex_hr,
        pex_temp: item.pex_temp,
        pex_sat: item.pex_sat,
        pex_note: item.pex_note,
        px_diuresis: item.pex_diuresis,
        pex_diuresis_desc: item.pex_diuresis_desc,
        pex_bowel_desc: item.pex_bowel_desc,
        pex_auscultation: item.pex_auscultation,
        pex_date: item.pex_date ? renderDate(item.pex_date) : "",
        date: item.pex_date,
      };
    });
  };
  const triageStatus = useSelector<IState, string | undefined>(
    (state) => state.examinations.examinationsByPatientId.status
  );

  const errorMessage = useSelector<IState>(
    (state) =>
      state.examinations.examinationsByPatientId.error?.message ||
      t("common.somethingwrong")
  ) as string;

  const onDelete = (row: PatientExaminationDTO) => {
    handleDelete(row.pex_ID);
  };

  return (
    <div className="patientTriageTable">
      <h5>{t("common.previousentries")}</h5>
      {(() => {
        switch (triageStatus) {
          case "FAIL":
            return <InfoBox type="error" message={errorMessage} />;
          case "LOADING":
            return (
              <CircularProgress
                style={{ marginLeft: "50%", position: "relative" }}
              />
            );

          case "SUCCESS":
            return (
              <Table
                rowData={formatDataToDisplay(data)}
                tableHeader={header}
                dateFields={dateFields}
                labelData={label}
                columnsOrder={order}
                rowsPerPage={5}
                // onDelete={onDelete}
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
