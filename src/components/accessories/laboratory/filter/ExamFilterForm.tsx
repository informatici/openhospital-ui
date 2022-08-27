import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@material-ui/core";
import { FilterList } from "@material-ui/icons";
import { differenceInSeconds } from "date-fns";
import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import React, { useCallback, useState } from "react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { date, number, object, string } from "yup";
import {
  DiseaseDTO,
  DiseaseTypeDTO,
  ExamDTO,
  ExamTypeDTO,
  PatientDTO,
} from "../../../../generated";
import {
  getFromFields,
  formatAllFieldValues,
} from "../../../../libraries/formDataHandling/functions";
import DateField from "../../dateField/DateField";
import PatientPicker from "../../patientPicker/PatientPicker";
import SelectField from "../../selectField/SelectField";
import { IExamFilterProps, TFilterValues } from "./types";
import "./styles.scss";
import TextField from "../../textField/TextField";
import { isEmpty } from "lodash";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import { IState } from "../../../../types";
import { useSelector } from "react-redux";
import moment from "moment";
import SmallButton from "../../smallButton/SmallButton";

export const ExamFilterForm: FC<IExamFilterProps> = ({ fields, onSubmit }) => {
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState(true);
  const patient = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const validationSchema = object({
    examName: string(),
    dateFrom: string()
      .required(t("common.required"))
      .test({
        name: "dateValid",
        message: t("common.invaliddate"),
        test: function (value) {
          return moment(value).isValid();
        },
      })
      .test({
        name: "dateTo",
        message: t("lab.validatefromdate"),
        test: function (value) {
          if (!moment(this.parent.dateTo).isValid()) return true;
          return (
            differenceInSeconds(
              new Date(value),
              new Date(this.parent.dateTo)
            ) <= 0
          );
        },
      }),
    dateTo: string()
      .required(t("common.required"))
      .test({
        name: "dateValid",
        message: t("common.invaliddate"),
        test: function (value) {
          return moment(value).isValid();
        },
      })
      .test({
        name: "dateTo",
        message: t("lab.validatetodate"),
        test: function (value) {
          if (!moment(this.parent.dateFrom).isValid()) return true;
          return (
            differenceInSeconds(
              new Date(this.parent.dateFrom),
              new Date(value)
            ) <= 0
          );
        },
      }),
  });

  const initialValues = getFromFields(fields, "value");
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(
        fields,
        values
      ) as TFilterValues;
      onSubmit(formattedValues);
    },
  });

  const { setFieldValue, handleBlur } = formik;

  const mapToOptions = (value: ExamDTO) => ({
    value: value.description ?? "",
    label: value.description ?? "",
  });
  const examOptions = useSelector((state: IState) => {
    return state.exams.examList.data?.map((e) => mapToOptions(e)) ?? [];
  });

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (val: Date | null) => {
      setFieldValue(fieldName, val);
      if (fieldName === "dateFrom" || fieldName === "dateTo") {
        setFieldValue("month", "");
        setFieldValue("year", "");
        formik.setFieldTouched("dateTo");
        formik.setFieldTouched("dateFrom");
      }

      if (fieldName === "month") {
        const month = val?.getUTCMonth() ?? new Date().getUTCMonth();
        const year = val?.getUTCFullYear() ?? new Date().getUTCFullYear();
        const start = new Date(year, month, 1);
        const end = new Date(year, month + 1, 0);
        setFieldValue("dateFrom", start);
        setFieldValue("dateTo", end);
      }

      if (fieldName === "year") {
        const year = val?.getUTCFullYear() ?? new Date().getUTCFullYear();
        const start = new Date(year, 0, 1);
        const end = new Date(year, 11, 31);
        setFieldValue("dateFrom", start);
        setFieldValue("dateTo", end);
      }
    },
    [setFieldValue]
  );

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
      (
        e: React.FocusEvent<HTMLInputElement>,
        value: PatientDTO | string | undefined
      ) => {
        handleBlur(e);
        typeof value === "string"
          ? setFieldValue(fieldName, value)
          : setFieldValue(fieldName, value?.code ?? "");
      },
    [setFieldValue, handleBlur]
  );

  return (
    <div className="filterLabForm">
      <Accordion expanded={expanded}>
        <AccordionSummary onClick={() => setExpanded(!expanded)}>
          <FilterList fontSize="small" />
          <h5>{t("lab.filterexams")}</h5>
        </AccordionSummary>
        <AccordionDetails>
          <form className="filterLabForm__form" onSubmit={formik.handleSubmit}>
            <div className="filterLabForm__section">
              <div className="filterLabForm__section_content">
                <div className="fullWidth filterLabForm__item">
                  <PatientPicker
                    theme={"regular"}
                    fieldName="patientCode"
                    fieldValue={formik.values.patientCode}
                    label={t("opd.patient")}
                    isValid={isValid("patientCode")}
                    errorText={getErrorText("patientCode")}
                    onBlur={onBlurCallback("patientCode")}
                    initialValue={
                      isEmpty(formik.values.patientCode) ? undefined : patient
                    }
                  />
                </div>
                <div className="filterLabForm__item">
                  <DateField
                    theme={"regular"}
                    fieldName="dateFrom"
                    fieldValue={formik.values.dateFrom}
                    disableFuture={false}
                    format="dd/MM/yyyy"
                    isValid={isValid("dateFrom")}
                    errorText={getErrorText("dateFrom")}
                    label={t("lab.fromdate")}
                    onChange={dateFieldHandleOnChange("dateFrom")}
                  />
                </div>
                <div className="filterLabForm__item">
                  <DateField
                    fieldName="dateTo"
                    fieldValue={formik.values.dateTo}
                    disableFuture={false}
                    theme="regular"
                    format="dd/MM/yyyy"
                    isValid={isValid("dateTo")}
                    errorText={getErrorText("dateTo")}
                    label={t("lab.todate")}
                    onChange={dateFieldHandleOnChange("dateTo")}
                  />
                </div>

                <div className="filterLabForm__item">
                  <DateField
                    fieldName="month"
                    views={["month"]}
                    fieldValue={formik.values.month}
                    disableFuture={true}
                    theme="regular"
                    format="MMMM"
                    isValid={isValid("month")}
                    errorText={getErrorText("month")}
                    label={t("lab.month")}
                    onChange={dateFieldHandleOnChange("month")}
                  />
                </div>
                <div className="filterLabForm__item">
                  <DateField
                    fieldName="year"
                    views={["year"]}
                    fieldValue={formik.values.year}
                    disableFuture={true}
                    theme="regular"
                    format="yyyy"
                    isValid={isValid("year")}
                    errorText={getErrorText("year")}
                    label={t("lab.year")}
                    onChange={dateFieldHandleOnChange("year")}
                  />
                </div>
                <div className="filterLabForm__item">
                  <AutocompleteField
                    fieldName="examName"
                    fieldValue={formik.values.examName}
                    label={t("lab.exam")}
                    isValid={isValid("examName")}
                    errorText={getErrorText("examName")}
                    onBlur={onBlurCallback("examName")}
                    options={examOptions}
                  />
                </div>
              </div>
            </div>
            <div className="filterForm__buttonSet">
              <Button type="submit" color="primary" variant="contained">
                {t("lab.filter")}
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
