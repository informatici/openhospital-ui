import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { differenceInSeconds } from "date-fns";
import { useFormik } from "formik";
import { get, has } from "lodash";
import React, { useCallback, useState } from "react";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { number, object, string } from "yup";
import {
  DiseaseDTO,
  DiseaseTypeDTO,
  PatientDTO,
  WardDTO,
} from "../../../../generated";
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
import { useSelector } from "@/libraries/hooks/redux";
import moment from "moment";
import { Permission } from "../../../../libraries/permissionUtils/Permission";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import warningIcon from "../../../../assets/warning-icon.png";

export const OpdFilterForm: FC<IOpdFilterProps> = ({
  fields,
  onSubmit,
  handleResetFilter,
}) => {
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState(true);
  const [diseaseTypeCode, setDiseaseTypeCode] = useState("");
  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const validationSchema = object({
    diseaseCode: string(),
    diseaseTypeCode: string(),
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
        message: t("opd.validatefromdate"),
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
        message: t("opd.futuredatenotallow"),
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
        name: "dateTo",
        message: t("opd.validatetodate"),
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
        message: t("opd.futuredatenotallow"),
        test: function (value) {
          if (!moment(value).isValid()) return true;
          return differenceInSeconds(new Date(value), new Date()) <= 0;
        },
      }),
    ageFrom: number()
      .test({
        name: "ageTo",
        message: t("opd.validatefromage"),
        test: function (value) {
          if (!this.parent.ageTo) {
            return true;
          }
          return +this.parent.ageTo - +value >= 0;
        },
      })
      .test({
        name: "minAgeFrom",
        message: t("opd.belowminage"),
        test: function (value) {
          return !value || (value && value >= 0);
        },
      })
      .test({
        name: "maxAgeFrom",
        message: t("opd.abovemaxage"),
        test: function (value) {
          return !value || (value && value <= 200);
        },
      }),
    ageTo: number()
      .test({
        name: "ageFrom",
        message: t("opd.validatetoage"),
        test: function (value) {
          if (!this.parent.ageFrom) {
            return true;
          }
          return +value - +this.parent.ageFrom >= 0;
        },
      })
      .test({
        name: "minAgeTo",
        message: t("opd.belowminage"),
        test: function (value) {
          return !value || (value && value >= 0);
        },
      })
      .test({
        name: "maxAgeTo",
        message: t("opd.abovemaxage"),
        test: function (value) {
          return !value || (value && value <= 200);
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

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    handleResetFilter();
    formik.resetForm();
  };
  const mapToOptions = (value: DiseaseTypeDTO | DiseaseDTO | WardDTO) => ({
    value: value.code ?? "",
    label: value.description ?? "",
  });
  const diseases = useSelector<IState, DiseaseDTO[]>((state: IState) => {
    return state.diseases.diseasesOpd.data ?? [];
  });

  const diseaseOptions = useMemo(() => {
    return isEmpty(diseaseTypeCode)
      ? diseases.map((e) => mapToOptions(e))
      : diseases
          .filter((e) => e.diseaseType?.code === diseaseTypeCode)
          .map((e) => mapToOptions(e));
  }, [diseaseTypeCode, diseases]);

  const diseaseTypeOptions = useSelector((state: IState) => {
    return state.types.diseases.getAll.data?.map((e) => mapToOptions(e)) ?? [];
  });

  const wards = useSelector<IState, WardDTO[]>((state: IState) => {
    return state.wards.allWards.data?.filter((e) => e.opd) ?? [];
  });

  const wardOptions = useMemo(() => {
    return wards.map((e) => mapToOptions(e));
  }, [wards]);

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
        // Use getUTCFullYear() can result to wrong year as timezone can
        // differ from one user to another, get the year as input instead
        const year = val?.getFullYear() ?? new Date().getFullYear();

        let startMonth = 0;
        let endMonth = 11;

        if (formik.values.month) {
          startMonth = formik.values.month.getUTCMonth();
          endMonth = formik.values.month.getUTCMonth();
        }

        const start = new Date(year, startMonth, 1);
        const end = new Date(year, endMonth, 31);
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
        if (fieldName === "diseaseTypeCode") {
          setDiseaseTypeCode((value ?? "") as string);
          formik.setFieldValue("diseaseCode", "");
        }
      },
    [setFieldValue, handleBlur]
  );

  const newPatientOptions = [
    {
      label: t("opd.all"),
      value: "A",
    },
    {
      label: t("opd.newattendance"),
      value: "N",
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
                <div className="filterOpdForm__item fullWidth">
                  <AutocompleteField
                    fieldName="diseaseTypeCode"
                    fieldValue={formik.values.diseaseTypeCode}
                    label={t("opd.diseasetype")}
                    isValid={isValid("diseaseTypeCode")}
                    errorText={getErrorText("diseaseTypeCode")}
                    onBlur={onBlurCallback("diseaseTypeCode")}
                    options={diseaseTypeOptions}
                  />
                </div>
                <div className="filterOpdForm__item fullWidth">
                  <AutocompleteField
                    fieldName="diseaseCode"
                    fieldValue={formik.values.diseaseCode}
                    label={t("opd.disease")}
                    isValid={isValid("diseaseCode")}
                    errorText={getErrorText("diseaseCode")}
                    onBlur={onBlurCallback("diseaseCode")}
                    options={diseaseOptions}
                  />
                </div>
                <div className="filterOpdForm__item">
                  <AutocompleteField
                    fieldName="wardCode"
                    fieldValue={formik.values.wardCode}
                    label={t("opd.ward")}
                    isValid={isValid("wardCode")}
                    errorText={getErrorText("wardCode")}
                    onBlur={onBlurCallback("wardCode")}
                    options={wardOptions}
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
                    disableFuture={true}
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
                    disableFuture={true}
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
                <Permission require="patients.read">
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
                </Permission>
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
              <Button
                type="reset"
                variant="text"
                onClick={() => setOpenResetConfirmation(true)}
                className="reset_button"
              >
                {t("common.reset")}
              </Button>
              <Button variant="contained" color="primary" type="submit">
                {t("opd.filter")}
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
