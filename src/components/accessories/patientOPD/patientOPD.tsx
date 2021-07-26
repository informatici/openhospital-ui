import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect, useDispatch, useSelector } from "react-redux";
import { IState } from "../../../types";
import { initialFields } from "./consts";
import { OpdDTO } from "../../../generated";
import {
  createOpd,
  createOpdReset,
  updateOpd,
  getOpds,
  updateOpdReset,
} from "../../../state/opds/actions";
import { getDiseasesOpd } from "../../../state/diseases/actions";
import PatientOPDForm from "./patientOPDForm/PatientOPDForm";
import {
  IDispatchProps,
  IStateProps,
  TActivityTransitionState,
  TProps,
} from "./types";
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
  const dispatch = useDispatch();

  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");
  const [shouldUpdateTable, setShouldUpdateTable] = useState(true);

  const [opdToEdit, setOpdToEdit] = useState({} as OpdDTO | undefined);

  const updateStatus = useSelector<IState, string | undefined>(
    (state) => state.opds.updateOpd.status
  );

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
      dispatch(updateOpdReset());
      setShouldResetForm(true);
      setShouldUpdateTable(true);
    }
  }, [activityTransitionState, createOpdReset, updateOpdReset]);

  const onSubmit = (opdValuestoSave: OpdDTO) => {
    setShouldResetForm(false);
    opdValuestoSave.patientCode = patient?.code;
    opdValuestoSave.age = patient?.age;
    opdValuestoSave.sex = patient?.sex;
    opdValuestoSave.userID = userId;
    if (opdToEdit && opdToEdit.code) {
      dispatch(updateOpd(opdToEdit.code, opdValuestoSave, diseasesData));
    } else createOpd(opdValuestoSave, diseasesData);
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };

  const onEdit = (row?: OpdDTO) => {
    setOpdToEdit(row);
    scrollToElement(null);
  };

  return (
    <div className="patientOpd">
      <PatientOPDForm
        fields={initialFields}
        opdToEdit={opdToEdit}
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
      <div ref={infoBoxRef}>
        {updateStatus === "FAIL" && (
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
      <ConfirmationDialog
        isOpen={updateStatus === "SUCCESS"}
        title="Opd updated"
        icon={checkIcon}
        info="Opd updated successful!"
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
      <PatientOPDTable
        handleEdit={onEdit}
        shouldUpdateTable={shouldUpdateTable}
      />
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
