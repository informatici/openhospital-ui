import { useFormik } from "formik";
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
import { object, string } from "yup";
import warningIcon from "../../../../../../../assets/warning-icon.png";
import checkIcon from "../../../../../../../assets/check-icon.png";
import "./styles.scss";
import { IExamTypeFormProps } from "./types";
import { useDispatch, useSelector } from "libraries/hooks/redux";
import { useNavigate } from "react-router";
import { IState } from "../../../../../../../types";
import { IExamTypesState } from "../../../../../../../state/types/exams/types";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../../../../libraries/formDataHandling/functions";
import {
  createExamTypeReset,
  updateExamTypeReset,
} from "../../../../../../../state/types/exams";
import TextField from "../../../../../textField/TextField";
import Button from "../../../../../button/Button";
import ConfirmationDialog from "../../../../../confirmationDialog/ConfirmationDialog";
import InfoBox from "../../../../../infoBox/InfoBox";
import { PATHS } from "../../../../../../../consts";

const ExamTypeForm: FC<IExamTypeFormProps> = ({
  fields,
  onSubmit,
  creationMode,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const examTypesStore = useSelector((state) => state.types.exams);

  const errorMessage = useMemo(
    () =>
      (creationMode
        ? examTypesStore.create.error?.message
        : examTypesStore.update.error?.message) ?? t("common.somethingwrong"),
    [
      creationMode,
      t,
      examTypesStore.create.error?.message,
      examTypesStore.update.error?.message,
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

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    navigate(-1);
  };

  const cleanUp = useCallback(() => {
    if (creationMode) {
      dispatch(createExamTypeReset());
    } else {
      dispatch(updateExamTypeReset());
    }
  }, [creationMode, dispatch]);

  useEffect(() => {
    return cleanUp;
  }, [cleanUp]);

  return (
    <div className="examTypesForm">
      <form className="examTypesForm__form" onSubmit={formik.handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="examTypesForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("code")}
              theme="regular"
              label={t("examTypes.code")}
              isValid={isValid("code")}
              errorText={getErrorText("code")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading || !creationMode}
            />
          </div>
          <div className="examTypesForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("description")}
              theme="regular"
              label={t("examTypes.description")}
              isValid={isValid("description")}
              errorText={getErrorText("description")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="examTypesForm__buttonSet">
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
              type="reset"
              variant="text"
              dataCy="cancel-form"
              disabled={isLoading}
              onClick={() => setOpenResetConfirmation(true)}
            >
              {resetButtonLabel}
            </Button>
          </div>
        </div>
        <ConfirmationDialog
          isOpen={openResetConfirmation}
          title={resetButtonLabel.toUpperCase()}
          info={
            creationMode
              ? t("examTypes.cancelCreation")
              : t("examTypes.cancelUpdate")
          }
          icon={warningIcon}
          primaryButtonLabel={t("common.ok")}
          secondaryButtonLabel={t("common.discard")}
          handlePrimaryButtonClick={handleResetConfirmation}
          handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
        />
        {(creationMode
          ? examTypesStore.create.status === "FAIL"
          : examTypesStore.update.status === "FAIL") && (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}
        <ConfirmationDialog
          isOpen={
            !!(creationMode
              ? examTypesStore.create.hasSucceeded
              : examTypesStore.update.hasSucceeded)
          }
          title={creationMode ? t("examTypes.created") : t("examTypes.updated")}
          icon={checkIcon}
          info={
            creationMode
              ? t("examTypes.createSuccess")
              : t("examTypes.updateSuccess", { code: formik.values.code })
          }
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() => {
            navigate(PATHS.admin_exams_types);
          }}
          handleSecondaryButtonClick={() => ({})}
        />
      </form>
    </div>
  );
};

export default ExamTypeForm;
