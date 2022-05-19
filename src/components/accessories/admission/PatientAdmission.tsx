import React, { FC, useEffect, useRef, useState } from "react";
import AdmissionForm from "./admissionForm/AdmissionForm";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../types";
import { AdmissionTransitionState } from "./types";
import { AdmissionDTO } from "../../../generated";
import InfoBox from "../infoBox/InfoBox";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import checkIcon from "../../../assets/check-icon.png";
import {
  createAdmission,
  createAdmissionReset,
  getCurrentAdmissionByPatientId,
  updateAdmission,
  updateAdmissionReset,
} from "../../../state/admissions/actions";
import { useFields } from "./useFields";
import { getPatientThunk } from "../../../state/patients/actions";
import PatientAdmissionTable from "./admissionTable/AdmissionTable";
import { isEmpty } from "lodash";

const PatientAdmission: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [creationMode, setCreationMode] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [admissionToEdit, setAdmissionToEdit] = useState<
    AdmissionDTO | undefined
  >();
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<AdmissionTransitionState>("IDLE");

  const patient = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );
  const username = useSelector(
    (state: IState) => state.main.authentication.data?.username
  );

  const currentAdmission = useSelector(
    (state: IState) => state.admissions.currentAdmissionByPatientId.data
  );

  const currentAdmissionStatus = useSelector(
    (state: IState) => state.admissions.currentAdmissionByPatientId.status
  );

  const createStatus = useSelector<IState>(
    (state) => state.admissions.createAdmission.status
  );

  const updateStatus = useSelector<IState>(
    (state) => state.admissions.updateAdmission.status
  );

  const errorMessage = useSelector<IState>(
    (state) =>
      state.admissions.createAdmission.error?.message ||
      state.admissions.updateAdmission.error?.message ||
      t("common.somethingwrong")
  ) as string;

  const fields = useFields(admissionToEdit);

  const onSubmit = (adm: AdmissionDTO) => {
    setShouldResetForm(false);
    if (creationMode) {
      adm.patient = patient;
      adm.userID = username;
      adm.abortDate = adm.admDate;
      adm.admitted = 1;
      adm.deleted = "N";
      adm.type = adm.admType?.code;
      adm.id = 0;
      dispatch(createAdmission(adm));
    } else {
      let admissionToSave: AdmissionDTO = {
        ...admissionToEdit,
        transUnit: adm.transUnit,
        admDate: adm.admDate,
        admType: adm.admType,
        diseaseIn: adm.diseaseIn,
        note: adm.note,
        ward: adm.ward,
      };
      if (!isEmpty(admissionToEdit?.disType)) {
        admissionToSave = {
          ...admissionToSave,
          disDate: adm.disDate,
          disType: adm.disType,
          diseaseOut1: adm.diseaseOut1,
          diseaseOut2: adm.diseaseOut2,
          diseaseOut3: adm.diseaseOut3,
        };
      }
      dispatch(updateAdmission(admissionToSave));
    }
  };

  useEffect(() => {
    if (createStatus === "FAIL" || createStatus === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
    }
  }, [createStatus, updateStatus]);

  useEffect(() => {
    dispatch(createAdmissionReset());
    dispatch(updateAdmissionReset());
  }, [dispatch]);

  useEffect(() => {
    if (!creationMode) {
      setShowForm(true);
    } else if (
      creationMode &&
      currentAdmissionStatus !== "SUCCESS" &&
      currentAdmissionStatus !== "IDLE" &&
      !currentAdmission
    ) {
      setShowForm(true);
    } else setShowForm(false);
  }, [currentAdmissionStatus, currentAdmission, creationMode]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(getPatientThunk((patient?.code ?? 0).toString()));
      setCreationMode(true);
      setAdmissionToEdit(undefined);
      dispatch(createAdmissionReset());
      dispatch(updateAdmissionReset());
      dispatch(getCurrentAdmissionByPatientId(patient?.code));
      setShouldUpdateTable(true);
      setShouldResetForm(true);
    }
  }, [dispatch, patient, activityTransitionState]);

  const resetFormCallback = () => {
    setCreationMode(true);
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    setActivityTransitionState("IDLE");
    setAdmissionToEdit(undefined);
    scrollToElement(null);
  };

  useEffect(() => {
    dispatch(getCurrentAdmissionByPatientId(patient?.code));
  }, [patient, dispatch]);

  const onEdit = (row: AdmissionDTO) => {
    setAdmissionToEdit(row);
    setCreationMode(false);
    scrollToElement(null);
  };

  return (
    <div className="patientAdmission">
      {!showForm && (
        <div className={"patientAdmission__subtitle"}>
          <div className={"icon"}></div>
          <div className={"text"}>{t("admission.patientalreadyadmitted")}</div>
        </div>
      )}
      {showForm && (
        <AdmissionForm
          fields={fields}
          onSubmit={onSubmit}
          creationMode={creationMode}
          submitButtonLabel={
            admissionToEdit ? t("common.update") : t("common.save")
          }
          resetButtonLabel={t("common.reset")}
          shouldResetForm={shouldResetForm}
          resetFormCallback={resetFormCallback}
          admitted={!isEmpty(admissionToEdit?.disType)}
          isLoading={createStatus === "LOADING" || updateStatus === "LOADING"}
        />
      )}
      {(createStatus === "FAIL" || createStatus === "FAIL") && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="error" message={errorMessage} />
        </div>
      )}

      <PatientAdmissionTable
        handleEdit={onEdit}
        shouldUpdateTable={shouldUpdateTable}
      />

      <ConfirmationDialog
        isOpen={createStatus === "SUCCESS" || updateStatus === "SUCCESS"}
        title={creationMode ? t("admission.created") : t("admission.updated")}
        icon={checkIcon}
        info={
          creationMode
            ? t("admission.createsuccess")
            : t("admission.updatesuccess")
        }
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
    </div>
  );
};

export default PatientAdmission;
