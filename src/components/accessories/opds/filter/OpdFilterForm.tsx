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
import { number, object, string } from "yup";
import { DiseaseDTO, DiseaseTypeDTO, PatientDTO } from "../../../../generated";
import {
  getFromFields,
  formatAllFieldValues,
} from "../../../../libraries/formDataHandling/functions";
import DateField from "../../dateField/DateField";
import PatientPicker from "../../patientPicker/PatientPicker";
import SelectField from "../../selectField/SelectField";
import { IOpdFilterProps, TFilterValues } from "./types";
import "./styles.scss";
import TextField from "../../textField/TextField";
import { isEmpty } from "lodash";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import { IState } from "../../../../types";
import { useSelector } from "react-redux";

export const OpdFilterForm: FC<IOpdFilterProps> = ({ fields, onSubmit }) => {
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState(true);

  const validationSchema = object({
    dateFrom: string(),
    ageFrom: number(),
    diseaseCode: string(),
    diseaseTypeCode: string(),
    dateTo: string().test({
      name: "dateTo",
      message: t("opd.validatetodate"),
      test: function (value) {
        if (isEmpty(this.parent.dateFrom)) {
          return true;
        }
        return (
          differenceInSeconds(
            new Date(this.parent.dateFrom),
            new Date(value)
          ) <= 0
        );
      },
    }),
    ageTo: number().test({
      name: "dateTo",
      message: t("opd.validatetoage"),
      test: function (value) {
        if (isEmpty(this.parent.ageFrom)) {
          return true;
        }
        return +value - +this.parent.ageTo >= 0;
      },
    }),
  });

  const initialValues = getFromFields(fields, "value");
  const [filter, setFilter] = useState(initialValues as TFilterValues);
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
      setFilter(formattedValues);
    },
  });

  const { setFieldValue, handleBlur } = formik;

  const mapToOptions = (value: DiseaseTypeDTO | DiseaseDTO) => ({
    value: value.code ?? "",
    label: value.description ?? "",
  });
  const diseaseAllOptions = useSelector((state: IState) => {
    return state.diseases.diseasesOpd.data?.map((e) => mapToOptions(e)) ?? [];
  });

  const diseaseTypeOptions = useSelector((state: IState) => {
    return (
      state.diseaseTypes.getDiseaseTypes.data?.map((e) => mapToOptions(e)) ?? []
    );
  });

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (val: Date | null) => {
      setFieldValue(fieldName, val);
      if (fieldName === "dateFrom" || fieldName === "dateTo") {
        setFieldValue("month", "");
        setFieldValue("year", "");
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

        if (
          fieldName === "sex" ||
          fieldName === "ageFrom" ||
          (fieldName === "ageTo" && !isEmpty(value))
        ) {
          formik.setFieldValue("patientCode", "");
        }
        if (fieldName === "patientCode" && !isEmpty(value)) {
          ["sex", "ageFrom", "ageTo"].forEach((e) =>
            formik.setFieldValue(e, "")
          );
        }
      },
    [setFieldValue, handleBlur]
  );

  const newPatientOptions = [
    {
      label: t("opd.all"),
      value: "",
    },
    {
      label: t("opd.newadmittance"),
      value: "A",
    },
    {
      label: t("opd.reattendance"),
      value: "R",
    },
  ];

  const sexOptions = [
    {
      label: t("opd.all"),
      value: "",
    },
    {
      label: t("opd.female"),
      value: "F",
    },
    {
      label: t("opd.male"),
      value: "M",
    },
    {
      label: t("opd.unknown"),
      value: "U",
    },
  ];

  return (
    <div className="filterOpdForm">
      <Accordion expanded={expanded}>
        <AccordionSummary onClick={() => setExpanded(!expanded)}>
          <FilterList fontSize="small" />
          <h5>{t("opd.filtervisits")}</h5>
        </AccordionSummary>
        <AccordionDetails>
          <form className="filterOpdForm__form" onSubmit={formik.handleSubmit}>
            <div className="filterOpdForm__section">
              <div className="filterOpdForm__section_title">
                {t("opd.general")}
              </div>
              <div className="filterOpdForm__section_content">
                <div className="filterOpdForm__item">
                  <SelectField
                    fieldName="newPatiient"
                    fieldValue={formik.values.newPatient}
                    label={t("opd.newpatient")}
                    isValid={isValid("newPatient")}
                    errorText={getErrorText("newPatient")}
                    onBlur={onBlurCallback("newPatient")}
                    options={newPatientOptions}
                  />
                </div>
                <div className="filterOpdForm__item">
                  <AutocompleteField
                    fieldName="diseaseType"
                    fieldValue={formik.values.diseaseType}
                    label={t("opd.diseasetype")}
                    isValid={isValid("diseaseTypeCode")}
                    errorText={getErrorText("diseaseTypeCode")}
                    onBlur={onBlurCallback("diseaseTypeCode")}
                    options={diseaseTypeOptions}
                  />
                </div>
                <div className="filterOpdForm__item">
                  <AutocompleteField
                    fieldName="disease"
                    fieldValue={formik.values.disease}
                    label={t("opd.disease")}
                    isValid={isValid("diseaseCode")}
                    errorText={getErrorText("diseaseCode")}
                    onBlur={onBlurCallback("diseaseCode")}
                    options={diseaseAllOptions}
                  />
                </div>
              </div>
            </div>
            <div className="filterOpdForm__section">
              <div className="filterOpdForm__section_title">
                {t("opd.period")}
              </div>
              <div className="filterOpdForm__section_content">
                <div className="filterOpdForm__item">
                  <DateField
                    theme={"regular"}
                    fieldName="dateFrom"
                    fieldValue={formik.values.dateFrom}
                    disableFuture={false}
                    format="dd/MM/yyyy"
                    isValid={isValid("dateFrom")}
                    errorText={getErrorText("dateFrom")}
                    label={t("opd.fromdate")}
                    onChange={dateFieldHandleOnChange("dateFrom")}
                  />
                </div>
                <div className="filterOpdForm__item">
                  <DateField
                    fieldName="dateTo"
                    fieldValue={formik.values.dateTo}
                    disableFuture={false}
                    theme="regular"
                    format="dd/MM/yyyy"
                    isValid={isValid("dateTo")}
                    errorText={getErrorText("dateTo")}
                    label={t("opd.todate")}
                    onChange={dateFieldHandleOnChange("dateTo")}
                  />
                </div>

                <div className="filterOpdForm__item">
                  <DateField
                    fieldName="month"
                    views={["month"]}
                    fieldValue={formik.values.month}
                    disableFuture={true}
                    theme="regular"
                    format="MMMM"
                    isValid={isValid("month")}
                    errorText={getErrorText("month")}
                    label={t("opd.month")}
                    onChange={dateFieldHandleOnChange("month")}
                  />
                </div>
                <div className="filterOpdForm__item">
                  <DateField
                    fieldName="year"
                    views={["year"]}
                    fieldValue={formik.values.year}
                    disableFuture={true}
                    theme="regular"
                    format="yyyy"
                    isValid={isValid("year")}
                    errorText={getErrorText("year")}
                    label={t("opd.year")}
                    onChange={dateFieldHandleOnChange("year")}
                  />
                </div>
              </div>
            </div>
            <div className="filterOpdForm__section">
              <div className="filterOpdForm__section_title">
                {t("opd.patient")}
              </div>
              <div className="filterOpdForm__section_content">
                <div className="filterOpdForm__item">
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
                <div className="filterOpdForm__item">
                  <SelectField
                    fieldName="sex"
                    fieldValue={formik.values.sex}
                    label={t("opd.sex")}
                    isValid={isValid("sex")}
                    errorText={getErrorText("sex")}
                    onBlur={onBlurCallback("sex")}
                    options={sexOptions}
                  />
                </div>
                <div className="filterOpdForm__item">
                  <TextField
                    field={formik.getFieldProps("ageFrom")}
                    theme="regular"
                    label={t("opd.agefrom")}
                    isValid={isValid("ageFrom")}
                    errorText={getErrorText("ageFrom")}
                    onBlur={formik.handleBlur}
                    type="number"
                  />
                </div>
                <div className="filterOpdForm__item">
                  <TextField
                    field={formik.getFieldProps("ageTo")}
                    theme="regular"
                    label={t("opd.ageto")}
                    isValid={isValid("ageTo")}
                    errorText={getErrorText("ageTo")}
                    onBlur={formik.handleBlur}
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="filterForm__buttonSet">
              <Button variant="contained" color="primary" type="submit">
                {t("opd.filter")}
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
