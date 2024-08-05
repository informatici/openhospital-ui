import React, { FunctionComponent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { MedicalDTO, TherapyRowDTO } from "../../../../generated";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { getTherapiesByPatientId } from "../../../../state/therapies";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@mui/material";
import InfoBox from "../../infoBox/InfoBox";
import { renderDateTime } from "../../../../libraries/formatUtils/dataFormatting";
import { getMedicals } from "../../../../state/medicals";
import { formatDateDiff } from "../../../../libraries/formatUtils/formatDateDiff";
import moment from "moment";
import { usePermission } from "../../../../libraries/permissionUtils/usePermission";

interface IOwnProps {
  shouldUpdateTable: boolean;
  handleDelete: (code: number | undefined) => void;
  handleEdit: (row: any) => void;
}

const PatientTherapyTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
  handleDelete,
  handleEdit,
}) => {
  const { t } = useTranslation();
  const canUpdate = usePermission("therapies.update");

  const header = ["startDate", "endDate", "medicalId"];
  const dateFields = ["startDate", "endDate"];

  const label = {
    therapyID: t("common.code"),
    startDate: t("therapy.startDate"),
    endDate: t("therapy.endDate"),
    qty: t("therapy.quantity"),
    freqInDay: t("therapy.frequencyInDay"),
    freqInPeriod: t("therapy.frequencyInPeriod"),
    note: t("therapy.note"),
    medicalId: t("therapy.medical"),
    duration: t("common.moment.duration"),
  };
  const order = ["startDate", "endDate", "medicalId"];
  const dispatch = useAppDispatch();

  const data = useAppSelector<IState, TherapyRowDTO[]>((state) =>
    state.therapies.therapiesByPatientId.data
      ? state.therapies.therapiesByPatientId.data
      : []
  );

  const medicals = useAppSelector<IState, MedicalDTO[]>((state) =>
    state.medicals.medicalsOrderByName.data
      ? state.medicals.medicalsOrderByName.data
      : []
  );

  const patientCode = useAppSelector<IState, number | undefined>(
    (state) => state.patients.selectedPatient.data?.code
  );

  useEffect(() => {
    dispatch(getMedicals());
  }, [dispatch]);

  useEffect(() => {
    if (shouldUpdateTable || patientCode) {
      dispatch(getTherapiesByPatientId(patientCode));
    }
  }, [shouldUpdateTable, dispatch, patientCode]);

  const formatDataToDisplay = (data: TherapyRowDTO[]) => {
    return data.map((item) => {
      const medical = medicals.find((medoc) => medoc.code === item.medicalId);
      const duration = formatDateDiff(
        item.startDate ?? "",
        moment(item.endDate).add(1, "day").toISOString(),
        [
          t("common.moment.years"),
          t("common.moment.months"),
          t("common.moment.weeks"),
          t("common.moment.days"),
        ]
      );
      return {
        therapyID: item.therapyID,
        medicalId: medical ? medical.description : item.medicalId,
        startDate: item.startDate ? renderDateTime(item.startDate) : "",
        endDate: item.endDate ? renderDateTime(item.endDate) : "",
        qty: item.qty,
        freqInDay: item.freqInDay,
        freqInPeriod: item.freqInPeriod,
        note: item.note,
        duration: duration,
      };
    });
    //.sort(dateComparator("desc", "startDate"));
  };

  const therapyStatus = useAppSelector<IState, string | undefined>(
    (state) => state.therapies.therapiesByPatientId.status
  );

  const onDelete = (row: TherapyRowDTO) => {
    handleDelete(row.therapyID);
  };

  const onEdit = (row: TherapyRowDTO) => {
    handleEdit(data.find((item) => item.therapyID === row.therapyID));
  };

  return (
    <div className="patientTherapyTable">
      <h5>{t("therapy.previousentries")}</h5>
      {(() => {
        switch (therapyStatus) {
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
                rowData={formatDataToDisplay(data)}
                dateFields={dateFields}
                tableHeader={header}
                labelData={label}
                columnsOrder={order}
                rowsPerPage={5}
                isCollapsabile={true}
                onEdit={canUpdate ? onEdit : undefined}
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

export default PatientTherapyTable;
