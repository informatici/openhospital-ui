import React, { FunctionComponent, useCallback, useState } from 'react';
import { useFormik } from "formik";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import DateField from '../../dateField/DateField';
import { object } from 'yup';
import { TProps } from './types';
import ConfirmationDialog from '../../confirmationDialog/ConfirmationDialog';
import TextButton from '../../textButton/TextButton';
import SmallButton from '../../smallButton/SmallButton';
import warningIcon from "../../../../assets/warning-icon.png";
import TextField from '../../textField/TextField';
import has from 'lodash.has';
import get from 'lodash.get';
import "./styles.scss"

const PatientOPDForm: FunctionComponent<TProps> = ({
  fields,
  onSubmit,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
}) => {

  const validationSchema = object({
    // TODO  
  });

  const initialValues = getFromFields(fields, "value");

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      onSubmit(formattedValues);
    },
  });

  const { setFieldValue } = formik;

  const dateFieldHandleOnChange = useCallback(
    (value) => {
      setFieldValue("opdDate", value);
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

  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);
  
  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    formik.resetForm();
  }

  return (
    <>
      <div className="patientOpdForm">
        <form className="patientOpdForm__form" onSubmit={formik.handleSubmit}>
          <div className="row start-sm center-xs">
            <div className="patientOpdForm__item">
              <DateField
                fieldName="opdDate"
                fieldValue={formik.values.opdDate}
                disableFuture={true}
                theme="regular"
                format="dd/MM/yyyy"
                label="Date (day/month/year)"
                onChange={dateFieldHandleOnChange}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientOpdForm__item fullWith">
              <TextField
                field={formik.getFieldProps("anamnesis")}
                multiline={true}
                theme="regular"
                label="anamnesis"
                isValid={isValid("anamnesis")}
                errorText={getErrorText("anamnesis")}
                onBlur={formik.handleBlur}
                type="string"
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientOpdForm__item fullWith">
              <TextField
                field={formik.getFieldProps("opd_1")}
                theme="regular"
                label="opd_1"
                isValid={isValid("opd_1")}
                errorText={getErrorText("opd_1")}
                onBlur={formik.handleBlur}
                type="string"
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientOpdForm__item fullWith">
              <TextField
                field={formik.getFieldProps("opd_2")}
                theme="regular"
                label="opd_2"
                isValid={isValid("opd_2")}
                errorText={getErrorText("opd_2")}
                onBlur={formik.handleBlur}
                type="string"
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientOpdForm__item fullWith">
              <TextField
                field={formik.getFieldProps("opd_3")}
                theme="regular"
                label="opd_3"
                isValid={isValid("opd_3")}
                errorText={getErrorText("opd_3")}
                onBlur={formik.handleBlur}
                type="string"
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientOpdForm__item fullWith">
              <TextField
                field={formik.getFieldProps("note")}
                multiline={true}
                theme="regular"
                label="note"
                isValid={isValid("note")}
                errorText={getErrorText("note")}
                onBlur={formik.handleBlur}
                type="string"
              />
            </div>
          </div>
          <div className="patientOpdForm__buttonSet">
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
            handleSecondaryButtonClick={() =>
              setOpenResetConfirmation(false)
            }
          />
        </form>
      </div>
    </>
  );
}

export default PatientOPDForm;