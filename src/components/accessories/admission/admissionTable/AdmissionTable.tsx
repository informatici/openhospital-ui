import React, { FunctionComponent, useEffect } from "react";
import Table from "../../table/Table";
import { useTranslation } from "react-i18next";
import InfoBox from "../../infoBox/InfoBox";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../types";
import { AdmissionDTO } from "../../../../generated";
import { getAdmissionsByPatientId } from "../../../../state/admissions/actions";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";

interface IOwnProps {
  shouldUpdateTable: boolean;
  handleEdit: <T>(row: T) => void;
}

const PatientAdmissionTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
  handleEdit,
}) => {
  const { t } = useTranslation();

  const header = ["admDate", "disDate"];
  const dateFields = ["admDate", "disDate"];

  const label = {
    admDate: t("admission.admDate"),
    disDate: t("admission.disDate"),
    admType: t("admission.admType"),
    diseaseIn: t("admission.diseaseIn"),
    transUnit: t("admission.transUnit"),
    ward: t("admission.ward"),
    note: t("admission.note"),
    disType: t("admission.disType"),
    diseaseOut1: t("admission.diseaseOut1"),
    diseaseOut2: t("admission.diseaseOut2"),
    diseaseOut3: t("admission.diseaseOut3"),
  };
  const order = ["admDate", "disDate"];

  const dispatch = useDispatch();

  const data = useSelector<IState, AdmissionDTO[]>((state) =>
    state.admissions.admissionsByPatientId.data
      ? state.admissions.admissionsByPatientId.data
      : []
  );

  const patientCode = useSelector<IState, number | undefined>(
    (state) => state.patients.selectedPatient.data?.code
  );

  const onEdit = (row: AdmissionDTO) => {
    handleEdit(data.find((item) => item.id === row?.id));
  };

  useEffect(() => {
    if (shouldUpdateTable || patientCode) {
      dispatch(getAdmissionsByPatientId(patientCode));
    }
  }, [shouldUpdateTable, dispatch, patientCode]);

  const formatDataToDisplay = (data: AdmissionDTO[]) => {
    return data.map((item) => {
      return {
        id: item.id ?? "",
        admDate: item.admDate ? renderDate(item.admDate) : "",
        disDate: item.disDate ? renderDate(item.disDate) : "",
        admType: item.admType?.description ?? "",
        diseaseIn: item.diseaseIn?.description ?? "",
        transUnit: item.transUnit,
        ward: item.ward?.description ?? "",
        note: item.note ?? "",
        disType: item.disType?.description ?? "",
        diseaseOut1: item.diseaseOut1?.description ?? "",
        diseaseOut2: item.diseaseOut2?.description ?? "",
        diseaseOut3: item.diseaseOut3?.description ?? "",
      };
    });
  };
  const status = useSelector<IState, string | undefined>(
    (state) => state.admissions.admissionsByPatientId.status
  );

  const errorMessage = useSelector<IState>(
    (state) =>
      state.admissions.admissionsByPatientId.error?.message ||
      t("common.somethingwrong")
  ) as string;
  const createAdmissionStatus = useSelector<IState>(
    (state) => state.admissions.createAdmission.status
  );

  return (
    <div className="patientAdmissionTable">
      <h5>{t("common.previousentries")}</h5>
      {(() => {
        switch (status) {
          case "FAIL":
            return (
              createAdmissionStatus !== "FAIL" && (
                <InfoBox type="error" message={errorMessage} />
              )
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
                rowData={formatDataToDisplay(data)}
                dateFields={dateFields}
                tableHeader={header}
                labelData={label}
                columnsOrder={order}
                rowsPerPage={5}
                isCollapsabile={true}
                onEdit={onEdit}
                initialOrderBy="disDate"
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

export default PatientAdmissionTable;
