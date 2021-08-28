import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AdmissionDTO } from "../../../generated";
import { initialFields } from "./consts";
import DischargeForm from "./dischargeForm/DischargeForm";
import { getCurrentAdmissionByPatientId } from "../../../state/admissions/actions";
import { IState } from "../../../types";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import InfoBox from "../infoBox/InfoBox";

export const PatientDischarge: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [shouldResetForm, setShouldResetForm] = useState(false);

  const onSubmit = (admission: AdmissionDTO) => {
    setShouldResetForm(false);
  };

  const patient = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const currentAdmission = useSelector(
    (state: IState) => state.admissions.currentAdmissionByPatientId.data
  );

  useEffect(() => {
    dispatch(getCurrentAdmissionByPatientId(patient?.code));
  }, [patient, dispatch, getCurrentAdmissionByPatientId]);

  const resetFormCallback = () => {
    setShouldResetForm(false);
  };

  return (
    <div className="patientDischarge">
      {currentAdmission ? (
        <DischargeForm
          fields={initialFields}
          onSubmit={onSubmit}
          submitButtonLabel={t("common.save")}
          resetButtonLabel={t("common.discard")}
          shouldResetForm={shouldResetForm}
          resetFormCallback={resetFormCallback}
          isLoading={false}
        />
      ) : (
        <InfoBox type="warning" message={t("admission.nocurrentadmission")} />
      )}
    </div>
  );
};
