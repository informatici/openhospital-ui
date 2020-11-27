import isEmpty from "lodash.isempty";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router";
import checkIcon from "../../../assets/check-icon.png";
import { PatientDTO } from "../../../generated";
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

  const breadcrumbMap = {
    Dashboard: "/dashboard",
    "Search Patient": "/search",
    "Patient Details": `/details/${patient.data?.code}`,
    "Edit Patient": `/details/${patient.data?.code}/edit`,
  };

  const onSubmit = (updatePatientValues: PatientDTO) => {
    updatePatient(patient?.data?.code!, updatePatientValues);
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

  switch (activityTransitionState) {
    case "TO_PATIENT":
      return <Redirect to={`/details/${patient.data?.code}`} />;
    default:
      return (
        <div className="newPatient">
          <AppHeader
            userCredentials={userCredentials}
            breadcrumbMap={breadcrumbMap}
          />
          <div className="newPatient__background">
            <div className="newPatient__content">
              <div className="newPatient__title">{`Edit patient: ${patient.data?.firstName} ${patient.data?.secondName}`}</div>
              <PatientDataForm
                fields={initialFields}
                profilePicture={patient.data?.blobPhoto}
                onSubmit={onSubmit}
                submitButtonLabel="submit"
                isLoading={isLoading}
                editMode={true}
                patient={patient}
                shouldResetForm={shouldResetForm}
                resetFormCallback={resetFormCallback}
              />
            </div>
          </div>
          <div ref={infoBoxRef}>
            {hasFailed && (
              <InfoBox
                type="error"
                message="Something went wrong, please retry later."
              />
            )}
          </div>
          <ConfirmationDialog
            isOpen={openConfirmationMessage}
            title="Patient Edited"
            icon={checkIcon}
            info="The patient was edit successfully."
            primaryButtonLabel="Patient"
            secondaryButtonLabel="Keep editing"
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
