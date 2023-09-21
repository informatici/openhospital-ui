import isEmpty from "lodash.isempty";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import checkIcon from "../../../assets/check-icon.png";
import { PATHS } from "../../../consts";
import { PatientDTO } from "../../../generated";
import { updateFields } from "../../../libraries/formDataHandling/functions";
import { Permission } from "../../../libraries/permissionUtils/Permission";
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
  getPatientThunk,
}) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  // Reset patient update state to avoid error displaying
  // in patient details activity.
  // See issue [OHCS-107](https://openhospital.atlassian.net/browse/OHCS-107)
  useEffect(() => {
    return () => {
      updatePatientReset();
    };
  }, []);

  useEffect(() => {
    if (isEmpty(patient.data) && patient.status === "IDLE" && id) {
      getPatientThunk(id);
    }
  }, [patient, id, getPatientThunk]);

  const breadcrumbMap = {
    [t("nav.patients")]: PATHS.patients,
    [t("nav.searchpatient")]: PATHS.patients_search,
    [t(
      "nav.patientdashboard"
    )]: `${PATHS.patients_details}/${patient.data?.code}`,
    [t(
      "nav.editpatient"
    )]: `${PATHS.patients_details}/${patient.data?.code}/edit`,
  };

  const errorMessage = useSelector<IState>(
    (state) =>
      state.patients.updatePatient.error?.message || t("common.somethingwrong")
  ) as string;

  const onSubmit = (updatePatientValues: PatientDTO) => {
    if (patient?.data?.code)
      updatePatient(patient?.data?.code, {
        ...updatePatientValues,
        code: patient?.data?.code,
        allergies: patient.data?.allergies,
        anamnesis: patient.data?.anamnesis,
      });
    else
      console.error(
        'The Patient: PatientDTO object must have a "code" property.'
      );
  };

  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");
  const [openConfirmationMessage, setOpenConfirmationMessage] =
    useState<boolean>(false);

  useEffect(() => {
    if (isEmpty(patient.data) && patient.status === "IDLE") {
      getPatientThunk(id!);
    }
  }, [patient, id, getPatientThunk]);

  useEffect(() => {
    console.log(activityTransitionState);
    if (activityTransitionState === "TO_PATIENT") {
      getPatientThunk(id!);
      updatePatientReset();
      setShouldResetForm(true);
    } else if (activityTransitionState === "TO_KEEP_EDITING") {
      setOpenConfirmationMessage(false);
      setActivityTransitionState("IDLE");
    }
  }, [activityTransitionState, updatePatientReset, getPatientThunk, id]);

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
    case "TO_DASHBOARD":
      return <Navigate to={`${PATHS.patients}`} replace />;
    case "TO_PATIENT":
      return (
        <Navigate
          to={`${PATHS.patients_details}/${patient.data?.code}`}
          replace
        />
      );
    default:
      return (
        <div className="editPatient">
          <AppHeader
            userCredentials={userCredentials}
            breadcrumbMap={breadcrumbMap}
          />
          <div className="editPatient__background">
            <div className="editPatient__content">
              <div className="editPatient__title">
                {`${t("nav.editpatient")}: ${patient.data?.firstName} ${
                  patient.data?.secondName
                }`}
              </div>
              <Permission require={"patient.update"}>
                <PatientDataForm
                  fields={updateFields(initialFields, patient?.data)}
                  profilePicture={patient.data?.blobPhoto}
                  onSubmit={onSubmit}
                  submitButtonLabel={t("common.submit")}
                  resetButtonLabel={t("common.reset")}
                  isLoading={isLoading}
                  shouldResetForm={shouldResetForm}
                  resetFormCallback={resetFormCallback}
                  mode={"edit"}
                />
                <div ref={infoBoxRef}>
                  {hasFailed && <InfoBox type="error" message={errorMessage} />}
                </div>
                <ConfirmationDialog
                  isOpen={openConfirmationMessage}
                  title={t("common.titleedited")}
                  icon={checkIcon}
                  info={t("common.patienteditsuccessfull")}
                  primaryButtonLabel={t("common.patient")}
                  secondaryButtonLabel={t("common.keepediting")}
                  handlePrimaryButtonClick={() =>
                    setActivityTransitionState("TO_PATIENT")
                  }
                  handleSecondaryButtonClick={() =>
                    setActivityTransitionState("TO_KEEP_EDITING")
                  }
                />
              </Permission>
            </div>
          </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPatientActivity);
