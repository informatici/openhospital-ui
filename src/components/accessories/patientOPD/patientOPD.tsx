import React, { FunctionComponent } from "react";
import { usePermission } from "../../../libraries/permissionUtils/usePermission";
import { PermissionDenied } from "../permissionDenied/PermissionDenied";
import { initialFields } from "./consts";
import PatientOPDForm from "./patientOPDForm/PatientOPDForm";

const PatientOPD: FunctionComponent = () => {
  const canRead = usePermission("odp.read");

  const onSubmit = (opd: any) => {
    console.log(opd);
  };

  return canRead ? (
    <div className="patientSummary">
      <PatientOPDForm
        fields={initialFields}
        onSubmit={onSubmit}
        submitButtonLabel="Save OPD"
        resetButtonLabel="Discard"
        isLoading={false}
      />
    </div>
  ) : (
    <PermissionDenied />
  );
};

export default PatientOPD;
