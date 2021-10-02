import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../libraries/formDataHandling/functions";
import { IState } from "../../../types";
import AutocompleteField from "../autocompleteField/AutocompleteField";
import DateField from "../dateField/DateField";
import { searchPatient } from "../../../state/patients/actions";

import "./styles.scss";
import { BillFilterProps, TValues } from "./types";
import { PatientDTO } from "../../../generated";
import SmallButton from "../smallButton/SmallButton";
import moment from "moment";

const BillFilterForm: FC<BillFilterProps> = ({
  onSubmit,
  className,
  fields,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [searchPatientParams, setSearchPatientParams] = useState({} as TValues);

  const handlePatientSearchChange = (event: any, value: string) => {
    setSearchPatientParams({
      secondName: value,
    } as TValues);
    dispatch(searchPatient(searchPatientParams));
  };

  const validationSchema = object({
    fromDate: string().required(),
    toDate: string().test({
      name: "toDate",
      message: t("bill.validatetodate"),
      test: function (value) {
        const dateFrom = isNaN(this.parent.fromDate)
          ? this.parent.fromDate
          : new Date(+this.parent.fromDate);
        const dateTo = isNaN(value) ? value : new Date(+value);
        return moment(dateTo) >= moment(dateFrom);
      },
    }),
  });

  const patientSearchResults = useSelector<IState, PatientDTO[] | undefined>(
    (state) => state.patients.searchResults.data
  );

  const searchStatus = useSelector<IState>(
    (state) => state.patients.searchResults.status || "IDLE"
  );

  const renderOptions = (data: PatientDTO[] | undefined) => {
    if (data) {
      return data.map((item) => {
        return {
          value: item.code + "",
          label: item.code + "-" + item.firstName + " " + item.secondName,
        };
      });
    } else return [];
  };

  const initialValues = getFromFields(fields, "value");

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: false,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(initialValues, values);
      onSubmit(formattedValues);
    },
  });

  const { setFieldValue, handleBlur } = formik;

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
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
      (e: React.FocusEvent<HTMLDivElement>, value: string) => {
        handleBlur(e);
        setFieldValue(fieldName, value);
      },
    [setFieldValue, handleBlur]
  );

  return (
    <>
      <div className={"filterBillForm " + className}>
        <form className="filterBillForm__form" onSubmit={formik.handleSubmit}>
          <div className="row start-sm center-xs">
            <div className="fullWidth filterBillForm__item">
              <DateField
                theme={"light"}
                fieldName="fromDate"
                fieldValue={formik.values.fromDate}
                disableFuture={false}
                format="dd/MM/yyyy"
                isValid={isValid("fromDate")}
                errorText={getErrorText("fromDate")}
                label={t("bill.fromdate")}
                onChange={dateFieldHandleOnChange("fromDate")}
              />
            </div>
            <div className="fullWidth filterBillForm__item">
              <DateField
                fieldName="toDate"
                fieldValue={formik.values.toDate}
                disableFuture={false}
                theme="light"
                format="dd/MM/yyyy"
                isValid={isValid("toDate")}
                errorText={getErrorText("toDate")}
                label={t("bill.todate")}
                onChange={dateFieldHandleOnChange("toDate")}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="fullWidth filterBillForm__item">
              <AutocompleteField
                theme={"light"}
                fieldName="patientCode"
                fieldValue={formik.values.patient}
                label={t("bill.patient")}
                isValid={isValid("patientCode")}
                errorText={getErrorText("patientCode")}
                onBlur={onBlurCallback("patientCode")}
                isLoading={searchStatus === "LOADING"}
                options={renderOptions(patientSearchResults)}
                onInputChange={handlePatientSearchChange}
                freeSolo={true}
              />
            </div>
          </div>
          <div className="filterForm__buttonSet">
            <div className="submit_button">
              <SmallButton type="submit">{t("bill.filterbutton")}</SmallButton>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BillFilterForm;
