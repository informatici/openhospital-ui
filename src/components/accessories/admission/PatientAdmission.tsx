import React, { FC, useEffect, useRef, useState } from "react";
import AdmissionForm from "./admissionForm/AdmissionForm";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../types";
import { AdmissionTransitionState } from "./types";
import { initialFields } from "./consts";
import { AdmissionDTO } from "../../../generated";
import InfoBox from "../infoBox/InfoBox";
import PatientAdmissionTable from "./admissionTable/AdmissionTable";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import checkIcon from "../../../assets/check-icon.png";
import {
  createAdmission,
  createAdmissionReset,
  getCurrentAdmissionByPatientId,
  updateAdmission,
  updateAdmissionReset,
} from "../../../state/admissions/actions";
import { differenceInDays } from "../../../libraries/formDataHandling/functions";
import { AdmissionFormFieldName } from "./admissionForm/types";
import { TFields } from "../../../libraries/formDataHandling/types";
type ResultType = {
  status: string | undefined;
  action: "create" | "update";
};
const PatientAdmission: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<AdmissionTransitionState>("IDLE");

  const currentAdmission = useSelector(
    (state: IState) => state.admissions.currentAdmissionByPatientId.data
  );

  const patient = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );
  const username = useSelector(
    (state: IState) => state.main.authentication.data?.displayName
  );

  const result = useSelector<IState, ResultType>((state) => {
    return {
      status:
        state.admissions.createAdmission.status !== "IDLE"
          ? state.admissions.createAdmission.status
          : state.admissions.updateAdmission.status,
      action:
        state.admissions.createAdmission.status !== "IDLE"
          ? "create"
          : "update",
    };
  });

  const onSubmit = (adm: AdmissionDTO) => {
    setShouldResetForm(false);
    if (!currentAdmission) {
      adm.patient = patient;
      adm.userID = username;
      adm.abortDate = adm.admDate;
      adm.admitted = 1;
      dispatch(createAdmission(adm));
    } else {
      const dischargeToSave: AdmissionDTO = {
        ...currentAdmission,
        disDate: adm.disDate,
        disType: adm.disType,
        diseaseOut1: adm.diseaseOut1,
        diseaseOut2: adm.diseaseOut2,
        diseaseOut3: adm.diseaseOut3,
        admitted: 0,
      };
      dispatch(updateAdmission(dischargeToSave));
    }
  };

  useEffect(() => {
    if (result && result.status === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
    }
  }, [result]);

  useEffect(() => {
    dispatch(createAdmissionReset());
    dispatch(updateAdmissionReset());
  }, [dispatch]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      setShouldUpdateTable(true);
      dispatch(updateAdmissionReset());
      dispatch(getCurrentAdmissionByPatientId(patient?.code));
      dispatch(createAdmissionReset());
      setShouldResetForm(true);
    }
  }, [dispatch, activityTransitionState]);

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };

  const fields: TFields<AdmissionFormFieldName> = {
    ...initialFields,
    ward: {
      value: currentAdmission?.ward?.code ?? "",
      type: "text",
    },
    admType: {
      value: currentAdmission?.admType?.code ?? "",
      type: "text",
    },
    diseaseIn: {
      value: currentAdmission?.diseaseIn?.code?.toString() ?? "",
      type: "text",
    },
    admDate: {
      value: currentAdmission?.admDate ?? "",
      type: "date",
    },
    note: {
      value: currentAdmission?.note ?? "",
      type: "text",
    },
    bedDays: {
      value: differenceInDays(
        new Date(+(currentAdmission?.admDate ?? "")),
        new Date()
      ).toString(),
      type: "number",
    },
    transUnit: {
      value: currentAdmission?.transUnit?.toString() ?? "",
      type: "text",
    },
  };

  useEffect(() => {
    dispatch(getCurrentAdmissionByPatientId(patient?.code));
  }, [patient, dispatch]);

  return (
    <div className="patientAdmission">
      <AdmissionForm
        fields={currentAdmission ? fields : initialFields}
        onSubmit={onSubmit}
        submitButtonLabel={t("common.save")}
        resetButtonLabel={t("common.discard")}
        shouldResetForm={shouldResetForm}
        resetFormCallback={resetFormCallback}
        isLoading={result?.status === "LOADING"}
        admitted={currentAdmission?.admitted == 1}
      />
      {result?.status === "FAIL" && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="error" message={t("common.somethingwrong")} />
        </div>
      )}

      <PatientAdmissionTable shouldUpdateTable={shouldUpdateTable} />

      <ConfirmationDialog
        isOpen={result?.status === "SUCCESS"}
        title={
          result?.action === "update"
            ? t("admission.discharged")
            : t("admission.created")
        }
        icon={checkIcon}
        info={
          result?.action === "update"
            ? t("admission.dischargesuccess")
            : t("admission.createsuccess")
        }
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
    </div>
  );
};

export default PatientAdmission;
