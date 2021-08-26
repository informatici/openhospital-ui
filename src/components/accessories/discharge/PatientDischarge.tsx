import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AdmissionDTO } from "../../../generated";
import { initialFields } from "./consts";
import DischargeForm from "./dischargeForm/DischargeForm";
import "./styles.scss";

export const PatientDischarge: React.FC = () => {
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);

  const onSubmit = (admission: AdmissionDTO) => {
    setShouldResetForm(false);
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setShouldUpdateTable(false);
  };

  return (
    <div className="patientDischarge">
      <DischargeForm
        fields={initialFields}
        onSubmit={onSubmit}
        submitButtonLabel={t("common.save")}
        resetButtonLabel={t("common.discard")}
        shouldResetForm={shouldResetForm}
        resetFormCallback={resetFormCallback}
        isLoading={false}
      />
    </div>
  );
};
