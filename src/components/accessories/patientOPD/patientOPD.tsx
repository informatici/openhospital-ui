import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { initialFields } from "./consts";
import PatientOPDForm from "./patientOPDForm/PatientOPDForm";

const PatientOPD: FunctionComponent = () => {
  const { t } = useTranslation();

  const onSubmit = (opd: any) => {
    console.log(opd);
  };

  return (
    <div className="patientSummary">
      <PatientOPDForm
        fields={initialFields}
        onSubmit={onSubmit}
        submitButtonLabel={t("common.saveopd")}
        resetButtonLabel={t("common.discard")}
        isLoading={false}
      />
    </div>
  );
};

export default PatientOPD;
