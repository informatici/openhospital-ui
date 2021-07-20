import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import React, { FC, useCallback, useEffect, useState } from "react";
import DateField from "../../dateField/DateField";
import SelectField from "../../selectField/SelectField";
import SmallButton from "../../smallButton/SmallButton";
import TextButton from "../../textButton/TextButton";
import "./styles.scss";
import { TBookingProps } from "./types";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import { useFormik } from "formik";
import { get, has } from "lodash";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import warningIcon from "../../../../assets/warning-icon.png";
import classnames from "classnames";

const BookingForm: FC<TBookingProps> = ({
  fields,
  onSubmit,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
  shouldResetForm,
  resetFormCallback,
}) => {
  const validationSchema = object({
    category: string().required("This field is required"),
    service: string().required("This field is required"),
    bookingDate: string().required("This field is required"),
  });
  const { t } = useTranslation();
  const initialValues = getFromFields(fields, "value");
  const options = getFromFields(fields, "options");

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      onSubmit(formattedValues);
    },
  });

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

  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    formik.resetForm();
  };

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
      resetFormCallback();
    }
  }, [shouldResetForm, resetForm, resetFormCallback]);

  const [unAvailables, setUnavailables] = useState([12, 20, 14, 5, 6, 25]);
  const [barelyAvailable, setBarelyAvalaible] = useState([1, 30]);
  const handleDateMonthChange = (date: Date | null) => {
    const result1 = [];
    while (result1.length <= 5) {
      result1.push(Math.floor(Math.random() * 31));
    }
    setUnavailables(result1);
    const result2 = [];
    while (result2.length <= 4) {
      result2.push(Math.floor(Math.random() * 15));
    }
    setBarelyAvalaible(result2);
  };

  const filtrerUnavailableDates = (date: Date | null) => {
    return unAvailables.includes(date!.getDate());
  };
  const renderWrappedDay = (
    date: any,
    selectedDate: any,
    dayInCurrentMonth: boolean,
    component: any
  ) => {
    const isUnAvalaible = unAvailables.includes(new Date(date).getDate());
    const isBarelyAvalaible = barelyAvailable.includes(
      new Date(date).getDate()
    );
    const className = isUnAvalaible
      ? "u-available"
      : isBarelyAvalaible
      ? "b-available"
      : "available";

    const message = isUnAvalaible
      ? "Unavailable"
      : isBarelyAvalaible
      ? "Barely available"
      : "Available";

    if (dayInCurrentMonth) {
      return (
        <div className="custom-date">
          <span
            title={message}
            className={classnames(className, "badge")}
          ></span>
          {component}
        </div>
      );
    } else {
      return <div className="custom-date">{component}</div>;
    }
  };

  return (
    <>
      <div className="patientBookingForm">
        <form
          className="patientBookingForm__form"
          onSubmit={formik.handleSubmit}
        >
          <div className="row start-sm center-xs">
            <div className="patientBookingForm__item">
              <SelectField
                fieldName="category"
                fieldValue={formik.values.category}
                label={t("booking.category")}
                isValid={isValid("category")}
                errorText={getErrorText("category")}
                onBlur={onBlurCallback("category")}
                options={options.category}
              />
            </div>
            <div className="patientBookingForm__item">
              <SelectField
                fieldName="service"
                fieldValue={formik.values.service}
                label={t("booking.service")}
                isValid={isValid("service")}
                errorText={getErrorText("service")}
                onBlur={onBlurCallback("service")}
                options={options.service}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientBookingForm__item dateVisit">
              <DateField
                fieldName="bookingDate"
                fieldValue={formik.values.bookingDate}
                disableFuture={false}
                onMonthChange={handleDateMonthChange}
                renderDay={renderWrappedDay}
                shouldDisableDate={filtrerUnavailableDates}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("bookingDate")}
                errorText={getErrorText("bookingDate")}
                label={t("booking.bookingdate")}
                onChange={dateFieldHandleOnChange("bookingDate")}
              />
              <div className="helper-text">
                <p>
                  <span className="badge available"></span>The date is availabe
                  to book a visit.
                </p>
                <p>
                  <span className="badge b-available"></span>The date is
                  availabe, but it's almost complete.
                </p>
                <p>
                  <span className="badge u-available"></span>The date isn't
                  available, no more visit allowed.
                </p>
              </div>
            </div>
          </div>
          <div className="patientBookingForm__buttonSet">
            <div className="submit_button">
              <SmallButton type="submit" disabled={isLoading}>
                {submitButtonLabel}
              </SmallButton>
            </div>
            <div className="reset_button">
              <TextButton onClick={() => setOpenResetConfirmation(true)}>
                {resetButtonLabel}
              </TextButton>
            </div>
          </div>
          <ConfirmationDialog
            isOpen={openResetConfirmation}
            title={resetButtonLabel.toUpperCase()}
            info={`Are you sure to ${resetButtonLabel} the Form?`}
            icon={warningIcon}
            primaryButtonLabel={resetButtonLabel}
            secondaryButtonLabel="Dismiss"
            handlePrimaryButtonClick={handleResetConfirmation}
            handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
          />
        </form>
      </div>
    </>
  );
};

export default BookingForm;
