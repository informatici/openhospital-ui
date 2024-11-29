import { Cancel } from "@mui/icons-material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { get, has } from "lodash";
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { object, string } from "yup";
import checkIcon from "../../../../../../../assets/check-icon.png";
import warningIcon from "../../../../../../../assets/warning-icon.png";
import { PATHS } from "../../../../../../../consts";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../../../../libraries/formDataHandling/functions";
import {
  createDiseaseTypeReset,
  updateDiseaseTypeReset,
} from "../../../../../../../state/types/diseases";
import Button from "../../../../../button/Button";
import ConfirmationDialog from "../../../../../confirmationDialog/ConfirmationDialog";
import InfoBox from "../../../../../infoBox/InfoBox";
import TextField from "../../../../../textField/TextField";
import "./styles.scss";
import { IDiseaseTypeFormProps } from "./types";

const DiseaseTypeForm: FC<IDiseaseTypeFormProps> = ({
  fields,
  onSubmit,
  creationMode,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const [openCancelConfirmation, setOpenCancelConfirmation] = useState(false);

  const diseaseTypesStore = useAppSelector((state) => state.types.diseases);

  const errorMessage = useMemo(
    () =>
      (creationMode
        ? diseaseTypesStore.create.error?.message
        : diseaseTypesStore.update.error?.message) ??
      t("common.somethingwrong"),
    [
      creationMode,
      t,
      diseaseTypesStore.create.error?.message,
      diseaseTypesStore.update.error?.message,
    ]
  );

  const initialValues = getFromFields(fields, "value");

  const validationSchema = object({
    code: string().required(t("common.required")),
    description: string().required(t("common.required")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      onSubmit(formattedValues as any);
    },
  });

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  const handleResetConfirmationDialog = useCallback(
    (value: boolean) => () => {
      setOpenResetConfirmation(value);
    },
    [setOpenResetConfirmation]
  );

  const handleCancelConfirmationDialog = useCallback(
    (value: boolean) => () => {
      setOpenCancelConfirmation(value);
    },
    [setOpenCancelConfirmation]
  );

  const handleResetConfirmation = useCallback(() => {
    setOpenResetConfirmation(false);
    formik.resetForm();
  }, [navigate, formik.resetForm, setOpenResetConfirmation]);

  const handleCancelConfirmation = useCallback(() => {
    setOpenCancelConfirmation(false);
    navigate(-1);
  }, [navigate, setOpenCancelConfirmation]);

  const cleanUp = useCallback(() => {
    if (creationMode) {
      dispatch(createDiseaseTypeReset());
    } else {
      dispatch(updateDiseaseTypeReset());
    }
  }, [creationMode, dispatch]);

  useEffect(() => {
    return cleanUp;
  }, [cleanUp]);

  return (
    <div className="diseaseTypesForm">
      <div className="form__header">
        <div className="form__actions">
          <Button
            dataCy="cancel-form"
            onClick={handleCancelConfirmationDialog(true)}
            type="button"
            variant="contained"
            color="primary"
          >
            <Cancel fontSize="small" />
            {t("common.discard")}
          </Button>
        </div>
      </div>
      <form className="diseaseTypesForm__form" onSubmit={formik.handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="diseaseTypesForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("code")}
              theme="regular"
              label={t("diseaseTypes.code")}
              isValid={isValid("code")}
              errorText={getErrorText("code")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading || !creationMode}
            />
          </div>
          <div className="diseaseTypesForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("description")}
              theme="regular"
              label={t("diseaseTypes.description")}
              isValid={isValid("description")}
              errorText={getErrorText("description")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="diseaseTypesForm__buttonSet">
          <div className="submit_button">
            <Button
              dataCy="submit-form"
              type="submit"
              variant="contained"
              disabled={isLoading}
            >
              {submitButtonLabel}
            </Button>
          </div>
          <div className="reset_button">
            <Button
              dataCy="reset-form"
              type="reset"
              variant="text"
              disabled={isLoading || !formik.dirty}
              onClick={handleResetConfirmationDialog(true)}
            >
              {resetButtonLabel}
            </Button>
          </div>
        </div>
        <ConfirmationDialog
          isOpen={openCancelConfirmation}
          title={t("common.cancel")}
          info={t("common.cancelMessage")}
          icon={warningIcon}
          primaryButtonLabel={t("common.ok")}
          secondaryButtonLabel={t("common.discard")}
          handlePrimaryButtonClick={handleCancelConfirmation}
          handleSecondaryButtonClick={handleCancelConfirmationDialog(false)}
        />
        <ConfirmationDialog
          isOpen={openResetConfirmation}
          title={t("common.reset")}
          info={t("common.resetform")}
          icon={warningIcon}
          primaryButtonLabel={t("common.ok")}
          secondaryButtonLabel={t("common.back")}
          handlePrimaryButtonClick={handleResetConfirmation}
          handleSecondaryButtonClick={handleResetConfirmationDialog(false)}
        />
        {(creationMode
          ? diseaseTypesStore.create.status === "FAIL"
          : diseaseTypesStore.update.status === "FAIL") && (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}
        <ConfirmationDialog
          isOpen={
            !!(creationMode
              ? diseaseTypesStore.create.hasSucceeded
              : diseaseTypesStore.update.hasSucceeded)
          }
          title={
            creationMode ? t("diseaseTypes.created") : t("diseaseTypes.updated")
          }
          icon={checkIcon}
          info={
            creationMode
              ? t("diseaseTypes.createSuccess")
              : t("diseaseTypes.updateSuccess", { code: formik.values.code })
          }
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() => {
            navigate(PATHS.admin_diseases_types);
          }}
          handleSecondaryButtonClick={() => ({})}
        />
      </form>
    </div>
  );
};

export default DiseaseTypeForm;
