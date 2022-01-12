import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect, useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import checkIcon from "../../../assets/check-icon.png";
import { MedicalDTO } from "../../../generated";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import {
  newMedical,
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
}) => {
  const { t } = useTranslation();
  const breadcrumbMap = {
    [t("nav.dashboard")]: "/",
    [t("nav.pharmaceuticals")]: "/Medicals",
    [t("nav.newmedical")]: "/newMedical",
  };

  const newMedicalStatus = useSelector((state: IState) => state.medicals.newMedical.status);
  
  const dispatch = useDispatch();

  const onSubmit = (medical: MedicalDTO) => {
    dispatch(newMedical(medical, true)); 
  };

  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");

  
  useEffect(() => {
    if (activityTransitionState === "TO_MEDICALS") {
      setShouldResetForm(true);
    }
  }, [activityTransitionState]);

  const infoBoxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (newMedicalStatus === "FAIL") {
      scrollToElement(infoBoxRef.current);
    }
  }, [newMedicalStatus]);

  const [shouldResetForm, setShouldResetForm] = useState(false);

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };

  switch (activityTransitionState) {
  case "TO_MEDICALS":
      return <Redirect to="/Medicals" />;
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
                isLoading={newMedicalStatus === "LOADING"}
                shouldResetForm={shouldResetForm}
                resetFormCallback={resetFormCallback}
              />
            </div>
          </div>
          <div ref={infoBoxRef}>
            {newMedicalStatus === "FAIL" && (
              <InfoBox type="error" message={t("common.somethingwrong")} />
            )}
          </div>
          <ConfirmationDialog
            isOpen={newMedicalStatus === "SUCCESS"}
            title="Pharmaceutical Created"
            icon={checkIcon}
            info={t("medical.medicalregistrationsuccessfull")}
            primaryButtonLabel={t("common.medicals")}
            secondaryButtonLabel={t("common.keepediting")}
            handlePrimaryButtonClick={() =>
              setActivityTransitionState("TO_MEDICALS")
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
  isLoading: state.medicals.newMedical.status === "LOADING"
});

const mapDispatchToProps: IDispatchProps = {
  newMedical,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMedicalActivity);
