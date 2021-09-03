import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import checkIcon from "../../../assets/check-icon.png";
import { AdmissionDTO } from "../../../generated";
import {
  getCurrentAdmissionByPatientId,
  updateAdmission,
  updateAdmissionReset,
} from "../../../state/admissions/actions";
import { IState } from "../../../types";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import AdmissionNoteForm from "./admissionNoteForm/AdmissionNoteForm";
import InfoBox from "../infoBox/InfoBox";
import { AdmissionNoteFormFieldName } from "./admissionNoteForm/types";
import { TFields } from "../../../libraries/formDataHandling/types";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";

export type AdmissionNoteTransitionState = "IDLE" | "TO_RESET" | "FAIL";

export const AdmissionNote: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<AdmissionNoteTransitionState>("IDLE");

  const currentAdmission = useSelector(
    (state: IState) => state.admissions.currentAdmissionByPatientId.data
  );

  const initialFields: TFields<AdmissionNoteFormFieldName> = {
    note: {
      value: currentAdmission?.note ?? "",
      type: "text",
    },
  };

  const onSubmit = (adm: AdmissionDTO) => {
    setShouldResetForm(false);
    if (currentAdmission !== undefined) {
      const admToUpdate: AdmissionDTO = { ...currentAdmission, note: adm.note };
      dispatch(updateAdmission(admToUpdate));
    }
  };

  const patient = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const status = useSelector(
    (state: IState) => state.admissions.updateAdmission.status
  );

  useEffect(() => {
    dispatch(updateAdmissionReset());
  }, [dispatch]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(updateAdmissionReset());
      setShouldResetForm(true);
    }
  }, [dispatch, activityTransitionState]);

  useEffect(() => {
    if (status === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
    }
  }, [status]);

  useEffect(() => {
    dispatch(getCurrentAdmissionByPatientId(patient?.code));
  }, [patient, dispatch]);

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };

  return (
    <div className="admissionNote">
      {currentAdmission ? (
        <AdmissionNoteForm
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
      {status === "FAIL" && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="error" message={t("common.somethingwrong")} />
        </div>
      )}
      <ConfirmationDialog
        isOpen={status === "SUCCESS"}
        title={t("admission.noteadded")}
        icon={checkIcon}
        info={t("admission.noteaddedwithsuccess")}
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
    </div>
  );
};

export default AdmissionNote;
