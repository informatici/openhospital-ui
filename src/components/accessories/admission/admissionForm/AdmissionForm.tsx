import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import warningIcon from "../../../../assets/warning-icon.png";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import { getAdmissionTypes } from "../../../../state/admissionTypes/actions";
import { getDiseasesIpdIn } from "../../../../state/diseases/actions";
import { getWards } from "../../../../state/ward/actions";
import { IState } from "../../../../types";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import DateField from "../../dateField/DateField";
import SmallButton from "../../smallButton/SmallButton";
import TextButton from "../../textButton/TextButton";
import TextField from "../../textField/TextField";
import "./styles.scss";
import { AdmissionProps } from "./types";

const AdmissionForm: FC<AdmissionProps> = ({
  fields,
  onSubmit,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
  shouldResetForm,
  resetFormCallback,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const validationSchema = object({
    ward: string().required(t("common.required")),
    admDate: string().required(t("common.required")),
    diseaseIn: string().required(t("common.required")),
  });

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
      (e: React.FocusEvent<HTMLDivElement>, value: string) => {
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

  useEffect(() => {
    dispatch(getDiseasesIpdIn());
  }, [dispatch, getDiseasesIpdIn]);

  useEffect(() => {
    dispatch(getAdmissionTypes());
  }, [dispatch, getAdmissionTypes]);

  useEffect(() => {
    dispatch(getWards());
  }, [dispatch, getWards]);

  const diagnosisOptionsSelector = (state: IState) => {
    if (state.diseases.diseasesIpdIn.data) {
      return state.diseases.diseasesIpdIn.data.map((diseaseIn) => {
        return {
          value: diseaseIn.code?.toString() ?? "",
          label: diseaseIn.description ?? "",
        };
      });
    } else return [];
  };

  const diagnosisOptions = useSelector((state: IState) =>
    diagnosisOptionsSelector(state)
  );

  const typesOptionsSelector = (state: IState) => {
    if (state.admissionTypes.allAdmissionTypes.data) {
      return state.admissionTypes.allAdmissionTypes.data.map((type) => {
        return {
          value: type.code ?? "",
          label: type.description ?? "",
        };
      });
    } else return [];
  };
  const typeOptions = useSelector((state: IState) =>
    typesOptionsSelector(state)
  );

  const wardOptionsSelector = (state: IState) => {
    if (state.wards.allWards.data) {
      return state.wards.allWards.data.map((type) => {
        return {
          value: type.code ?? "",
          label: type.description ?? "",
        };
      });
    } else return [];
  };
  const wardOptions = useSelector((state: IState) =>
    wardOptionsSelector(state)
  );

  return (
    <>
      <div className="patientAdmissionForm">
        <form
          className="patientAdmissionForm__form"
          onSubmit={formik.handleSubmit}
        >
          <div className="row start-sm center-xs">
            <div className="patientAdmissionForm__item">
              <AutocompleteField
                fieldName="ward"
                fieldValue={formik.values.ward}
                label={t("admission.ward")}
                isValid={isValid("ward")}
                errorText={getErrorText("ward")}
                onBlur={onBlurCallback("ward")}
                options={wardOptions}
              />
            </div>
            <div className="patientAdmissionForm__item">
              <TextField
                field={formik.getFieldProps("transUnit")}
                theme="regular"
                label={t("admission.transUnit")}
                isValid={isValid("transUnit")}
                errorText={getErrorText("transUnit")}
                onBlur={formik.handleBlur}
                type="text"
              />
            </div>
          </div>

          <div className="row start-sm center-xs">
            <div className="patientAdmissionForm__item">
              <DateField
                fieldName="admDate"
                fieldValue={formik.values.admDate}
                disableFuture={false}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("admDate")}
                errorText={getErrorText("admDate")}
                label={t("admission.admDate")}
                onChange={dateFieldHandleOnChange("admDate")}
              />
            </div>
            <div className="patientAdmissionForm__item">
              <AutocompleteField
                fieldName="admType"
                fieldValue={formik.values.admType}
                label={t("admission.admType")}
                isValid={isValid("admType")}
                errorText={getErrorText("admType")}
                onBlur={onBlurCallback("admType")}
                options={typeOptions}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="fullWidth patientAdmissionForm__item">
              <AutocompleteField
                fieldName="diseaseIn"
                fieldValue={formik.values.diseaseIn}
                label={t("admission.diseaseIn")}
                isValid={isValid("diseaseIn")}
                errorText={getErrorText("diseaseIn")}
                onBlur={onBlurCallback("diseaseIn")}
                options={diagnosisOptions}
              />
            </div>
          </div>
          <div className="patientAdmissionForm__buttonSet">
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

export default AdmissionForm;
