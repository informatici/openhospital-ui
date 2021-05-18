import React, {
  FC,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import PatientTherapyTable from "./patientTherapyTable/PatientTherapyTable";
import TherapyForm from "./therapyForm/TherapyForm";
import "./styles.scss";
import {
  IDispatchProps,
  IStateProps,
  TherapyTransitionState,
  TProps,
} from "./types";
import { initialFields } from "./consts";
import { useTranslation } from "react-i18next";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { TherapyDTO } from "../../../generated";
import { connect } from "react-redux";
import { IState } from "../../../types";
const PatientTherapy: FunctionComponent<TProps> = ({
  createTherapy,
  createTherapyReset,
  isLoading,
  hasSucceeded,
  hasFailed,
}) => {
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [therapyTransitionState, setActivityTransitionState] =
    useState<TherapyTransitionState>("IDLE");

  useEffect(() => {
    if (hasFailed) {
      scrollToElement(infoBoxRef.current);
    }
  }, [hasFailed]);

  useEffect(() => {
    if (therapyTransitionState === "TO_RESET") {
      createTherapyReset();
      setShouldResetForm(true);
      setShouldUpdateTable(true);
    }
  }, [therapyTransitionState, createTherapyReset]);

  const onSubmit = (therapy: TherapyDTO) => {
    setShouldResetForm(false);
    createTherapy(therapy);
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };

  return (
    <div className="patientTherapy">
      <TherapyForm
        fields={initialFields}
        onSubmit={onSubmit}
        submitButtonLabel={t("common.savetriage")}
        resetButtonLabel={t("common.discard")}
        shouldResetForm={shouldResetForm}
        resetFormCallback={resetFormCallback}
        isLoading={isLoading}
      />
      <PatientTherapyTable shouldUpdateTable={shouldUpdateTable} />
    </div>
  );
};
const mapStateToProps = (state: IState): IStateProps => ({
  isLoading: false,
  hasSucceeded: true,
  hasFailed: false,
});

const mapDispatchToProps: IDispatchProps = {
  createTherapy: () => {},
  createTherapyReset: () => {},
};
export default connect(mapStateToProps, mapDispatchToProps)(PatientTherapy);
