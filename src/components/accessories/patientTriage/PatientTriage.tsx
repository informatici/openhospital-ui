import React, { FunctionComponent } from "react";
import PatientTriageForm from "./patientTriageForm/PatientTriageForm";
import PatientTriageTable from "./patientTriageTable/PatientTriageTable";
import { initialFields } from "./consts";
import "./styles.scss";
import { useTranslation } from "react-i18next";

const PatientTriage: FunctionComponent = () => {
  const { t } = useTranslation();

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
        submitButtonLabel={t("common.savetriage")}
        resetButtonLabel={t("common.discard")}
        isLoading={false}
      />
      <PatientTriageTable />
    </div>
  );
};

export default PatientTriage;
