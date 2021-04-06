import React, { FunctionComponent } from "react";
import { initialFields } from "./consts";
import PatientTriageForm from "./patientTriageForm/PatientTriageForm";
import PatientTriageTable from "./patientTriageTable/PatientTriageTable";
import "./styles.scss";

const PatientTriage: FunctionComponent = () => {
  const onSubmit = (triage: any) => {
    console.log(triage);

    /* TODO:
     *     1. Save Triage using Redux
     *     2. Reset the form
     *     3. Update the table
     */
  };

  return (
    <div className="patientTriage">
      <PatientTriageForm
        fields={initialFields}
        onSubmit={onSubmit}
        submitButtonLabel="Save triage"
        resetButtonLabel="Discard"
        isLoading={false}
      />
      <PatientTriageTable />
    </div>
  );
};

export default PatientTriage;
