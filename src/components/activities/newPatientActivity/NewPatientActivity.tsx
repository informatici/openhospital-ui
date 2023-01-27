import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect, useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import checkIcon from "../../../assets/check-icon.png";
import { PATHS } from "../../../consts";
import { PatientDTO } from "../../../generated";
import { Permission } from "../../../libraries/permissionUtils/Permission";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import {
  createPatient,
  createPatientReset,
  getPatientReset,
} from "../../../state/patients/actions";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import ExtendedConfirmationDialog from "../../accessories/extendedConfirmationDialog/ExtendedConfirmationDialog";
import Footer from "../../accessories/footer/Footer";
import InfoBox from "../../accessories/infoBox/InfoBox";
import PatientDataForm from "../../accessories/patientDataForm/PatientDataForm";
import { initialFields } from "./consts";
import "./styles.scss";
import {
  IDispatchProps,
  IStateProps,
  TActivityTransitionState,
  TProps,
} from "./types";

const NewPatientActivity: FunctionComponent<TProps> = ({
  userCredentials,
  createPatient,
  createPatientReset,
  isLoading,
  hasSucceeded,
  hasFailed,
  dashboardRoute,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const breadcrumbMap = {
    [t("nav.patients")]: PATHS.patients,
    [t("nav.newpatient")]: PATHS.patients_new,
  };

  const onSubmit = (patient: PatientDTO) => {
    createPatient(patient);
  };

  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");

  const errorMessage = useSelector<IState, string>(
    (state) =>
      state.patients.createPatient.error?.message || t("common.somethingwrong")
  );

  const selectedPatient = useSelector<IState, PatientDTO | undefined>(
    (state) => state.patients.selectedPatient.data
  );

  const patient = useSelector<IState, PatientDTO | undefined>(
    (state) =>
      state.patients.createPatient.data || state.patients.updatePatient.data
  );

  useEffect(() => {
    dispatch(getPatientReset());
  }, []);

  useEffect(() => {
    if (
      activityTransitionState === "TO_NEW_PATIENT_RESET" ||
      activityTransitionState === "TO_DASHBOARD" ||
      activityTransitionState === "TO_PATIENT_DASHBOARD"
    ) {
      createPatientReset();
      setShouldResetForm(true);
    }
  }, [activityTransitionState, createPatientReset]);

  useEffect(() => {
    if (activityTransitionState === "TO_PATIENT_DASHBOARD" && patient?.code) {
      navigate(`/patients/details/${patient?.code}`, { replace: true });
    }
  }, [patient, activityTransitionState, createPatientReset]);

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
      return <Navigate to={dashboardRoute} />;
    default:
      return (
        <div className="newPatient">
          <AppHeader
            userCredentials={userCredentials}
            breadcrumbMap={breadcrumbMap}
          />
          <div className="newPatient__background">
            <div className="newPatient__content">
              <div className="newPatient__title">{t("nav.newpatient")}</div>
              <Permission require="patient.create">
                <PatientDataForm
                  fields={initialFields}
                  onSubmit={onSubmit}
                  submitButtonLabel={t("common.submit")}
                  resetButtonLabel={t("common.clearall")}
                  isLoading={isLoading}
                  shouldResetForm={shouldResetForm}
                  resetFormCallback={resetFormCallback}
                  mode={"create"}
                />
                <div ref={infoBoxRef}>
                  {hasFailed && <InfoBox type="error" message={errorMessage} />}
                </div>
                <ExtendedConfirmationDialog
                  isOpen={hasSucceeded}
                  title={t("patient.created")}
                  icon={checkIcon}
                  info={t("common.patientregistrationsuccessfull")}
                  items={[
                    {
                      label: t("common.dashboard"),
                      onClick: () => setActivityTransitionState("TO_DASHBOARD"),
                    },
                    {
                      label: t("common.keepediting"),
                      onClick: () =>
                        setActivityTransitionState("TO_NEW_PATIENT_RESET"),
                    },
                    {
                      label: t("patient.dashboard"),
                      onClick: () =>
                        setActivityTransitionState("TO_PATIENT_DASHBOARD"),
                    },
                  ]}
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
  isLoading: state.patients.createPatient.status === "LOADING",
  hasSucceeded: state.patients.createPatient.status === "SUCCESS",
  hasFailed: state.patients.createPatient.status === "FAIL",
});

const mapDispatchToProps: IDispatchProps = {
  createPatient,
  createPatientReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPatientActivity);
