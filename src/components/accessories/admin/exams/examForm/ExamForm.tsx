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
import { object, string, number } from "yup";
import warningIcon from "../../../../../assets/warning-icon.png";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../../libraries/formDataHandling/functions";
import checkIcon from "../../../../../assets/check-icon.png";
import Button from "../../../button/Button";
import ConfirmationDialog from "../../../confirmationDialog/ConfirmationDialog";
import TextField from "../../../textField/TextField";
import "./styles.scss";
import { IExamProps } from "./types";

import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../types";
import { useNavigate } from "react-router";
import { IExamState } from "../../../../../state/exams/types";
import { PATHS } from "../../../../../consts";
import { createExamReset } from "../../../../../state/exams/actions";
import { getExamTypes } from "../../../../../state/types/exams/actions";

import InfoBox from "../../../infoBox/InfoBox";
import AutocompleteField from "../../../autocompleteField/AutocompleteField";

const ExamForm: FC<IExamProps> = ({
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

  const examStore = useSelector<IState, IExamState>((state) => state.exams);

  
  const examTypeState = useSelector(
    (state: IState) => state.types.exams.getAll
  );
  const examTypeStateOptions = useMemo(
    () =>
      examTypeState.data?.map((item) => ({
        value: item.code,
        label: item.description,
      })) ?? [],
    [examTypeState.data]
  );

  const errorMessage = useMemo(
    () =>
      (creationMode
        ? examStore.examCreate.error?.message
        : // FIXME: examUpdate below ↓
          examStore.examCreate.error?.message) ?? t("common.somethingwrong"),
    [
      creationMode,
      t,
      examStore.examCreate.error?.message,
      // examStore.examCreate.error?.message, // examUpdate
    ]
  );

  const initialValues = getFromFields(fields, "value");

  const validationSchema = object({
    code: string().required(t("common.required")),
    description: string().required(t("common.required")),
    type: string().required(t("common.required")),
    procedure: number().positive().required(t("common.required")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      formattedValues.type = examTypeState.data?.find(
        (item) => item.code === values.type
      );
      onSubmit(formattedValues as any);
    },
  });

  const { setFieldValue, handleBlur } = formik;

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

  const onBlurCallback = useCallback(
    (fieldName: string) =>
      (e: React.FocusEvent<HTMLDivElement>, value: string) => {
        handleBlur(e);
        setFieldValue(fieldName, value);
      },
    [handleBlur, setFieldValue]
  );

  const cleanUp = useCallback(() => {
    if (creationMode) {
      dispatch(createExamReset());
    } else {
      dispatch(createExamReset()); // FIXME: update
    }
  }, [creationMode, dispatch]);

  useEffect(() => {
    dispatch(getExamTypes());
  }, [dispatch]);

  useEffect(() => {
    return cleanUp;
  }, [cleanUp]);

  return (
    <div className="examForm">
      <form className="examForm__form" onSubmit={formik.handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="examForm__item fullWidth">
            <AutocompleteField
              fieldName="type"
              fieldValue={formik.values.type}
              label={t("exam.examtype")}
              isValid={isValid("type")}
              errorText={getErrorText("type")}
              onBlur={onBlurCallback("type")}
              options={examTypeStateOptions}
              loading={examTypeState.status === "LOADING"}
              disabled={isLoading}
            />
          </div>
          <div className="examForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("code")}
              theme="regular"
              label={t("exam.code")}
              isValid={isValid("code")}
              errorText={getErrorText("code")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading || !creationMode}
            />
          </div>
          <div className="examForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("description")}
              theme="regular"
              label={t("exam.description")}
              isValid={isValid("description")}
              errorText={getErrorText("description")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="examForm__item">
            <TextField
              field={formik.getFieldProps("procedure")}
              theme="regular"
              label={t("exam.procedure")}
              isValid={isValid("procedure")}
              errorText={getErrorText("procedure")}
              onBlur={formik.handleBlur}
              type="number"
              disabled={isLoading}
            />
          </div>
          <div className="examForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("defaultResult")}
              theme="regular"
              label={t("exam.defaultResult")}
              isValid={isValid("defaultResult")}
              errorText={getErrorText("defaultResult")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="examForm__buttonSet">
          <div className="submit_button">
            <Button type="submit" variant="contained" disabled={isLoading}>
              {submitButtonLabel}
            </Button>
          </div>
          <div className="reset_button">
            <Button
              type="reset"
              variant="text"
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
          info={t("common.resetform")}
          icon={warningIcon}
          primaryButtonLabel={t("common.ok")}
          secondaryButtonLabel={t("common.discard")}
          handlePrimaryButtonClick={handleResetConfirmation}
          handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
        />
        {(creationMode
          ? examStore.examCreate.status === "FAIL"
          : examStore.examCreate.status === "FAIL") && ( // FIXME update
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}
        <ConfirmationDialog
          isOpen={
            !!(creationMode
              ? examStore.examCreate.hasSucceeded
              : examStore.examCreate.hasSucceeded) // FIXME update
          }
          title={creationMode ? t("exam.created") : t("exam.updated")}
          icon={checkIcon}
          info={
            creationMode
              ? t("exam.createSuccess")
              : t("exam.updateSuccess", { code: formik.values.code })
          }
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() => {
            navigate(PATHS.admin_exams);
          }}
          handleSecondaryButtonClick={() => ({})}
        />
      </form>
    </div>
  );
};

export default ExamForm;
