import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import moment from "moment";
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
import { initialFields } from "./consts";
import { searchPatient } from "../../../state/patients/actions";

import "./styles.scss";
import { BillFilterProps, TValues } from "./types";
import { PatientDTO } from "../../../generated";

const BillFilterForm: FC<BillFilterProps> = ({ onSubmit, className }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [searchPatientParams, setSearchPatientParams] = useState({} as TValues);

  const handlePatientSearchChange = (event: any, value: string) => {
    setSearchPatientParams({
      id: !isNaN(+value) ? value : "",
      firstName: isNaN(+value) ? value : "",
      secondName: "",
      birthDate: "",
      address: "",
    });
    dispatch(searchPatient(searchPatientParams));
  };

  const validationSchema = object({
    toDate: string().test({
      name: "toDate",
      message: t("bill.validatetodate"),
      test: function (value) {
        if (moment(+value).isValid()) {
          return moment(+value).isSameOrAfter(moment(+this.parent.fromDate));
        } else if (moment(value).isValid()) {
          return moment(value).isSameOrAfter(moment(this.parent.fromDate));
        } else return true;
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

  const initialValues = getFromFields(initialFields, "value");
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(initialFields, values);
      onSubmit(formattedValues);
    },
  });

  const { setFieldValue, handleBlur } = formik;

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
      if (fieldName !== "fromDate") {
        formik.handleSubmit();
      }
    },
    [setFieldValue, formik.handleSubmit]
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
        formik.handleBlur(e);
        setFieldValue(fieldName, value);
        formik.handleSubmit();
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
                fieldName="patient"
                fieldValue={formik.values.patient}
                label={t("bill.patient")}
                isValid={isValid("patient")}
                errorText={getErrorText("patient")}
                onBlur={onBlurCallback("patient")}
                isLoading={searchStatus === "LOADING"}
                options={renderOptions(patientSearchResults)}
                onInputChange={handlePatientSearchChange}
                freeSolo={true}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BillFilterForm;
