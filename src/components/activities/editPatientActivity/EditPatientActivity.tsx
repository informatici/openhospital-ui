import isEmpty from "lodash.isempty";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router";
import checkIcon from "../../../assets/check-icon.png";
import { PatientDTO } from "../../../generated";
import { updateFields } from "../../../libraries/formDataHandling/functions";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import {
  updatePatient,
  updatePatientReset,
  getPatientThunk,
} from "../../../state/patients/actions";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import ConfirmationDialog from "../../accessories/confirmationDialog/ConfirmationDialog";
import Footer from "../../accessories/footer/Footer";
import InfoBox from "../../accessories/infoBox/InfoBox";
import PatientDataForm from "../../accessories/patientDataForm/PatientDataForm";
import { initialFields } from "../newPatientActivity/consts";
import "./styles.scss";
import {
  IDispatchProps,
  IStateProps,
  TActivityTransitionState,
  TProps,
} from "./types";
import { useT } from '@transifex/react';

const EditPatientActivity: FunctionComponent<TProps> = ({
  userCredentials,
  isLoading,
  updatePatient,
  updatePatientReset,
  hasSucceeded,
  hasFailed,
  patient,
  getPatientThunk
}) => {

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (isEmpty(patient.data) && patient.status === "IDLE") {
      getPatientThunk(id);
    }
  }, [patient, id, getPatientThunk]);

  const searchPatientPath = useT("Search Patient", {});
  const dashPatientPath = useT("Patient Dashboard", {});
  const editPatientPath = useT("Edit Patient", {});
  const breadcrumbMap = {
    Dashboard: "/",
    [searchPatientPath]: "/search",
    [dashPatientPath]: `/details/${patient.data?.code}`,
    [editPatientPath]: `/details/${patient.data?.code}/edit`,
  };

  const onSubmit = (updatePatientValues: PatientDTO) => {
    if(patient?.data?.code)
      updatePatient(patient?.data?.code, updatePatientValues);
    else 
      console.error('The Patient: PatientDTO object must have a "code" property.');
  };

  const [activityTransitionState, setActivityTransitionState] = useState<TActivityTransitionState>("IDLE");
  const [openConfirmationMessage, setOpenConfirmationMessage] = useState<boolean>(false);

  useEffect(() => {
    if (activityTransitionState === "TO_PATIENT") {
      updatePatientReset();
      setShouldResetForm(true);
    } else if (activityTransitionState === "TO_KEEP_EDITING") {
      setOpenConfirmationMessage(false);
    }
  }, [activityTransitionState, updatePatientReset]);

  useEffect(() => {
    setOpenConfirmationMessage(hasSucceeded);
  }, [hasSucceeded]);

  const infoBoxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (hasFailed) {
      scrollToElement(infoBoxRef.current);
    }
  }, [hasFailed]);

  const [shouldResetForm, setShouldResetForm] = useState(false);

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };

  const submitLabel = useT("submit", {});
  const resetLabel = useT("reset", {});
  const errorLabel = useT("Something went wrong, please retry later.", {});
  const patientEditLabel = useT("Patient Edited", {});
  const successLabel = useT("The patient was edit successfully.", {});
  const patientLabel = useT("Patient", {});
  const editingLabel = useT("Keep editing", {});

  switch (activityTransitionState) {
    case "TO_PATIENT":
      return <Redirect to={`/details/${patient.data?.code}`} />;
    default:
      return (
        <div className="editPatient">
          <AppHeader
            userCredentials={userCredentials}
            breadcrumbMap={breadcrumbMap}
          />
          <div className="editPatient__background">
            <div className="editPatient__content">
            <div className="editPatient__title">{useT("Edit patient: {name} {surname}", {name: patient.data?.firstName, surname:patient.data?.secondName})}</div>
              <PatientDataForm
                fields={updateFields(initialFields, patient?.data)}
                profilePicture={patient.data?.blobPhoto}
                onSubmit={onSubmit}
                submitButtonLabel={submitLabel}
                resetButtonLabel={resetLabel}
                isLoading={isLoading}
                shouldResetForm={shouldResetForm}
                resetFormCallback={resetFormCallback}
              />
            </div>
          </div>
          <div ref={infoBoxRef}>
            {hasFailed && (
              <InfoBox
                type="error"
                message={errorLabel}
              />
            )}
          </div>
          <ConfirmationDialog
            isOpen={openConfirmationMessage}
            title={patientEditLabel}
            icon={checkIcon}
            info={successLabel}
            primaryButtonLabel={patientLabel}
            secondaryButtonLabel={editingLabel}
            handlePrimaryButtonClick={() =>
              setActivityTransitionState("TO_PATIENT")
            }
            handleSecondaryButtonClick={() =>
              setActivityTransitionState("TO_KEEP_EDITING")
            }
          />
          <Footer />
        </div>
      );
  }
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.authentication.data,
  isLoading: state.patients.updatePatient.status === "LOADING",
  hasSucceeded: state.patients.updatePatient.status === "SUCCESS",
  hasFailed: state.patients.updatePatient.status === "FAIL",
  patient: state.patients.selectedPatient,
});

const mapDispatchToProps: IDispatchProps = {
  getPatientThunk,
  updatePatientReset,
  updatePatient,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPatientActivity);
