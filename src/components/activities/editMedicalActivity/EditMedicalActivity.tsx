import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {useLocation} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router";
import checkIcon from "../../../assets/check-icon.png";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import {
  getMedical,
  updateMedical,
  updateMedicalReset,
} from "../../../state/medicals/actions";
import { updateFields } from "../../../libraries/formDataHandling/functions";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import ConfirmationDialog from "../../accessories/confirmationDialog/ConfirmationDialog";
import Footer from "../../accessories/footer/Footer";
import InfoBox from "../../accessories/infoBox/InfoBox";
import MedicalDataForm from "../../accessories/medicalDataForm/MedicalDataForm";
import { initialFields } from "../newMedicalActivity/consts";
import "./styles.scss";
import {
  IDispatchProps,
  IStateProps,
  TActivityTransitionState,
  TProps,
} from "./types";
import isEmpty from "lodash.isempty";
import { MedicalDTO } from "../../../generated";

const EditMedicalActivity: FunctionComponent<TProps> = ({
  userCredentials,
  getMedical,
  updateMedicalReset,
  updateMedical,
  isLoading, //on edit call
  hasSucceeded, //on edit call
  hasFailed, //on edit call
  getMedicalStatus, // on get medical call
  medical,
}) => {
  const { code } = useParams<{ code: string }>();
  const { t } = useTranslation();
  
  useEffect(() => {
    if (isEmpty(medical.data) && medical.status === "IDLE") {
        getMedical(+code);
       
      switchGetMedicalStatus();
    }
  }, [medical, getMedicalStatus]);

  const breadcrumbMap = {
    [t("nav.dashboard")]: "/",
    [t("nav.pharmaceuticals")]: "/Medicals",
    [t("nav.editmedical")]: `/editMedical/${code}`,
  };

  const onSubmit = (updateMedicalValues: MedicalDTO) => {
    setOpenConfirmationMessage(true);
    if (updateMedicalValues?.code)
    {
      if(isEmpty(updateMedicalValues.prod_code))
        updateMedicalValues.prod_code = '\"\"';
      updateMedical(updateMedicalValues, true); //per ora true
    }
  };

  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("LOADING");
  const [openConfirmationMessage, setOpenConfirmationMessage] =
    useState<boolean>(false);

  useEffect(() => {
    if (activityTransitionState === "TO_KEEP_EDITING") {
      setOpenConfirmationMessage(false);
    }
  }, [activityTransitionState, updateMedicalReset, getMedical, code]);

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

const switchGetMedicalStatus = () =>
{
  switch(getMedicalStatus)
  {
    case "IDLE":
      // if(isEmpty(medical.data))
      //   setActivityTransitionState("LOADING");
      // else
        setActivityTransitionState("IDLE");
      break;
    case "LOADING":
      setActivityTransitionState("LOADING");
      break;
    case "FAIL":
    case "SUCCESS_EMPTY":
      setActivityTransitionState("FAIL");
      break;
    case "SUCCESS":
      setActivityTransitionState("SUCCESS");
      break;
    default:
      setActivityTransitionState("IDLE");
      break;
  }
};

const EditForm = (): JSX.Element | undefined => {
  switch(activityTransitionState)
  {
    case "LOADING":
      return (
        <h3 className="medicals__loading">{t("common.loading")}</h3>
      );
    case "FAIL":
      return (<InfoBox type="warning" message={t("common.searchnotfound")} />);
    case "IDLE":
    case "SUCCESS": 
    return (<MedicalDataForm
            fields={updateFields(initialFields, medical?.data)}
            onSubmit={onSubmit}
            submitButtonLabel={t("common.submit")}
            resetButtonLabel={t("common.clearall")}
            isLoading={isLoading}
            shouldResetForm={shouldResetForm}
            resetFormCallback={resetFormCallback}
          />);
    default:
      return (<InfoBox type="warning" message={t("common.searchnotfound")} />);
  }
}

  return (
    <div className="editMedical">
      <AppHeader
        userCredentials={userCredentials}
        breadcrumbMap={breadcrumbMap}
      />
      <div className="editMedical__background">
        <div className="editMedical__content">
        <div className="editMedical__title">
            {`${t("nav.editmedical")}: ${
              medical.data?.description || ''
            }`}
            </div>
            {EditForm()}
          
        </div>
      </div>
      <div ref={infoBoxRef}>
        {hasFailed && (
          <InfoBox type="error" message={t("common.somethingwrong")} />
        )}
      </div>
      <ConfirmationDialog
        isOpen={hasSucceeded}
        title="Medical Updated"
        icon={checkIcon}
        info={t("common.medicalregistrationsuccessfull")}
        primaryButtonLabel={t("common.dashboard")}
        secondaryButtonLabel={t("common.keepediting")}
        handlePrimaryButtonClick={() =>
          setActivityTransitionState("LOADING")
        }
        handleSecondaryButtonClick={() =>
          setActivityTransitionState("IDLE")
        }
      />
      <Footer />
    </div>
  );

}

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.authentication.data,
  isLoading: state.medicals.selectedMedical.status === "LOADING" ||  state.medicals.editMedical.status === "LOADING" ,
  hasSucceeded: state.medicals.editMedical.status === "SUCCESS",
  hasFailed: state.medicals.selectedMedical.status === "FAIL" ||  state.medicals.editMedical.status === "FAIL",
  medical: state.medicals.selectedMedical || {},
  getMedicalStatus: state.medicals.selectedMedical.status || "IDLE",
});

const mapDispatchToProps: IDispatchProps = {
  getMedical,
  updateMedicalReset,
  updateMedical,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMedicalActivity);
