import classnames from "classnames/dedupe";
import { useFormik } from "formik";
import { get, has, isEmpty } from "lodash";
import React, {
  ChangeEvent,
  FC,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { array, number, object, string } from "yup";
import checkIcon from "../../../../../assets/check-icon.png";
import warningIcon from "../../../../../assets/warning-icon.png";
import { PATHS } from "../../../../../consts";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../../libraries/formDataHandling/functions";
import { createExamReset, updateExamReset } from "../../../../../state/exams";
import { getExamTypes } from "../../../../../state/types/exams";
import { IState } from "../../../../../types";
import Button from "../../../button/Button";
import ConfirmationDialog from "../../../confirmationDialog/ConfirmationDialog";
import SelectField from "../../../selectField/SelectField";
import TextField from "../../../textField/TextField";
import "./styles.scss";
import { IExamProps } from "./types";

import { AddCircle, Delete } from "@mui/icons-material";
import { IconButton, Radio, RadioGroup } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import AutocompleteField from "../../../autocompleteField/AutocompleteField";
import InfoBox from "../../../infoBox/InfoBox";

const ExamForm: FC<IExamProps> = ({
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

  const examStore = useAppSelector((state) => state.exams);

  const examTypeState = useAppSelector(
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

  const procedureOptions = useMemo(
    () => [
      { value: "1", label: t("exam.procedures.1") },
      { value: "2", label: t("exam.procedures.2") },
      { value: "3", label: t("exam.procedures.3") },
    ],
    [t]
  );

  const errorMessage = useMemo(
    () =>
      (creationMode
        ? examStore.examCreate.error?.message
        : examStore.examUpdate.error?.message) ?? t("common.somethingwrong"),
    [
      creationMode,
      t,
      examStore.examCreate.error?.message,
      examStore.examUpdate.error?.message,
    ]
  );

  const initialValues = getFromFields(fields, "value");

  const validationSchema = object({
    code: string().required(t("common.required")),
    description: string().required(t("common.required")),
    examtype: string().required(t("common.required")),
    rows: array().of(string().required(t("common.required"))),
    defaultResult: string().test({
      name: "procedure-1",
      exclusive: true,
      test: function (value) {
        return (
          this.parent.procedure !== 1 ||
          (!isEmpty(value) &&
            (this.parent.rows as string[]).some((item) => item == value))
        );
      },
      message: t("exam.invalidDefaultResult"),
    }),
    procedure: number()
      .test({
        name: "onetwothree",
        exclusive: true,
        test: (value) => [1, 2, 3].includes(value),
        message: t("exam.validateProcedureMinMax"),
      })
      .required(t("common.required")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      formattedValues.examtype = examTypeState.data?.find(
        (item) => item.code === values.examtype
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

  const addExamRow = useCallback(() => {
    formik.setFieldValue("rows", [...formik.values.rows, ""]);
  }, [formik]);

  const removeExamRow = useCallback(
    (index: number) => () => {
      formik.setFieldValue(
        "rows",
        (formik.values.rows as string[]).toSpliced(index, 1)
      );
    },
    [formik]
  );

  const onBlurCallback = useCallback(
    (fieldName: string) =>
      (e: React.FocusEvent<HTMLDivElement>, value: string) => {
        handleBlur(e);
        setFieldValue(fieldName, value);
      },
    [handleBlur, setFieldValue]
  );

  const handleProcedureChange = useCallback(
    (value: string) => {
      setFieldValue("procedure", value);
      const rows = formik.values.rows as string[];
      if (value === "3") {
        setFieldValue("rows", []);
      } else if (rows.length < 2) {
        setFieldValue("rows", rows.length === 1 ? [rows[0], ""] : ["", ""]);
      }
      setFieldValue("defaultResult", "");
    },
    [handleBlur, setFieldValue]
  );

  const handleDefaultResultChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      formik.setFieldValue("defaultResult", e.target.value);
      formik.setFieldError("defaultResult", "");
    },
    [formik, dispatch]
  );

  const cleanUp = useCallback(() => {
    if (creationMode) {
      dispatch(createExamReset());
    } else {
      dispatch(updateExamReset());
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
              fieldName="examtype"
              fieldValue={formik.values.examtype}
              label={t("exam.examtype")}
              isValid={isValid("examtype")}
              errorText={getErrorText("examtype")}
              onBlur={onBlurCallback("examtype")}
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
          <div className="examForm__item halfWidth">
            <SelectField
              fieldName="selectedType"
              fieldValue={formik.values.procedure}
              label={t("exam.procedure")}
              options={procedureOptions}
              errorText={getErrorText("procedure")}
              isValid={isValid("procedure")}
              onChange={handleProcedureChange}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </div>
          {formik.values.procedure !== "2" && (
            <div className="examForm__item halfWidth">
              <TextField
                field={formik.getFieldProps("defaultResult")}
                theme="regular"
                label={t("exam.defaultResult")}
                isValid={isValid("defaultResult")}
                errorText={getErrorText("defaultResult")}
                onBlur={formik.handleBlur}
                type="text"
                disabled={isLoading || formik.values.procedure === "1"}
              />
            </div>
          )}
        </div>

        {["1", "2"].includes(formik.values.procedure) && (
          <RadioGroup
            value={formik.values.defaultResult}
            onChange={handleDefaultResultChange}
            className={classnames("exam-rows", {
              "procedure-2": formik.values.procedure === "2",
            })}
          >
            <span className="title">{t("exam.possibleValues")}</span>
            {formik.values.procedure === "1" && (
              <span className="trailing">{t("exam.defaultValue")}</span>
            )}
            {(formik.values.rows as string[]).map((row, index) => (
              <Fragment key={index}>
                <div className="col-start-1 examForm__item fullWidth">
                  <TextField
                    field={formik.getFieldProps(`rows.${index}`)}
                    theme="regular"
                    label={t("common.option")}
                    isValid={isValid(`rows.${index}`)}
                    errorText={getErrorText(`rows.${index}`)}
                    onBlur={formik.handleBlur}
                    type="text"
                    disabled={isLoading || !creationMode}
                  />
                </div>
                {(formik.values.rows as string[]).length > 2 && (
                  <IconButton onClick={removeExamRow(index)}>
                    <Delete />
                  </IconButton>
                )}
                {formik.values.procedure === "1" && (
                  <Radio
                    checked={
                      !isEmpty(formik.values.defaultResult) &&
                      formik.values.defaultResult === row
                    }
                    value={row}
                    className="radio"
                  />
                )}
              </Fragment>
            ))}
            <IconButton
              onClick={addExamRow}
              className="add-row-icon"
              size="medium"
            >
              <AddCircle />
            </IconButton>
          </RadioGroup>
        )}
        <div className="examForm__buttonSet">
          <div className="submit_button">
            <Button
              type="submit"
              dataCy="submit-form"
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
          info={t("common.resetform")}
          icon={warningIcon}
          primaryButtonLabel={t("common.ok")}
          secondaryButtonLabel={t("common.discard")}
          handlePrimaryButtonClick={handleResetConfirmation}
          handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
        />
        {(creationMode
          ? examStore.examCreate.status === "FAIL"
          : examStore.examUpdate.status === "FAIL") && (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}
        <ConfirmationDialog
          isOpen={
            !!(creationMode
              ? examStore.examCreate.hasSucceeded
              : examStore.examUpdate.hasSucceeded)
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
