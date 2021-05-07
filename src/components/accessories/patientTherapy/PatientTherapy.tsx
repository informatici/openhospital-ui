import React, { FC, useState } from "react";
import PatientTherapyTable from "./patientTherapyTable/PatientTherapyTable";
import TherapyForm from "./therapyForm/TherapyForm";
import "./styles.scss";

const PatientTherapy: FC = () => {
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);

  return (
    <div className="patientTherapy">
      <TherapyForm />
      <PatientTherapyTable shouldUpdateTable={shouldUpdateTable} />
    </div>
  );
};

export default PatientTherapy;
