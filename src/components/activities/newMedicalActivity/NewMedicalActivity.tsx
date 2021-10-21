import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import checkIcon from "../../../assets/check-icon.png";
import { MedicalDTO } from "../../../generated";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import {
  newMedical,
  newMedicalReset,
} from "../../../state/medicals/actions";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import ConfirmationDialog from "../../accessories/confirmationDialog/ConfirmationDialog";
import Footer from "../../accessories/footer/Footer";
import InfoBox from "../../accessories/infoBox/InfoBox";
import MedicalDataForm from "../../accessories/medicalDataForm/MedicalDataForm";
import { initialFields } from "./consts";
import "./styles.scss";
import {
  IDispatchProps,
  IStateProps,
  TActivityTransitionState,
  TProps,
} from "./types";

const NewMedicalActivity: FunctionComponent<TProps> = ({
  userCredentials,
  newMedical,
  newMedicalReset,
  isLoading,
  hasSucceeded,
  hasFailed,
  dashboardRoute,
}) => {
  const { t } = useTranslation();
  const breadcrumbMap = {
    [t("nav.dashboard")]: "/",
    [t("nav.newmedical")]: "/newMedical",
  };

  const onSubmit = (medical: MedicalDTO) => {
    newMedical(medical); //per ora false
  };

  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");

  useEffect(() => {
    if (
      activityTransitionState === "TO_NEW_MEDICAL_RESET" ||
      activityTransitionState === "TO_DASHBOARD"
    ) {
      newMedicalReset();
      setShouldResetForm(true);
    }
  }, [activityTransitionState, newMedicalReset]);

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
      return <Redirect to={dashboardRoute} />;
    default:
      return (
        <div className="newMedical">
          <AppHeader
            userCredentials={userCredentials}
            breadcrumbMap={breadcrumbMap}
          />
          <div className="newMedical__background">
            <div className="newMedical__content">
              <div className="newMedical__title">{t("nav.newmedical")}</div>
              <MedicalDataForm
                fields={initialFields}
                onSubmit={onSubmit}
                submitButtonLabel={t("common.submit")}
                resetButtonLabel={t("common.clearall")}
                isLoading={isLoading}
                shouldResetForm={shouldResetForm}
                resetFormCallback={resetFormCallback}
              />
            </div>
          </div>
          <div ref={infoBoxRef}>
            {hasFailed && (
              <InfoBox type="error" message={t("common.somethingwrong")} />
            )}
          </div>
          <ConfirmationDialog
            isOpen={hasSucceeded}
            title="Medical Created"
            icon={checkIcon}
            info={t("common.patientregistrationsuccessfull")}
            primaryButtonLabel={t("common.dashboard")}
            secondaryButtonLabel={t("common.keepediting")}
            handlePrimaryButtonClick={() =>
              setActivityTransitionState("TO_DASHBOARD")
            }
            handleSecondaryButtonClick={() =>
              setActivityTransitionState("TO_NEW_MEDICAL_RESET")
            }
          />
          <Footer />
        </div>
      );
  }
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.authentication.data,
  isLoading: state.medicals.newMedical.status === "LOADING",
  hasSucceeded: state.medicals.newMedical.status === "SUCCESS",
  hasFailed: state.medicals.newMedical.status === "FAIL",
});

const mapDispatchToProps: IDispatchProps = {
  newMedicalReset,
  newMedical,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMedicalActivity);
