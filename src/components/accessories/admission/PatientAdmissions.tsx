import React, { FC, useEffect, useState } from "react";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../types";
import PatientAdmissionTable from "./admissionTable/AdmissionTable";
import { getCurrentAdmissionByPatientId } from "../../../state/admissions/actions";

const PatientAdmissions: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);

  const patient = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  useEffect(() => {
    dispatch(getCurrentAdmissionByPatientId(patient?.code));
  }, [patient, dispatch]);

  return (
    <div className="patientAdmission">
      <div className={"patientAdmission__subtitle"}>
        <div className={"icon"}></div>
        <div className={"text"}>{t("admission.patientalreadyadmitted")}</div>
      </div>
      <PatientAdmissionTable shouldUpdateTable={shouldUpdateTable} />
    </div>
  );
};

export default PatientAdmissions;
