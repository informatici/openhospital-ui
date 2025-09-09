import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { Permission } from "libraries/permissionUtils/Permission";
import { scrollToElement } from "libraries/uiUtils/scrollToElement";
import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  newConditioning,
  newConditioningReset,
  updateConditioning,
  updateConditioningReset,
} from "state/conditionings";
import { IState } from "types";
import checkIcon from "../../../assets/check-icon.png";
import { ConditioningDTO } from "../../../generated";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import InfoBox from "../infoBox/InfoBox";
import ConditioningForm from "./conditioningForm/conditioningForm";
import ConditioningTable from "./conditioningTable/ConditioningTable";
import "./styles.scss";
import { ConditioningTransitionState } from "./types";
import { useFields } from "./useFields";

const Conditioning: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [creationMode, setCreationMode] = useState(true);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<ConditioningTransitionState>("IDLE");
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [conditioningToEdit, setConditioningToEdit] = useState<
    ConditioningDTO | undefined
  >(undefined);

  const createStatus = useAppSelector(
    (state) => state.conditioning.newConditioning.status
  );

  const updateStatus = useAppSelector(
    (state) => state.conditioning.updateConditioning.status
  );

  const patient = useAppSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const errorMessage = useAppSelector(
    (state) =>
      state.conditioning.newConditioning.error?.message ||
      t("common.somethingwrong")
  );

  useEffect(() => {
    if (createStatus === "FAIL" || updateStatus === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
    }
  }, [createStatus, updateStatus]);

  const fields = useFields(conditioningToEdit);

  const onSubmit = (conditioning: ConditioningDTO) => {
    setShouldResetForm(false);
    if (creationMode) {
      conditioning.patient = patient!;
      dispatch(newConditioning(conditioning));
    } else {
      console.log(conditioningToEdit);
      conditioning.id = conditioningToEdit?.id!;
      conditioning.patient = patient!;
      conditioning.lock = conditioningToEdit?.lock!;
      dispatch(
        updateConditioning({ id: conditioningToEdit?.id!, body: conditioning })
      );
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
    setCreationMode(true);
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    setActivityTransitionState("IDLE");
    setConditioningToEdit(undefined);
    scrollToElement(null);
  };

  const onEdit = (row: ConditioningDTO) => {
    console.log("Edit conditioning row:", row);
    setCreationMode(false);
    setConditioningToEdit(row);
    scrollToElement(null);
  };

  return (
    <div className="Conditioning">
      <Permission require="conditioning.new">
        <ConditioningForm
          fields={fields}
          creationMode={creationMode}
          submitButtonLabel={
            conditioningToEdit ? t("common.update") : t("common.save")
          }
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
        isOpen={createStatus === "SUCCESS" || updateStatus === "SUCCESS"}
        title={
          creationMode ? t("conditioning.created") : t("conditioning.updated")
        }
        icon={checkIcon}
        info={
          creationMode
            ? t("conditioning.createsuccess")
            : t("conditioning.updatesuccess")
        }
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
    </div>
  );
};

export default Conditioning;
