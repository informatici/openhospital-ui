import React, { FC, useCallback, useEffect } from "react";
import { useFormik } from "formik";
import { object } from "yup";
import DateField from "../../dateField/DateField";
import has from "lodash.has";
import get from "lodash.get";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import TextField from "../../textField/TextField";
import SmallButton from "../../smallButton/SmallButton";
import TextButton from "../../textButton/TextButton";
import { initialFields } from "./consts";
import { useDispatch, useSelector } from "react-redux";
import { PatientDTO } from "../../../../generated";
import { IState } from "../../../../types";

const PatientSearch: FC<{ onSubmit: (value: any) => void }> = ({
  onSubmit,
}) => {
  const { t } = useTranslation();
  const validationSchema = object({});
  const initialValues = getFromFields(initialFields, "value");

  //this object is used as a prop for profile component style
  const profileStyle = {
    height: "50px",
    width: "50px",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(initialFields, values);
      onSubmit(formattedValues);
    },
  });

  const patientData = useSelector<IState, PatientDTO[] | undefined>(
    (state) => state.patients.searchResults.data
  );

  useEffect(() => {
    console.log("patient data...PSOES..: ", patientData);
  }, [patientData]);

  const { setFieldValue, resetForm, handleBlur } = formik;

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
      (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
        value: string
      ) => {
        handleBlur(e);
        setFieldValue(fieldName, value);
      },
    [setFieldValue, handleBlur]
  );

  return (
    <>
      <div className="patientSearch">
        <form className="patientSearchForm" onSubmit={formik.handleSubmit}>
          <div className="row start-sm center-xs">
            <div className="patientSearchForm__item">
              <TextField
                field={formik.getFieldProps("patientCode")}
                theme="regular"
                label={t("patient.patientCode")}
                isValid={isValid("patientCode")}
                errorText={getErrorText("patientCode")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>
            <div className="patientSearchForm__item">
              <TextField
                field={formik.getFieldProps("firstName")}
                theme="regular"
                label={t("patient.firstName")}
                isValid={isValid("firstName")}
                errorText={getErrorText("firstName")}
                onBlur={formik.handleBlur}
                type="text"
              />
            </div>

            <div className="patientSearchForm__item">
              <TextField
                field={formik.getFieldProps("secondName")}
                theme="regular"
                label={t("patient.secondName")}
                isValid={isValid("secondName")}
                errorText={getErrorText("secondName")}
                onBlur={formik.handleBlur}
                type="text"
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientSearchForm__item">
              <TextField
                field={formik.getFieldProps("address")}
                theme="regular"
                label={t("patient.address")}
                isValid={isValid("address")}
                errorText={getErrorText("address")}
                onBlur={formik.handleBlur}
                type="text"
              />
            </div>
            <div className="patientSearchForm__item">
              <DateField
                fieldName="birthDay"
                fieldValue={formik.values.birthDay}
                disableFuture={true}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("birthDay")}
                errorText={getErrorText("birthDay")}
                label={t("patient.birthDay")}
                onChange={dateFieldHandleOnChange("birthDay")}
              />
            </div>
          </div>
          <div className="patientSearchForm__buttonSet">
            <div className="submit_button">
              <SmallButton type="submit">Search</SmallButton>
            </div>
            <div className="reset_button">
              <TextButton onClick={() => resetForm()}>Reset</TextButton>
            </div>
          </div>
        </form>
        <div className="patientSearchResult">
          {patientData?.map((patient) => {
            return <div>{patient.firstName + " " + patient.secondName}</div>;
          })}
        </div>
      </div>
    </>
  );
};

export default PatientSearch;
