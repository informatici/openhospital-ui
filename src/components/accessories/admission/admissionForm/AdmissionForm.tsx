import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import moment from "moment";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import warningIcon from "../../../../assets/warning-icon.png";
import {
  AdmissionTypeDTO,
  DiseaseDTO,
  DiseaseTypeDTO,
  WardDTO,
} from "../../../../generated";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import { getAdmissionTypes } from "../../../../state/admissionTypes/actions";
import { getDischargeTypes } from "../../../../state/dischargeTypes/actions";
import {
  getDiseasesIpdIn,
  getDiseasesIpdOut,
} from "../../../../state/diseases/actions";
import { getWards } from "../../../../state/ward/actions";
import { IState } from "../../../../types";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import Button from "../../button/Button";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import DateField from "../../dateField/DateField";
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
  admitted,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const diagnosisInList = useSelector(
    (state: IState) => state.diseases.diseasesIpdIn.data
  );

  const admissionTypes = useSelector(
    (state: IState) => state.admissionTypes.allAdmissionTypes.data
  );
  const wards = useSelector((state: IState) => state.wards.allWards.data);

  const renderOptions = (
    data:
      | (
          | WardDTO
          | DiseaseDTO
          | AdmissionTypeDTO
          | DiseaseTypeDTO
          | DiseaseDTO
        )[]
      | undefined
  ) => {
    if (data) {
      return data.map((item) => {
        return {
          value: item.code?.toString() ?? "",
          label: item.description ?? "",
        };
      });
    } else return [];
  };

  const initialValues = getFromFields(fields, "value");

  const validationSchema = object({
    ward: !admitted ? string().required(t("common.required")) : string(),
    admDate: !admitted ? string().required(t("common.required")) : string(),
    diseaseIn: !admitted ? string().required(t("common.required")) : string(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      formattedValues.diseaseIn = diagnosisInList?.find(
        (item) => item.code === formattedValues.diseaseIn
      );
      formattedValues.admType = admissionTypes?.find(
        (item) => item.code === formattedValues.admType
      );
      formattedValues.ward = wards?.find(
        (item) => item.code === formattedValues.ward
      );

      onSubmit(formattedValues);
    },
  });

  const { setFieldValue, resetForm, handleBlur } = formik;

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
    },
    [setFieldValue, initialValues.admDate]
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

  const diagnosisInStatus = useSelector(
    (state: IState) => state.diseases.diseasesIpdIn.status
  );
  const wardStatus = useSelector(
    (state: IState) => state.wards.allWards.status
  );
  const admTypeStatus = useSelector(
    (state: IState) => state.admissionTypes.allAdmissionTypes.status
  );

  useEffect(() => {
    dispatch(getDiseasesIpdIn());
    dispatch(getAdmissionTypes());
    dispatch(getWards());
    dispatch(getDischargeTypes());
    dispatch(getDiseasesIpdOut());
  }, [dispatch]);

  const diagnosisOutStatus = useSelector(
    (state: IState) => state.diseases.diseasesIpdOut.status
  );
  const disTypeStatus = useSelector(
    (state: IState) => state.dischargeTypes.allDischargeTypes.status
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
                options={renderOptions(wards)}
                loading={wardStatus === "LOADING"}
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="row start-sm center-xs">
            <div className="patientAdmissionForm__item">
              <DateField
                fieldName="admDate"
                fieldValue={formik.values.admDate}
                disableFuture={true}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("admDate")}
                errorText={getErrorText("admDate")}
                label={t("admission.admDate")}
                onChange={dateFieldHandleOnChange("admDate")}
                disabled={isLoading}
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
                options={renderOptions(admissionTypes)}
                loading={admTypeStatus === "LOADING"}
                disabled={isLoading}
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
                options={renderOptions(diagnosisInList)}
                loading={diagnosisInStatus === "LOADING"}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="fullWidth patientAdmissionForm__item">
              <TextField
                field={formik.getFieldProps("note")}
                theme="regular"
                label={t("admission.note")}
                multiline={true}
                type="text"
                isValid={isValid("note")}
                errorText={getErrorText("note")}
                onBlur={formik.handleBlur}
                rows={5}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="patientAdmissionForm__buttonSet">
            <div className="submit_button">
              <Button type="submit" variant="contained" disabled={isLoading}>
                {submitButtonLabel}
              </Button>
            </div>
            <div className="reset_button">
              <Button
                type="reset"
                variant="text"
                disabled={isLoading}
                onClick={() => setOpenResetConfirmation(true)}
              >
                {resetButtonLabel}
              </Button>
            </div>
          </div>
          <ConfirmationDialog
            isOpen={openResetConfirmation}
            title={resetButtonLabel.toUpperCase()}
            info={t("common.resetform")}
            icon={warningIcon}
            primaryButtonLabel={resetButtonLabel}
            secondaryButtonLabel={t("common.discard")}
            handlePrimaryButtonClick={handleResetConfirmation}
            handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
          />
        </form>
      </div>
    </>
  );
};

export default AdmissionForm;
