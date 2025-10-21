import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FunctionComponent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { getEncounterAdmissions } from "state/encounter";
import { AdmissionDTO } from "../../../../generated";
import { renderDateTime } from "../../../../libraries/formatUtils/dataFormatting";
import { usePermission } from "../../../../libraries/permissionUtils/usePermission";
import { getPatientAdmissions } from "../../../../state/admissions";
import InfoBox from "../../infoBox/InfoBox";
import Table from "../../table/Table";

interface IOwnProps {
  shouldUpdateTable: boolean;
  handleEdit?: (row: any) => void;
}

const PatientAdmissionTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
  handleEdit,
}) => {
  const { t } = useTranslation();
  const canUpdate = usePermission("admissions.update");

  const { code } = useParams();

  const header = ["admDate", "disDate"];
  const dateFields = ["admDate", "disDate"];

  const label = {
    id: t("admission.code"),
    admDate: t("admission.admDate"),
    disDate: t("admission.disDate"),
    admType: t("admission.admType"),
    diseaseIn: t("admission.diseaseIn"),
    transUnit: t("admission.transUnit"),
    fhu: t("admission.fhu"),
    ward: t("admission.ward"),
    anamnesis: t("admission.anamnesis"),
    disType: t("admission.disType"),
    diseaseOut1: t("admission.diseaseOut1"),
    diseaseOut2: t("admission.diseaseOut2"),
    diseaseOut3: t("admission.diseaseOut3"),
    preTreatment: t("admission.preTreatment"),
    preAssessment: t("admission.preAssessment"),
    entryReason: t("admission.entryReason"),
    alertReceived: t("patient.alertReceived"),
    referenceSheet: t("patient.referenceSheet"),
    qualifiedAgent: t("patient.qualifiedAgent"),
  };
  const order = ["admDate", "disDate"];

  const dispatch = useAppDispatch();

  const data = useAppSelector(
    (state) =>
      (code
        ? state.encounters.encounterAdmissions.data
        : state.admissions.getPatientAdmissions.data
      )?.filter(
        (e) => state.admissions.currentAdmissionByPatientId.data?.id !== e.id
      ) ?? []
  );

  const patientCode = useAppSelector(
    (state) => state.patients.selectedPatient.data?.code
  );

  const onEdit = handleEdit
    ? (row: AdmissionDTO) => {
        handleEdit(data.find((item) => item.id === row?.id));
      }
    : undefined;

  useEffect(() => {
    if (shouldUpdateTable || patientCode || code) {
      const action = code
        ? getEncounterAdmissions({ code })
        : getPatientAdmissions({ patientCode: patientCode ?? -1 });
      dispatch(action as any);
    }
  }, [shouldUpdateTable, dispatch, patientCode, code]);

  const formatDataToDisplay = (data: AdmissionDTO[]) => {
    return data.map((item) => {
      return {
        id: item.id ?? "",
        admDate: item.admDate ? renderDateTime(item.admDate) : "",
        disDate: item.disDate ? renderDateTime(item.disDate) : "",
        admType: item.admType?.description ?? "",
        diseaseIn: item.diseaseIn?.description ?? "",
        transUnit: item.transUnit,
        fhu: item.fhu,
        ward: item.ward?.description ?? "",
        anamnesis: item.anamnesis ?? "",
        disType: item.disType?.description ?? "",
        diseaseOut1: item.diseaseOut1?.description ?? "",
        diseaseOut2: item.diseaseOut2?.description ?? "",
        diseaseOut3: item.diseaseOut3?.description ?? "",
        preTreatment: item.preTreatment ?? "",
        preAssessment: item.preAssessment ?? "",
        entryReason: item.entryReason,
        alertReceived: item.alertReceived ? t("common.yes") : t("common.no"),
        referenceSheet: item.referenceSheet ? t("common.yes") : t("common.no"),
        qualifiedAgent: item.qualifiedAgent ? t("common.yes") : t("common.no"),
      };
    });
  };
  const status = useAppSelector((state) =>
    code
      ? state.encounters.encounterAdmissions.status
      : state.admissions.getPatientAdmissions.status
  );

  const errorMessage = useAppSelector(
    (state) =>
      state.admissions.getPatientAdmissions.error?.message ||
      t("common.somethingwrong")
  ) as string;
  const createAdmissionStatus = useAppSelector(
    (state) => state.admissions.createAdmission.status
  );

  return (
    <div className="patientAdmissionTable">
      <h5>{t("admission.previousentries")}</h5>
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
                onEdit={canUpdate ? onEdit : undefined}
                initialOrderBy="disDate"
                showEmptyCell={false}
              />
            );
          case "SUCCESS_EMPTY":
            return <InfoBox type="info" message={t("common.emptydata")} />;
          default:
            return;
        }
      })()}
    </div>
  );
};

export default PatientAdmissionTable;
