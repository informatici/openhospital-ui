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
  createOperationTypeReset,
  updateOperationTypeReset,
} from "../../../../../../../state/types/operations";
import Button from "../../../../../button/Button";
import ConfirmationDialog from "../../../../../confirmationDialog/ConfirmationDialog";
import InfoBox from "../../../../../infoBox/InfoBox";
import TextField from "../../../../../textField/TextField";
import "./styles.scss";
import { IOperationTypeFormProps } from "./types";

const OperationTypeForm: FC<IOperationTypeFormProps> = ({
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

  const operationTypesStore = useAppSelector((state) => state.types.operations);

  const errorMessage = useMemo(
    () =>
      (creationMode
        ? operationTypesStore.create.error?.message
        : operationTypesStore.update.error?.message) ??
      t("common.somethingwrong"),
    [
      creationMode,
      t,
      operationTypesStore.create.error?.message,
      operationTypesStore.update.error?.message,
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
      onSubmit(formattedValues.code, formattedValues as any);
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
      dispatch(createOperationTypeReset());
    } else {
      dispatch(updateOperationTypeReset());
    }
  }, [creationMode, dispatch]);

  useEffect(() => {
    return cleanUp;
  }, [cleanUp]);

  return (
    <div className="operationTypesForm">
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
      <form className="operationTypesForm__form" onSubmit={formik.handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="operationTypesForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("code")}
              theme="regular"
              label={t("operationTypes.code")}
              isValid={isValid("code")}
              errorText={getErrorText("code")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading || !creationMode}
            />
          </div>
          <div className="operationTypesForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("description")}
              theme="regular"
              label={t("operationTypes.description")}
              isValid={isValid("description")}
              errorText={getErrorText("description")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="operationTypesForm__buttonSet">
          <div className="submit_button">
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              dataCy="submit-form"
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
          title={t("common.discard")}
          info={t("common.discardMessage")}
          icon={warningIcon}
          primaryButtonLabel={t("common.discard")}
          secondaryButtonLabel={t("common.backToEdit")}
          handlePrimaryButtonClick={handleCancelConfirmation}
          handleSecondaryButtonClick={handleCancelConfirmationDialog(false)}
        />
        <ConfirmationDialog
          isOpen={openResetConfirmation}
          title={t("common.reset")}
          info={t("common.resetform")}
          icon={warningIcon}
          primaryButtonLabel={t("common.reset")}
          secondaryButtonLabel={t("common.backToEdit")}
          handlePrimaryButtonClick={handleResetConfirmation}
          handleSecondaryButtonClick={handleResetConfirmationDialog(false)}
        />
        {(creationMode
          ? operationTypesStore.create.status === "FAIL"
          : operationTypesStore.update.status === "FAIL") && (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}
        <ConfirmationDialog
          isOpen={
            !!(creationMode
              ? operationTypesStore.create.hasSucceeded
              : operationTypesStore.update.hasSucceeded)
          }
          title={
            creationMode
              ? t("operationTypes.created")
              : t("operationTypes.updated")
          }
          icon={checkIcon}
          info={
            creationMode
              ? t("operationTypes.createSuccess")
              : t("operationTypes.updateSuccess", { code: formik.values.code })
          }
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() => {
            navigate(PATHS.admin_operations_types);
          }}
          handleSecondaryButtonClick={() => ({})}
        />
      </form>
    </div>
  );
};

export default OperationTypeForm;
