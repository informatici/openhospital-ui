import React, { FC, useEffect, useRef, useState } from "react";
import PatientTherapyTable from "./patientTherapyTable/PatientTherapyTable";
import TherapyForm from "./therapyForm/TherapyForm";
import "./styles.scss";
import {
  createTherapy,
  createTherapyReset,
  deleteTherapyReset,
  deleteTherapy,
} from "../../../state/therapies/actions";
import { getMedicals } from "../../../state/medicals/actions";
import { initialFields } from "./consts";
import { useTranslation } from "react-i18next";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { TherapyRowDTO } from "../../../generated";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../types";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import InfoBox from "../infoBox/InfoBox";
import checkIcon from "../../../assets/check-icon.png";

export type TherapyTransitionState = "IDLE" | "TO_RESET";

const PatientTherapy: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<TherapyTransitionState>("IDLE");

  const [deletedObjCode, setDeletedObjCode] = useState("");

  const patientData = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );
  const createStatus = useSelector<IState, string | undefined>(
    (state) => state.therapies.createTherapy.status
  );
  const deleteStatus = useSelector<IState, string | undefined>(
    (state) => state.therapies.deleteTherapy.status
  );
  useEffect(() => {
    if (createStatus === "FAIL") {
      scrollToElement(infoBoxRef.current);
    }
  }, [createStatus]);

  useEffect(() => {
    dispatch(deleteTherapyReset());
    dispatch(deleteTherapyReset());
    dispatch(getMedicals());
  }, [dispatch, getMedicals]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(createTherapyReset());
      dispatch(deleteTherapyReset());
      setShouldResetForm(true);
      setShouldUpdateTable(true);
    }
  }, [activityTransitionState, createTherapyReset]);

  const onSubmit = (therapy: TherapyRowDTO) => {
    setShouldResetForm(false);
    therapy.patID = patientData;
    createTherapy(therapy);
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    dispatch(deleteTherapyReset());
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };
  const onDelete = (code: number | undefined) => {
    setDeletedObjCode(`${code ?? ""}`);
    dispatch(deleteTherapy(code));
  };
  return (
    <div className="patientTherapy">
      <TherapyForm
        fields={initialFields}
        onSubmit={onSubmit}
        submitButtonLabel={t("common.savetherapy")}
        resetButtonLabel={t("common.discard")}
        shouldResetForm={shouldResetForm}
        resetFormCallback={resetFormCallback}
        isLoading={createStatus === "SUCCESS"}
      />
      {(createStatus === "FAIL" || deleteStatus === "FAIL") && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="error" message={t("common.somethingwrong")} />
        </div>
      )}
      <ConfirmationDialog
        isOpen={createStatus === "SUCCESS"}
        title={t("therapy.created")}
        icon={checkIcon}
        info="therapy.createsuccess"
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
      <PatientTherapyTable
        handleDelete={onDelete}
        shouldUpdateTable={shouldUpdateTable}
      />
      <ConfirmationDialog
        isOpen={deleteStatus === "SUCCESS"}
        title={t("common.delete")}
        icon={checkIcon}
        info={t("common.deletesuccess", { code: deletedObjCode })}
        primaryButtonLabel="OK"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => {}}
      />
    </div>
  );
};
export default PatientTherapy;
