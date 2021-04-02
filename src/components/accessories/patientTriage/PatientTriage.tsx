import React, { FunctionComponent } from "react";
import PatientTriageForm from "./patientTriageForm/PatientTriageForm";
import PatientTriageTable from "./patientTriageTable/PatientTriageTable";
import { initialFields } from "./consts";
import "./styles.scss";
import { usePermission } from "../../../libraries/permissionUtils/usePermission";
import { PermissionDenied } from "../permissionDenied/PermissionDenied";

const PatientTriage: FunctionComponent = () => {
  const canRead = usePermission("examination.read");

  const onSubmit = (triage: any) => {
    console.log(triage);

    /* TODO:
     *     1. Save Triage using Redux
     *     2. Reset the form
     *     3. Update the table
     */
  };

  return canRead ? (
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
  ) : (
    <PermissionDenied />
  );
};

export default PatientTriage;
