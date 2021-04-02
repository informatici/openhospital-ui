import React, { FunctionComponent } from "react";
import { initialFields } from "./consts";
import PatientOPDForm from "./patientOPDForm/PatientOPDForm";

const PatientOPD: FunctionComponent = () => {
  const onSubmit = (opd: any) => {
    console.log(opd);
  };

  return (
    <div className="patientSummary">
      <PatientOPDForm
        fields={initialFields}
        onSubmit={onSubmit}
        submitButtonLabel="Save OPD"
        resetButtonLabel="Discard"
        isLoading={false}
      />
    </div>
  );
};

export default PatientOPD;
