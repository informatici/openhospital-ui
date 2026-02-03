import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { isEmpty } from "lodash";
import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { getPatient } from "state/patients";
import checkIcon from "../../../assets/check-icon.png";
import { AdmissionDTO, PatientDTOStatusEnum } from "../../../generated";
import { usePermission } from "../../../libraries/permissionUtils/usePermission";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import {
  createAdmission,
  createAdmissionReset,
  getCurrentAdmission,
  getCurrentAdmissionReset,
  updateAdmission,
  updateAdmissionReset,
} from "../../../state/admissions";
import { getLastOpd } from "../../../state/opds";
import { IState } from "../../../types";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import { CurrentAdmission } from "../currentAdmission/CurrentAdmission";
import InfoBox from "../infoBox/InfoBox";
import AdmissionForm from "./admissionForm/AdmissionForm";
import PatientAdmissionTable from "./admissionTable/AdmissionTable";
import "./styles.scss";
import { AdmissionTransitionState } from "./types";
import { useFields } from "./useFields";

const PatientAdmission: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const canCreate = usePermission("admissions.create");
  const canUpdate = usePermission("admissions.update");
  const { id } = useParams();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [creationMode, setCreationMode] = useState(true);
  const [isEditingCurrent, setIsEditingCurrent] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [admissionToEdit, setAdmissionToEdit] = useState<
    AdmissionDTO | undefined
  >();
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<AdmissionTransitionState>("IDLE");

  const patient = useAppSelector(
    (state: IState) => state.patients.selectedPatient.data
  );
  const username = useAppSelector(
    (state: IState) => state.main.authentication.data?.username
  );

  const currentAdmission = useAppSelector(
    (state: IState) => state.admissions.currentAdmissionByPatientId.data
  );

  const createStatus = useAppSelector(
    (state) => state.admissions.createAdmission.status
  );

  const updateStatus = useAppSelector(
    (state) => state.admissions.updateAdmission.status
  );

  const errorMessage = useAppSelector(
    (state) =>
      state.admissions.createAdmission.error?.message ||
      state.admissions.updateAdmission.error?.message ||
      t("common.somethingwrong")
  ) as string;

  const lastOpd = useAppSelector((state) => state.opds.lastOpd.data);

  const lastOpdStatus = useAppSelector((state) => state.opds.lastOpd.status);

  const patientCode = useAppSelector(
    (state) => state.patients.selectedPatient.data?.code
  );

  useEffect(() => {
    if (patientCode && creationMode) {
      dispatch(getLastOpd(parseInt(id!!)));
    }
  }, [dispatch, patientCode, creationMode, id]);

  const fields = useFields(admissionToEdit, lastOpd?.disease);

  const onSubmit = (adm: AdmissionDTO) => {
    setShouldResetForm(false);
    if (creationMode) {
      adm.patient = patient;
      adm.userID = username;
      adm.abortDate = adm.admDate;
      adm.admitted = 1;
      adm.deleted = "N";
      if (adm.admType) adm.type = adm.admType.code;
      adm.id = 0;
      dispatch(createAdmission(adm));
    } else {
      let admissionToSave: AdmissionDTO = {
        ...admissionToEdit,
        deleted: "N",
        type: adm.type,
        admitted: adm.admitted,
        fhu: adm.fhu,
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
    if (createStatus === "FAIL" || updateStatus === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
    }
  }, [createStatus, updateStatus]);

  useEffect(() => {
    dispatch(createAdmissionReset());
    dispatch(updateAdmissionReset());
  }, [dispatch]);

  useEffect(() => {
    if (creationMode && !!currentAdmission) {
      setShowForm(false);
    } else setShowForm(true);
  }, [currentAdmission, creationMode]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(createAdmissionReset());
      dispatch(updateAdmissionReset());
      setShouldUpdateTable(true);
      setShouldResetForm(true);
    }
  }, [dispatch, patient, activityTransitionState]);

  useEffect(() => {
    if (createStatus === "SUCCESS" || updateStatus === "SUCCESS") {
      dispatch(getPatient(id!!));
      dispatch(getCurrentAdmission(parseInt(id!!)));
    }
  }, [createStatus, dispatch, id, updateStatus]);

  const resetFormCallback = () => {
    setCreationMode(true);
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    setActivityTransitionState("IDLE");
    setAdmissionToEdit(undefined);
    scrollToElement(null);
  };

  useEffect(() => {
    dispatch(getCurrentAdmission(parseInt(id!!)));
    return () => {
      dispatch(getCurrentAdmissionReset());
    };
  }, [dispatch, id]);

  const onEdit = (row: AdmissionDTO) => {
    setAdmissionToEdit(row);
    setCreationMode(false);
    scrollToElement(null);
  };

  const onCurrentAdmissionChange = (value: boolean) => {
    setIsEditingCurrent(value);
  };

  return (
    <div className="patientAdmission">
      {patient?.status === PatientDTOStatusEnum.I && (
        <InfoBox type="info" message={t("admission.patientalreadyadmitted")} />
      )}
      {!showForm && currentAdmission && (
        <CurrentAdmission onEditChange={onCurrentAdmissionChange} />
      )}
      {showForm && (creationMode ? canCreate : canUpdate) && (
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
          isLoading={
            createStatus === "LOADING" ||
            updateStatus === "LOADING" ||
            lastOpdStatus === "LOADING"
          }
        />
      )}
      {(createStatus === "FAIL" || updateStatus === "FAIL") && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="error" message={errorMessage} />
        </div>
      )}

      <PatientAdmissionTable
        handleEdit={onEdit}
        shouldUpdateTable={shouldUpdateTable}
      />

      <ConfirmationDialog
        isOpen={
          (createStatus === "SUCCESS" || updateStatus === "SUCCESS") &&
          !isEditingCurrent
        }
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
