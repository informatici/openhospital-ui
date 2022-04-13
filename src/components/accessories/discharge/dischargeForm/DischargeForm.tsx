import { useFormik } from "formik";
import { isEmpty } from "lodash";
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
  differenceInDays,
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import { getAdmissionTypes } from "../../../../state/admissionTypes/actions";
import { getDischargeTypes } from "../../../../state/dischargeTypes/actions";
import { getDiseasesIpdOut } from "../../../../state/diseases/actions";
import { getWards } from "../../../../state/ward/actions";
import { FIELD_VALIDATION, IState } from "../../../../types";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import Button from "../../button/Button";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import DateField from "../../dateField/DateField";
import TextField from "../../textField/TextField";
import "./styles.scss";
import { DischargeProps } from "./types";

const DischargeForm: FC<DischargeProps> = ({
  fields,
  onSubmit,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
  shouldResetForm,
  resetFormCallback,
  admission,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const diagnosisOutList = useSelector(
    (state: IState) => state.diseases.diseasesIpdOut.data
  );

  const dischargeTypes = useSelector(
    (state: IState) => state.dischargeTypes.allDischargeTypes.data
  );

  const renderOptions = (
    data:
      | (DiseaseDTO | AdmissionTypeDTO | DiseaseTypeDTO | DiseaseDTO)[]
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
    disDate: string()
      .required(t("common.required"))
      .test({
        name: "disDate",
        message: t("admission.validatelastdate", {
          admDate: moment(admission?.admDate ?? "").format("DD/MM/YYYY"),
        }),
        test: function (value) {
          return moment(value).isSameOrAfter(moment(admission?.admDate ?? ""));
        },
      }),
    disType: string().required(t("common.required")),
    diseaseOut: string().required(t("common.required")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);

      formattedValues.diseaseOut = diagnosisOutList?.find(
        (item) => item.code === formattedValues.diseaseOut
      );
      formattedValues.disType = dischargeTypes?.find(
        (item) => item.code === formattedValues.disType
      );

      onSubmit(formattedValues);
    },
  });

  const { setFieldValue, resetForm, handleBlur } = formik;

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
      console.log(formik.values.disDate);
      console.log(isEmpty(formik.values.disDate));
      const days = differenceInDays(
        new Date(admission?.admDate ?? ""),
        new Date(value)
      ).toString();
      setFieldValue("bedDays", days);
    },
    [setFieldValue]
  );

  const dateFieldHandleOnError = useCallback(
    (fieldName: string) => (value: string | undefined) => {
      formik.setFieldError(fieldName, value ?? "");
    },
    [formik.setFieldError]
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
              <DateField
                fieldName="disDate"
                fieldValue={formik.values.disDate}
                disableFuture={true}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("disDate")}
                errorText={getErrorText("disDate")}
                label={t("admission.disDate")}
                onChange={dateFieldHandleOnChange("disDate")}
                onBlur={formik.handleBlur}
                onError={dateFieldHandleOnError("disDate")}
                disabled={isLoading}
                required={FIELD_VALIDATION.REQUIRED}
              />
            </div>
            <div className="patientAdmissionForm__item">
              <TextField
                field={formik.getFieldProps("bedDays")}
                theme="regular"
                label={t("admission.bedDays")}
                isValid={isValid("bedDays")}
                errorText={getErrorText("bedDays")}
                onBlur={formik.handleBlur}
                disabled={true}
                type="number"
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientAdmissionForm__item">
              <AutocompleteField
                fieldName="disType"
                fieldValue={formik.values.disType}
                label={t("admission.disType")}
                isValid={isValid("disType")}
                errorText={getErrorText("disType")}
                onBlur={onBlurCallback("disType")}
                options={renderOptions(dischargeTypes)}
                loading={disTypeStatus === "LOADING"}
                disabled={isLoading}
              />
            </div>
            <div className="patientAdmissionForm__item">
              <AutocompleteField
                fieldName="diseaseOut"
                fieldValue={formik.values.diseaseOut}
                label={t("admission.diseaseOut")}
                isValid={isValid("diseaseOut")}
                errorText={getErrorText("diseaseOut")}
                onBlur={onBlurCallback("diseaseOut")}
                options={renderOptions(diagnosisOutList)}
                loading={diagnosisOutStatus === "LOADING"}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientAdmissionForm__item">
              <TextField
                field={formik.getFieldProps("cliDiaryCharge")}
                theme="regular"
                label={t("admission.cliDiaryCharge")}
                isValid={isValid("cliDiaryCharge")}
                errorText={getErrorText("cliDiaryCharge")}
                onBlur={formik.handleBlur}
                type="text"
                disabled={isLoading}
              />
            </div>
            <div className="patientAdmissionForm__item">
              <TextField
                field={formik.getFieldProps("imageryCharge")}
                theme="regular"
                label={t("admission.imageryCharge")}
                isValid={isValid("imageryCharge")}
                errorText={getErrorText("imageryCharge")}
                onBlur={formik.handleBlur}
                type="text"
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

export default DischargeForm;
