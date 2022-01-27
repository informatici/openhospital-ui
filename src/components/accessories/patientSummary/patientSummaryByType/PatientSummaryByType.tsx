import React, { FC } from "react";
import PatientExamsTable from "../../patientExams/patientExamsTable/PatientExamsTable";
import PatientOPDTable from "../../patientOPD/patientOPDTable/PatientOPDTable";
import PatientTherapyTable from "../../patientTherapy/patientTherapyTable/PatientTherapyTable";
import PatientTriageTable from "../../patientTriage/patientTriageTable/PatientTriageTable";
import "./styles.scss";

const PatientSummaryByType: FC = () => {
  return (
    <>
      <div className="patientSummary_type">
        <PatientOPDTable shouldUpdateTable={true} />

        <PatientTriageTable shouldUpdateTable={true} />

        <PatientTherapyTable shouldUpdateTable={true} />

        <PatientExamsTable shouldUpdateTable={true} />
      </div>
    </>
  );
};

export default PatientSummaryByType;
