import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MedicalDTO, TherapyRowDTO } from "../../../../generated";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { getTherapiesByPatientId } from "../../../../state/therapies/actions";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@material-ui/core";
import InfoBox from "../../infoBox/InfoBox";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";
import { getMedicals } from "../../../../state/medicals/actions";

interface IOwnProps {
  shouldUpdateTable: boolean;
  handleDelete: (code: number | undefined) => void;
  handleEdit: <T>(row: T) => void;
}

const PatientTherapyTable: FunctionComponent<IOwnProps> = ({
  shouldUpdateTable,
  handleDelete,
  handleEdit,
}) => {
  const { t } = useTranslation();

  const header = ["startDate", "endDate"];
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
  };
  const order = ["startDate", "endDate"];
  const dispatch = useDispatch();

  const data = useSelector<IState, TherapyRowDTO[]>((state) =>
    state.therapies.therapiesByPatientId.data
      ? state.therapies.therapiesByPatientId.data
      : []
  );

  const medicals = useSelector<IState, MedicalDTO[]>((state) =>
    state.medicals.medicalsOrderByName.data
      ? state.medicals.medicalsOrderByName.data
      : []
  );

  const patientCode = useSelector<IState, number | undefined>(
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
      return {
        therapyID: item.therapyID,
        medicalId: medical ? medical.description : item.medicalId,
        startDate: item.startDate ? renderDate(item.startDate) : "",
        endDate: item.endDate ? renderDate(item.endDate) : "",
        qty: item.qty,
        freqInDay: item.freqInDay,
        freqInPeriod: item.freqInPeriod,
        note: item.note,
      };
    });
    //.sort(dateComparator("desc", "startDate"));
  };

  const therapyStatus = useSelector<IState, string | undefined>(
    (state) => state.therapies.therapiesByPatientId.status
  );

  const errorMessage = useSelector<IState>(
    (state) =>
      state.therapies.therapiesByPatientId.error?.message ||
      t("common.somethingwrong")
  ) as string;

  const onDelete = (row: TherapyRowDTO) => {
    handleDelete(row.therapyID);
  };

  const onEdit = (row: TherapyRowDTO) => {
    handleEdit(data.find((item) => item.therapyID === row.therapyID));
  };

  return (
    <div className="patientTherapyTable">
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
                // onDelete={onDelete}
                isCollapsabile={true}
                onEdit={onEdit}
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

export default PatientTherapyTable;
