import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@material-ui/core";
import { FilterList } from "@material-ui/icons";
import { differenceInSeconds } from "date-fns";
import { useFormik } from "formik";
import { get, has } from "lodash";
import React, { useCallback, useState } from "react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";
import {
  ExamDTO,
  LaboratoryDTOStatusEnum,
  PatientDTO,
} from "../../../../generated";
import {
  getFromFields,
  formatAllFieldValues,
  fixFilterDateFrom,
  fixFilterDateTo,
  removeTime,
} from "../../../../libraries/formDataHandling/functions";
import DateField from "../../dateField/DateField";
import PatientPicker from "../../patientPicker/PatientPicker";
import { IExamFilterProps, TFilterValues } from "./types";
import "./styles.scss";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import { IState } from "../../../../types";
import { useSelector } from "react-redux";
import moment from "moment";
import { Permission } from "../../../../libraries/permissionUtils/Permission";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import warningIcon from "../../../../assets/warning-icon.png";
import SelectField from "../../selectField/SelectField";

export const ExamFilterForm: FC<IExamFilterProps> = ({
  fields,
  onSubmit,
  handleResetFilter,
}) => {
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState(true);
  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

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
      })
      .test({
        name: "isFuture",
        message: t("lab.futuredatenotallow"),
        test: function (value) {
          if (!moment(value).isValid()) return true;
          return differenceInSeconds(new Date(value), new Date()) <= 0;
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
        name: "dateFrom",
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
      })
      .test({
        name: "isFuture",
        message: t("lab.futuredatenotallow"),
        test: function (value) {
          if (!moment(value).isValid()) return true;
          return differenceInSeconds(new Date(value), new Date()) <= 0;
        },
      }),
    status: string(),
  });

  const initialValues = getFromFields(fields, "value");

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(
        fields,
        values,
        false
      ) as TFilterValues;

      if (formattedValues.dateFrom) {
        formattedValues.dateFrom = fixFilterDateFrom(formattedValues.dateFrom);
      }

      if (formattedValues.dateTo) {
        formattedValues.dateTo = fixFilterDateTo(formattedValues.dateTo);
      }

      onSubmit(formattedValues);
    },
  });

  const { setFieldValue, handleBlur } = formik;

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    handleResetFilter();
    formik.resetForm();
  };

  const mapToOptions = (value: ExamDTO) => ({
    value: value.description ?? "",
    label: value.description ?? "",
  });

  const examStatusOptions = [{ label: "ALL", value: "" }].concat(
    Object.values(LaboratoryDTOStatusEnum).map((status) => {
      return { label: status as string, value: status as string };
    })
  );

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
        const year =
          formik.values.year?.getUTCFullYear() ?? new Date().getUTCFullYear();
        const start = new Date(year, month, 1);
        const end = new Date(year, month + 1, 0);
        const currentDate = new Date();
        if (
          month === currentDate.getUTCMonth() &&
          year === currentDate.getUTCFullYear()
        ) {
          end.setDate(currentDate.getDate());
        }

        setFieldValue("dateFrom", start);
        setFieldValue("dateTo", end);
      }

      if (fieldName === "year") {
        const year = val?.getUTCFullYear() ?? new Date().getUTCFullYear();

        let startMonth = 0;
        let endMonth = 11;

        if (formik.values.month) {
          startMonth = formik.values.month.getUTCMonth();
          endMonth = formik.values.month.getUTCMonth();
        }

        const start = new Date(year, startMonth, 1);
        const end = new Date(year, endMonth + 1, 0);
        setFieldValue("dateFrom", start);
        setFieldValue("dateTo", end);
      }
    },
    [formik]
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
        if (fieldName === "status") {
          let examStatus = examStatusOptions.find(
            (exaStatus) => exaStatus.label === value
          );
          setFieldValue(fieldName, examStatus?.value);
        } else {
          typeof value === "string" || typeof value === "number"
            ? setFieldValue(fieldName, value)
            : setFieldValue(fieldName, value?.code ?? "");
        }
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
                <Permission require="patients.read">
                  <div className="fullWidth filterLabForm__item">
                    <PatientPicker
                      theme={"regular"}
                      fieldName="patientCode"
                      fieldValue={formik.values.patientCode}
                      label={t("opd.patient")}
                      isValid={isValid("patientCode")}
                      errorText={getErrorText("patientCode")}
                      onBlur={onBlurCallback("patientCode")}
                    />
                  </div>
                </Permission>
                <div className="filterLabForm__item">
                  <DateField
                    theme={"regular"}
                    fieldName="dateFrom"
                    fieldValue={removeTime(formik.values.dateFrom)}
                    disableFuture={true}
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
                    fieldValue={removeTime(formik.values.dateTo)}
                    disableFuture={true}
                    theme="regular"
                    format="dd/MM/yyyy"
                    isValid={isValid("dateTo")}
                    errorText={getErrorText("dateTo")}
                    label={t("lab.todate")}
                    onChange={dateFieldHandleOnChange("dateTo")}
                  />
                </div>

                <div className="filterLabForm__item col-3">
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
                <div className="filterLabForm__item col-3">
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
                <div className="filterLabForm__item col-3">
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
                <div className="filterLabForm__item col-3">
                  <SelectField
                    fieldName="status"
                    fieldValue={formik.values.status}
                    label={t("lab.status")}
                    isValid={isValid("status")}
                    errorText={getErrorText("status")}
                    onBlur={onBlurCallback("status")}
                    options={examStatusOptions}
                  />
                </div>
              </div>
            </div>
            <div className="filterForm__buttonSet">
              <Button
                type="reset"
                variant="text"
                onClick={() => setOpenResetConfirmation(true)}
                className="reset_button"
              >
                {t("common.reset")}
              </Button>
              <Button variant="contained" color="primary" type="submit">
                {t("lab.filter")}
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
      <ConfirmationDialog
        isOpen={openResetConfirmation}
        title={t("common.reset").toUpperCase()}
        info={t("common.resetform")}
        icon={warningIcon}
        primaryButtonLabel={t("common.reset")}
        secondaryButtonLabel={t("common.discard")}
        handlePrimaryButtonClick={handleResetConfirmation}
        handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
      />
    </div>
  );
};
