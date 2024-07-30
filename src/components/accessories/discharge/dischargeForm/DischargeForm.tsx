import { useFormik } from "formik";
import { get, has } from "lodash";
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
} from "../../../../generated";
import {
  differenceInDays,
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import { getDiseasesIpdOut } from "../../../../state/diseases";
import { IState } from "../../../../types";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import Button from "../../button/Button";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import DateField from "../../dateField/DateField";
import TextField from "../../textField/TextField";
import "./styles.scss";
import { DischargeProps } from "./types";
import { getDischargeTypes } from "../../../../state/types/discharges";

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
    (state: IState) => state.types.discharges.getAll.data
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
        message: t("common.invaliddate"),
        test: function (value) {
          return moment(value).isValid();
        },
      })
      .test({
        name: "disDate",
        message: t("admission.validatelastdate", {
          admDate: moment(admission?.admDate ?? "").format("DD/MM/YYYY"),
        }),
        test: function (value) {
          return (
            moment(value).isValid() &&
            moment(value)
              .startOf("day")
              .isSameOrAfter(moment(admission?.admDate ?? "").startOf("day"))
          );
        },
      }),
    disType: string().required(t("common.required")),
    diseaseOut1: string().required(t("common.required")),
    diseaseOut2: string().test({
      name: "diseaseOut2",
      message: t("opd.validatedisease"),
      test: function (value) {
        return (
          !value ||
          (this.parent.diseaseOut1 && value !== this.parent.diseaseOut1)
        );
      },
    }),
    diseaseOut3: string().test({
      name: "diseaseOut3",
      message: t("opd.validatedisease"),
      test: function (value) {
        return (
          !value ||
          (this.parent.diseaseOut1 &&
            this.parent.diseaseOut2 &&
            value !== this.parent.diseaseOut1 &&
            value !== this.parent.diseaseOut2)
        );
      },
    }),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      formattedValues.diseaseOut1 = diagnosisOutList?.find(
        (item) => item.code === formattedValues.diseaseOut1
      );
      formattedValues.diseaseOut2 = diagnosisOutList?.find(
        (item) => item.code === formattedValues.diseaseOut2
      );
      formattedValues.diseaseOut3 = diagnosisOutList?.find(
        (item) => item.code === formattedValues.diseaseOut3
      );
      formattedValues.disType = dischargeTypes?.find(
        (item) => item.code === formattedValues.disType
      );

      onSubmit(formattedValues as any);
    },
  });

  const { setFieldValue, resetForm, handleBlur } = formik;

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
      formik.validateField(fieldName);
      formik.setFieldTouched(fieldName);
      const days = differenceInDays(
        new Date(admission?.admDate ?? ""),
        new Date(value)
      ).toString();
      setFieldValue("bedDays", days);
    },
    [setFieldValue, admission]
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
        formik.setFieldTouched(fieldName, false);
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
    (state: IState) => state.types.discharges.getAll.status
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
                disabled={isLoading}
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
            <div className="fullWidth patientAdmissionForm__item">
              <AutocompleteField
                fieldName="diseaseOut1"
                fieldValue={formik.values.diseaseOut1}
                label={t("admission.diseaseOut1")}
                isValid={isValid("diseaseOut1")}
                errorText={getErrorText("diseaseOut1")}
                onBlur={onBlurCallback("diseaseOut1")}
                options={renderOptions(diagnosisOutList)}
                loading={diagnosisOutStatus === "LOADING"}
                disabled={isLoading}
              />
            </div>
            <div className="fullWidth patientAdmissionForm__item">
              <AutocompleteField
                fieldName="diseaseOut2"
                fieldValue={formik.values.diseaseOut2}
                label={t("admission.diseaseOut2")}
                isValid={isValid("diseaseOut2")}
                errorText={getErrorText("diseaseOut2")}
                onBlur={onBlurCallback("diseaseOut2")}
                options={renderOptions(diagnosisOutList)}
                loading={diagnosisOutStatus === "LOADING"}
                disabled={isLoading}
              />
            </div>
            <div className="fullWidth patientAdmissionForm__item">
              <AutocompleteField
                fieldName="diseaseOut3"
                fieldValue={formik.values.diseaseOut3}
                label={t("admission.diseaseOut3")}
                isValid={isValid("diseaseOut3")}
                errorText={getErrorText("diseaseOut3")}
                onBlur={onBlurCallback("diseaseOut3")}
                options={renderOptions(diagnosisOutList)}
                loading={diagnosisOutStatus === "LOADING"}
                disabled={isLoading}
              />
            </div>
            <div className="fullWidth patientAdmissionForm__item">
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
                maxLength={65535}
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
