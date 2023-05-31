import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import warningIcon from "../../../../assets/warning-icon.png";
import { ExamDTO } from "../../../../generated";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import { getExamRows } from "../../../../state/exams/actions";
import { IState } from "../../../../types";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import DateField from "../../dateField/DateField";
import Button from "../../button/Button";
import TextField from "../../textField/TextField";
import ExamRowTable from "../examRowTable/ExamRowTable";
import "./styles.scss";
import { ExamProps } from "./types";
import moment from "moment";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";

const ExamForm: FC<ExamProps> = ({
  fields,
  onSubmit,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
  creationMode,
  shouldResetForm,
  resetFormCallback,
  labWithRowsToEdit,
  labToEdit,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [currentExamCode, setCurrentExamCode] = useState("");
  const [currentExamProcedure, setCurrentExamProcedure] = useState("");
  const labToEditRows = labWithRowsToEdit.laboratoryRowList ?? [];

  const rowTableHeaders: Array<{
    label: string;
    align: "left" | "right" | "center" | "justify";
  }> = [
    { label: t("lab.resultrow"), align: "left" },
    { label: t("lab.value"), align: "right" },
  ];

  const validationSchema = object({
    labDate: string()
      .required(t("common.required"))
      .test({
        name: "date",
        message: t("common.invaliddate"),
        test: function (value) {
          return moment(value).isValid();
        },
      }),
    exam: string().required(t("common.required")),
    result: string(),
    note: string().test({
      name: "maxLength",
      message: t("common.maxlengthexceeded", { maxLength: 255 }),
      test: function (value) {
        if (!value) return true;
        return value.length <= 255;
      },
    }),
  });

  const initialValues = getFromFields(fields, "value");
  const [rowsData, setRowsData] = useState([...labToEditRows]);

  const examOptionsSelector = (exams: ExamDTO[] | undefined) => {
    if (exams) {
      return exams.map((item) => {
        return {
          value: item.code ?? "",
          label:
            (item.description &&
              item.description?.length > 30 &&
              item.description.slice(0, 30) + "...") ||
            (item.description ?? ""),
        };
      });
    } else return [];
  };

  const examList = useSelector((state: IState) => state.exams.examList.data);

  const examRowOptionsSelector = (state: IState) => {
    if (state.exams.examRowsByExamCode.data) {
      return state.exams.examRowsByExamCode.data.map((item) => {
        return {
          value: item.description ?? "",
          label: item.description ?? "",
        };
      });
    } else return [];
  };

  const examRows = useSelector((state: IState) =>
    examRowOptionsSelector(state)
  );

  const materialsLoading = useSelector(
    (state: IState) => state.laboratories.materials.status === "LOADING"
  );

  const materialsOptionsSelector = (materials: string[] | undefined) => {
    if (materials) {
      return materials.map((item) => {
        let label = item ? t(item) : "";
        return {
          value: item ?? "",
          label:
            (label.length > 30 && label.slice(0, 30) + "...") || (label ?? ""),
        };
      });
    } else return [];
  };

  const materialsList = useSelector(
    (state: IState) => state.laboratories.materials.data
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      onSubmit(
        formattedValues,
        Object.values(rowsData).filter((item) => item)
      );
      setRowsData([]);
    },
  });

  const { setFieldValue, resetForm, handleBlur } = formik;

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
      formik.setFieldTouched(fieldName);
    },
    [setFieldValue]
  );
  useEffect(() => {
    if (initialValues["exam"] !== "") {
      setCurrentExamCode(initialValues["exam"]);
    }
    if (labToEdit) {
      formik.setFieldValue("result", labToEdit.result);
    }
  }, [initialValues]);

  useEffect(() => {
    if (currentExamCode) {
      dispatch(getExamRows(currentExamCode));
    }
    if (currentExamCode && examList) {
      setCurrentExamProcedure(
        examList
          ?.find((item) => item.code === currentExamCode)
          ?.procedure?.toString() ?? ""
      );
    }
  }, [examList, currentExamCode, dispatch]);

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  const onBlurCallback = useCallback(
    (fieldName: string) =>
      (e: React.FocusEvent<HTMLDivElement>, value: string) => {
        handleBlur(e);
        setFieldValue(fieldName, value);
        if (fieldName === "exam") {
          setCurrentExamCode(value);
        }

        // Clear rowsData variable for exam status validation
        if (fieldName === "result") {
          setRowsData([]);
        }
      },
    [setFieldValue, handleBlur]
  );

  const onBlurCallbackForTableRow = useCallback(
    () => (value: string) => {
      setRowsData((rowObjs: string[]) => {
        if (!rowObjs.includes(value)) {
          rowObjs.push(value);
        } else rowObjs = rowObjs.filter((e) => e !== value);
        return rowObjs;
      });
    },
    []
  );

  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    formik.resetForm();
    resetFormCallback();
    setCurrentExamProcedure("");
    setCurrentExamCode("");
  };

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
      resetFormCallback();
      setCurrentExamProcedure("");
      setCurrentExamCode("");
    }
  }, [shouldResetForm, resetForm, resetFormCallback]);

  const examRowsLaoding = useSelector(
    (state: IState) => state.exams.examRowsByExamCode.status === "LOADING"
  );

  const examsLoading = useSelector(
    (state: IState) => state.exams.examList.status === "LOADING"
  );

  return (
    <>
      <div className="patientExamForm">
        <h5 className="formInsertMode">
          {creationMode
            ? t("lab.newlab")
            : t("lab.editlab") + ": " + renderDate(formik.values.labDate)}
        </h5>
        <form className="patientExamForm__form" onSubmit={formik.handleSubmit}>
          <div className="row start-sm center-xs">
            <div className="patientExamForm__item">
              <DateField
                fieldName="date"
                fieldValue={formik.values.labDate}
                disableFuture={false}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("date")}
                errorText={getErrorText("date")}
                label={t("lab.date")}
                onChange={dateFieldHandleOnChange("labDate")}
                disabled={isLoading}
              />
            </div>
            <div className="patientExamForm__item">
              <AutocompleteField
                fieldName="material"
                fieldValue={formik.values.material}
                label={t("lab.material")}
                isValid={isValid("material")}
                errorText={getErrorText("material")}
                onBlur={onBlurCallback("material")}
                isLoading={materialsLoading}
                options={materialsOptionsSelector(materialsList)}
                disabled={isLoading}
              />
            </div>
            <div className="patientExamForm__item fullWidth">
              <AutocompleteField
                fieldName="exam"
                fieldValue={formik.values.exam}
                label={t("lab.exam")}
                isValid={isValid("exam")}
                errorText={getErrorText("exam")}
                onBlur={onBlurCallback("exam")}
                options={examOptionsSelector(examList)}
                isLoading={examsLoading}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="row start-sm center-xs bottom-sm">
            <div className="fullWidth patientExamForm__item">
              {currentExamProcedure === "3" && (
                <TextField
                  multiline={true}
                  field={formik.getFieldProps("result")}
                  theme="regular"
                  label={t("lab.result")}
                  isValid={isValid("result")}
                  errorText={getErrorText("result")}
                  onBlur={formik.handleBlur}
                  type="text"
                  disabled={isLoading}
                />
              )}
              {currentExamProcedure === "2" && (
                <ExamRowTable
                  title={t("lab.resultstitle")}
                  headerData={rowTableHeaders}
                  onBlur={onBlurCallbackForTableRow()}
                  rows={examRows}
                  disabled={isLoading}
                />
              )}
              {currentExamProcedure === "1" && (
                <AutocompleteField
                  fieldName="result"
                  fieldValue={formik.values.result}
                  label={t("lab.result")}
                  isValid={isValid("result")}
                  errorText={getErrorText("result")}
                  onBlur={onBlurCallback("result")}
                  options={examRows}
                  isLoading={examRowsLaoding}
                  disabled={currentExamCode === "" || isLoading}
                />
              )}
            </div>
          </div>
          <div className="row start-sm center-xs bottom-sm">
            <div className="fullWidth patientExamForm__item">
              <TextField
                multiline={true}
                field={formik.getFieldProps("note")}
                theme="regular"
                label={t("lab.note")}
                isValid={isValid("note")}
                errorText={getErrorText("note")}
                onBlur={formik.handleBlur}
                type="text"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="patientExamForm__buttonSet">
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
            primaryButtonLabel={resetButtonLabel}
            secondaryButtonLabel={t("common.discard")}
            handlePrimaryButtonClick={handleResetConfirmation}
            handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
          />
        </form>
      </div>
    </>
  );
};

export default ExamForm;
