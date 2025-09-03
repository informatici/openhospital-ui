import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { Permission } from "libraries/permissionUtils/Permission";
import { scrollToElement } from "libraries/uiUtils/scrollToElement";
import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  newConditioning,
  newConditioningReset,
  updateConditioningReset,
} from "state/conditionings";
import { IState } from "types";
import checkIcon from "../../../assets/check-icon.png";
import { ConditioningDTO } from "../../../generated";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import InfoBox from "../infoBox/InfoBox";
import ConditioningForm from "./conditioningForm/conditioningForm";
import ConditioningTable from "./conditioningTable/ConditioningTable";
import { initialFields } from "./consts";
import "./styles.scss";
import { ConditioningTransitionState } from "./types";

const Conditioning: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [creationMode, setCreationMode] = useState(true);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<ConditioningTransitionState>("IDLE");
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const createStatus = useAppSelector(
    (state) => state.conditioning.newConditioning.status
  );

  const patient = useAppSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const errorMessage = useAppSelector(
    (state) =>
      state.conditioning.newConditioning.error?.message ||
      t("common.somethingwrong")
  );

  const onSubmit = (conditioning: ConditioningDTO) => {
    if (creationMode) {
      conditioning.patient = patient!;
      dispatch(newConditioning(conditioning));
    }
  };

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(newConditioningReset());
      dispatch(updateConditioningReset());
      setShouldResetForm(true);
      setShouldUpdateTable(true);
    }
  }, [dispatch, patient, activityTransitionState]);

  const resetFormCallback = () => {
    setShouldResetForm(true);
    scrollToElement(null);
  };

  const onEdit = (row: ConditioningDTO) => {
    console.log("Edit conditioning row:", row);
    setCreationMode(false);
    scrollToElement(null);
  };

  return (
    <div className="Conditioning">
      <Permission require="conditioning.new">
        <ConditioningForm
          fields={initialFields}
          submitButtonLabel={t("common.save")}
          resetButtonLabel={t("common.reset")}
          isLoading={createStatus === "LOADING"}
          onSubmit={onSubmit}
          shouldResetForm={shouldResetForm}
          resetFormCallback={resetFormCallback}
        />
      </Permission>

      {createStatus === "FAIL" && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="error" message={errorMessage} />
        </div>
      )}

      <ConditioningTable
        handleEdit={onEdit}
        shouldUpdateTable={shouldUpdateTable}
      />

      <ConfirmationDialog
        isOpen={createStatus === "SUCCESS"}
        title={t("conditioning.created")}
        icon={checkIcon}
        info={t("conditioning.createsuccess")}
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
    </div>
  );
};

export default Conditioning;
