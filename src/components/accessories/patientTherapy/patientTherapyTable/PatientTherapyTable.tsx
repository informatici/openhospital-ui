import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MedicalDTO, TherapyRowDTO } from "../../../../generated";
import { IState } from "../../../../types";
import Table from "../../table/Table";
import { getTherapiesByPatientId } from "../../../../state/therapies/actions";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { CircularProgress } from "@material-ui/core";
import { getMedicals } from "../../../../state/medicals/actions";

interface IOwnProps {
  shouldUpdateTable: boolean;
}

const PatientTherapyTable: FunctionComponent<IOwnProps> = ({}) => {
  const { t } = useTranslation();

  const header = ["startDate", "endDate"];

  const label = {
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
    dispatch(getTherapiesByPatientId(patientCode));
  }, []);
  const formatDataToDisplay = (data: TherapyRowDTO[]) => {
    return data.map((item) => {
      const medical = medicals.find((medoc) => medoc.code === item.medicalId);
      return {
        medicalId: medical ? medical.description : item.medicalId,
        startDate: item.startDate
          ? format(new Date(item.startDate), "dd/MM/yyyy")
          : "",
        endDate: item.endDate
          ? format(new Date(item.endDate), "dd/MM/yyyy")
          : "",
        qty: item.qty,
        freqInDay: item.freqInDay,
        freqInPeriod: item.freqInPeriod,
        note: item.note,
      };
    });
  };
  const isLoading = useSelector<IState, boolean>(
    (state) => state.therapies.therapiesByPatientId.status === "LOADING"
  );
  const onDelete = () => {
    console.log("delete");
  };

  const onEdit = () => {
    console.log("update");
  };

  const onEView = () => {};

  return (
    <>
      <div className="patientTherapyTable">
        {!isLoading ? (
          <Table
            rowData={formatDataToDisplay(data)}
            tableHeader={header}
            labelData={label}
            columnsOrder={order}
            rowsPerPage={5}
            isCollapsabile={true}
            onDelete={onDelete}
            onEdit={onEdit}
            onView={onEView}
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

export default PatientTherapyTable;
