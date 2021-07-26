import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect, useSelector } from "react-redux";
import { IState } from "../../../types";
import { initialFields } from "./consts";
import {
  createOpd,
  createOpdReset,
  getOpds,
} from "../../../state/opds/actions";
import { getDiseasesOpd } from "../../../state/diseases/actions";
import PatientOPDForm from "./patientOPDForm/PatientOPDForm";
import {
  IDispatchProps,
  IStateProps,
  TActivityTransitionState,
  TProps,
} from "./types";
import { OpdDTO } from "../../../generated";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import InfoBox from "../infoBox/InfoBox";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import checkIcon from "../../../assets/check-icon.png";
import PatientOPDTable from "./patientOPDTable/PatientOPDTable";

const PatientOPD: FunctionComponent<TProps> = ({
  createOpd,
  createOpdReset,
  getDiseasesOpd,
  getOpds,
  isLoading,
  hasSucceeded,
  hasFailed,
}) => {
  const { t } = useTranslation();

  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");
  const [shouldUpdateTable, setShouldUpdateTable] = useState(true);

  useEffect(() => {
    if (hasFailed) {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
    }
  }, [hasFailed]);

  useEffect(() => {
    getDiseasesOpd();
  }, [getDiseasesOpd]);

  const patient = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  useEffect(() => {
    getOpds(patient?.code);
  }, [patient?.code, shouldUpdateTable, getOpds]);

  const userId = useSelector(
    (state: IState) => state.main.authentication.data?.displayName
  );

  const diseasesData = useSelector(
    (state: IState) => state.diseases.diseasesOpd.data
  );
  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      createOpdReset();
      setShouldResetForm(true);
      setShouldUpdateTable(true);
    }
  }, [activityTransitionState, createOpdReset]);

  const onSubmit = (createOpdValues: OpdDTO) => {
    setShouldResetForm(false);
    createOpdValues.patientCode = patient?.code;
    createOpdValues.age = patient?.age;
    createOpdValues.sex = patient?.sex;
    createOpdValues.userID = userId;
    createOpd(createOpdValues, diseasesData);
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };
  return (
    <div className="patientOpd">
      <PatientOPDForm
        fields={initialFields}
        onSubmit={onSubmit}
        submitButtonLabel={t("common.saveopd")}
        resetButtonLabel={t("common.discard")}
        isLoading={isLoading}
        shouldResetForm={shouldResetForm}
        resetFormCallback={resetFormCallback}
      />
      <div ref={infoBoxRef}>
        {hasFailed && (
          <InfoBox
            type="error"
            message="Something went wrong, please retry later."
          />
        )}
      </div>
      <ConfirmationDialog
        isOpen={hasSucceeded}
        title="Opd Created"
        icon={checkIcon}
        info="The Opd registration was successful."
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
      <PatientOPDTable shouldUpdateTable={shouldUpdateTable} />
    </div>
  );
};
const mapStateToProps = (state: IState): IStateProps => ({
  isLoading: state.opds.createOpd === "LOADING",
  hasSucceeded: state.opds.createOpd.status === "SUCCESS",
  hasFailed: state.opds.createOpd.status === "FAIL",
});

const mapDispatchToProps: IDispatchProps = {
  createOpd,
  createOpdReset,
  getDiseasesOpd,
  getOpds,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientOPD);
