import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { get, has, isEmpty } from "lodash";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import checkIcon from "../../../assets/check-icon.png";
import { PatientDTO } from "../../../generated";
import { getFromFields } from "../../../libraries/formDataHandling/functions";
import {
  getPatient,
  updatePatient,
  updatePatientReset,
} from "../../../state/patients";
import Button from "../button/Button";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import InfoBox from "../infoBox/InfoBox";
import TextField from "../textField/TextField";
import { initialFields } from "./consts";
import "./styles.scss";
import { IOwnProps, TActivityTransitionState } from "./types";

export const PatientExtraData: FunctionComponent<IOwnProps> = ({
  readOnly,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [editionMode, setEditionMode] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");
  const patient = useAppSelector(
    (state) => state.patients.selectedPatient.data
  );
  const onSubmit = (values: PatientDTO) => {
    if (values.code) {
      dispatch(updatePatient({ code: values.code, patientDTO: values }));
    }
  };
  const status = useAppSelector((state) => state.patients.updatePatient.status);

  const errorMessage = useAppSelector(
    (state) =>
      state.patients.updatePatient.error?.message || t("common.somethingwrong")
  );

  const formik = useFormik({
    initialValues: getFromFields(initialFields(patient), "value"),
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit({
        ...patient,
        allergies: values.allergies,
        anamnesis: values.anamnesis,
      } as any);
    },
  });

  const onEdit = useCallback(() => {
    setEditionMode(true);
  }, []);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      setEditionMode(false);
      dispatch(updatePatientReset());
      if (patient?.code) {
        dispatch(getPatient(patient?.code?.toString()));
      }
      formik.resetForm();
      setActivityTransitionState("IDLE");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, activityTransitionState]);

  const discardChanges = () => {
    formik.resetForm();
    setEditionMode(false);
  };

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  const isLoading = status === "LOADING";

  return (
    <div className="patientExtraData">
      <div className="patientExtraData_leading">
        {!editionMode && !readOnly && (
          <IconButton onClick={onEdit}>
            <Edit />
          </IconButton>
        )}
      </div>
      <form className="patientExtraData__form" onSubmit={formik.handleSubmit}>
        <div className="patientExtraData__form_item">
          {!editionMode && (
            <span className="item_label">{t("patient.anamnesis")}</span>
          )}
          {editionMode ? (
            <TextField
              field={formik.getFieldProps("anamnesis")}
              multiline={true}
              theme="regular"
              label={t("patient.anamnesis")}
              isValid={isValid("anamnesis")}
              errorText={getErrorText("anamnesis")}
              onBlur={formik.handleBlur}
              type="string"
              disabled={isLoading}
              maxLength={255}
            />
          ) : (
            <p className="item_content">
              {isEmpty(patient?.anamnesis)
                ? t("patient.noanamnesis")
                : patient?.anamnesis}
            </p>
          )}
        </div>
        <div className="patientExtraData__form_item">
          {!editionMode && (
            <span className="item_label">{t("patient.allergies")}</span>
          )}
          {editionMode ? (
            <TextField
              field={formik.getFieldProps("allergies")}
              multiline={true}
              theme="regular"
              label={t("patient.allergies")}
              isValid={isValid("allergies")}
              errorText={getErrorText("allergies")}
              onBlur={formik.handleBlur}
              type="string"
              disabled={isLoading}
              maxLength={255}
            />
          ) : (
            <p className="item_content">
              {isEmpty(patient?.allergies)
                ? t("patient.noallergies")
                : patient?.allergies}
            </p>
          )}
        </div>
        <div className="patientExtraData__form_item">
          <span className="item_label">{t("patient.bloodtype")}</span>
          <p className="item_content">{patient?.bloodType}</p>
        </div>
        {editionMode && (
          <div className="patientExtraData__form__buttonSet">
            <div className="submit_button">
              <Button type="submit" variant="contained" disabled={isLoading}>
                {t("patient.savechanges")}
              </Button>
            </div>
            <div className="reset_button">
              <Button
                variant="text"
                disabled={isLoading}
                onClick={discardChanges}
                type={undefined}
              >
                {t("patient.discardchanges")}
              </Button>
            </div>
          </div>
        )}
      </form>
      {status === "FAIL" && (
        <div>
          <InfoBox type="error" message={errorMessage} />
        </div>
      )}
      <ConfirmationDialog
        isOpen={status === "SUCCESS"}
        title={t("patient.dataupdated")}
        icon={checkIcon}
        info={t("patient.dataupdatedsuccessfully")}
        primaryButtonLabel={t("common.ok")}
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => {}}
      />
    </div>
  );
};
