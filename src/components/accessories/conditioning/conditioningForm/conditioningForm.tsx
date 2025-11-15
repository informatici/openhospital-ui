import { Autocomplete } from "components/accessories/autocomplete";
import AutocompleteField from "components/accessories/autocompleteField/AutocompleteField";
import CheckboxField from "components/accessories/checkboxField/CheckboxField";
import DateField from "components/accessories/dateField/DateField";
import TextField from "components/accessories/textField/TextField";
import { useFormik } from "formik";
import { UserDTO } from "generated";
import {
  formatAllFieldValues,
  getFromFields,
} from "libraries/formDataHandling/functions";
import { useAppSelector, useConditionsAtAmission } from "libraries/hooks";
import { useAppDispatch } from "libraries/hooks/redux";
import { get, has } from "lodash";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IState } from "types";
import * as yup from "yup";
import warningIcon from "../../../../assets/warning-icon.png";
import Button from "../../button/Button";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import "./styles.scss";
import { ConditioningFormProps } from "./types";

const ConditioningForm: FC<ConditioningFormProps> = ({
  fields,
  submitButtonLabel,
  creationMode,
  resetButtonLabel,
  isLoading,
  onSubmit,
  resetFormCallback,
  shouldResetForm,
}) => {
  const { t } = useTranslation();

  const validationSchema = yup.object({
    aspiration: yup.boolean(),
    mce: yup.number().nullable(),
    ventilation: yup.number().nullable(),
    oxygenDebit: yup.number().nullable(),
    sgVolume: yup.number().nullable(),
    diazepamDose: yup.number().nullable(),
    bolusSsVolume: yup.number().nullable(),
    sngNumber: yup.string().nullable(),
    others: yup.string().nullable(),
    cpap: yup.boolean(),
    malaria: yup.string().nullable(),
    hivTest: yup.string().nullable(),
    bloodGlucoseLevel: yup.number().nullable(),
    performedBy: yup.string().nullable(),
    performedAt: yup.date().required(t("common.required")),
  });

  const initialValues = getFromFields(fields, "value");

  const userName = useAppSelector(
    (state: IState) => state.main.authentication.data?.username
  );

  const dispatch = useAppDispatch();

  const { options: conditionAtAdmissionOptions } = useConditionsAtAmission();

  const usersList = useAppSelector(
    (state: IState) => state.users.userList.data
  );

  const renderOptions = (data: UserDTO[] | undefined) => {
    if (data) {
      return data.map((item) => {
        return {
          value: item.userName?.toString() ?? "",
          label: item.userName ?? "",
        };
      });
    } else return [];
  };

  const [isAspirationChecked, setIsAspirationCheckedChecked] = useState(false);
  const [isCpapChecked, setIsCpapChecked] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      const conditioningToSave: any = {
        ...formattedValues,
        aspiration: isAspirationChecked,
        cpap: isCpapChecked,
      };
      onSubmit(conditioningToSave as any);
      setIsAspirationCheckedChecked(false);
      setIsCpapChecked(false);
    },
  });

  const { resetForm, setFieldValue, handleBlur } = formik;

  const onBlurCallback = useCallback(
    (fieldName: string) =>
      (e: React.FocusEvent<HTMLInputElement>, value: any | undefined) => {
        handleBlur(e);
        if (value && typeof value === "object" && "value" in value) {
          setFieldValue(fieldName, value.value);
        } else {
          setFieldValue(fieldName, value || "");
        }
      },
    [handleBlur, setFieldValue]
  );

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      if (value) {
        // Ensure we keep a sensible time when user only picks a date.
        // If the picked date has time 00:00, default to current hours/minutes so
        // the form shows a date+time and user can update the time if needed.
        const newDate = new Date(value);
        if (newDate.getHours() === 0 && newDate.getMinutes() === 0) {
          const now = new Date();
          newDate.setHours(now.getHours(), now.getMinutes());
        }
        setFieldValue(fieldName, newDate);
      } else {
        setFieldValue(fieldName, value);
      }
      formik.setFieldTouched(fieldName);
    },
    [formik, setFieldValue]
  );

  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const isValid = (fieldName: string) =>
    has(formik.touched, fieldName) && has(formik.errors, fieldName);

  const getErrorText = (fieldName: string) =>
    has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    formik.resetForm();
    setIsAspirationCheckedChecked(false);
    setIsCpapChecked(false);
    resetFormCallback();
  };

  const handleAspirationChecked = () => {
    setIsAspirationCheckedChecked(!isAspirationChecked);
  };

  const handleCpapChecked = () => {
    setIsCpapChecked(!isCpapChecked);
  };

  const usersStatus = useAppSelector(
    (state: IState) => state.users.userList.status
  );

  useEffect(() => {
    if (!usersList || usersList.length === 0) {
      import("../../../../state/users").then((m) => {
        if (m.getUsers) dispatch(m.getUsers({}));
      });
    }
  }, [usersList, dispatch]);

  useEffect(() => {
    if (creationMode && userName && usersList && usersList.length > 0) {
      const currentValue = formik.values.performedBy;
      if (!currentValue || currentValue === "") {
        const found = usersList.find((u) => u.userName === userName);
        setFieldValue("performedBy", found ? found.userName : userName);
      }
    }
  }, [
    creationMode,
    userName,
    usersList,
    setFieldValue,
    formik.values.performedBy,
  ]);

  useEffect(() => {
    if (!creationMode) {
      setIsAspirationCheckedChecked(
        formik.values.aspiration === "true" ? true : false
      );
      setIsCpapChecked(formik.values.cpap === "true" ? true : false);
    }
  }, [creationMode, formik.values.aspiration, formik.values.cpap]);

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
      resetFormCallback();
    }
  }, [shouldResetForm, resetForm, resetFormCallback]);

  return (
    <div className="conditioningForm">
      <form className="conditioningForm__form" onSubmit={formik.handleSubmit}>
        <div className="row start-sm center-xs bottom-sm">
          <div className="conditioningForm__item">
            <DateField
              fieldName="performedAt"
              fieldValue={formik.values.performedAt}
              disableFuture={true}
              theme="regular"
              format="dd/MM/yyyy HH:mm"
              isValid={isValid("performedAt")}
              errorText={getErrorText("performedAt")}
              label={t("conditioning.performedAt")}
              onChange={dateFieldHandleOnChange("performedAt")}
              disabled={isLoading}
            />
          </div>
          <div className="conditioningForm__item">
            <AutocompleteField
              fieldName="performedBy"
              fieldValue={formik.values.performedBy}
              label={t("conditioning.performedBy")}
              isValid={isValid("performedBy")}
              errorText={getErrorText("performedBy")}
              onBlur={onBlurCallback("performedBy")}
              options={renderOptions(usersList)}
              loading={usersStatus === "LOADING"}
              disabled={isLoading}
            />
          </div>
          <div className="fullWidth conditioningForm__item">
            <Autocomplete
              id="conditionAtAdmission"
              multiple
              freeSolo
              value={formik.values.conditionAtAdmission}
              options={conditionAtAdmissionOptions}
              onChange={(_, value) => {
                formik.setFieldValue("conditionAtAdmission", value);
              }}
              label={t("conditioning.conditionAtAdmission.label")}
              placeholder={t("conditioning.conditionAtAdmission.label")}
            />
          </div>
          <div className="conditioningForm__item">
            <AutocompleteField
              fieldName="malaria"
              fieldValue={formik.values.malaria}
              label={t("conditioning.malaria")}
              isValid={isValid("malaria")}
              errorText={getErrorText("malaria")}
              onBlur={onBlurCallback("malaria")}
              options={[
                {
                  value: "INDETERMINATE",
                  label: t("conditioning.indeterminate"),
                },
                { value: "ND", label: t("conditioning.notAvailable") },
                { value: "POSITIF", label: t("conditioning.positive") },
                { value: "NEGATIF", label: t("conditioning.negative") },
              ]}
              disabled={isLoading}
            />
          </div>

          <div className="conditioningForm__item">
            <AutocompleteField
              fieldName="hivTest"
              fieldValue={formik.values.hivTest}
              label={t("conditioning.hivTest")}
              isValid={isValid("hivTest")}
              errorText={getErrorText("hivTest")}
              onBlur={onBlurCallback("hivTest")}
              options={[
                {
                  value: "INDETERMINATE",
                  label: t("conditioning.indeterminate"),
                },
                { value: "ND", label: t("conditioning.notAvailable") },
                { value: "POSITIF", label: t("conditioning.positive") },
                { value: "NEGATIF", label: t("conditioning.negative") },
              ]}
              disabled={isLoading}
            />
          </div>
          <div className="conditioningForm__item">
            <TextField
              label={t("conditioning.bloodGlucoseLevel")}
              field={formik.getFieldProps("bloodGlucoseLevel")}
              theme="regular"
              isValid={isValid("bloodGlucoseLevel")}
              errorText={getErrorText("bloodGlucoseLevel")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </div>
          <div className="conditioningForm__item">
            <TextField
              label={t("conditioning.sgVolume")}
              field={formik.getFieldProps("sgVolume")}
              theme="regular"
              isValid={isValid("sgVolume")}
              errorText={getErrorText("sgVolume")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </div>

          <div className="conditioningForm__item">
            <TextField
              label={t("conditioning.bolusSsVolume")}
              field={formik.getFieldProps("bolusSsVolume")}
              theme="regular"
              isValid={isValid("bolusSsVolume")}
              errorText={getErrorText("bolusSsVolume")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </div>

          <div className="conditioningForm__item">
            <TextField
              label={t("conditioning.diazepamDose")}
              field={formik.getFieldProps("diazepamDose")}
              theme="regular"
              isValid={isValid("diazepamDose")}
              errorText={getErrorText("diazepamDose")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </div>

          <div className="conditioningForm__item">
            <CheckboxField
              fieldName="aspiration"
              label={t("conditioning.aspiration")}
              checked={isAspirationChecked}
              onChange={handleAspirationChecked}
            />
          </div>
          <div className="conditioningForm__item">
            <CheckboxField
              fieldName="cpap"
              label={t("conditioning.cpap")}
              checked={isCpapChecked}
              onChange={handleCpapChecked}
            />
          </div>
          <div className="conditioningForm__item">
            <TextField
              label={t("conditioning.mce")}
              field={formik.getFieldProps("mce")}
              theme="regular"
              isValid={isValid("mce")}
              errorText={getErrorText("mce")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </div>

          <div className="conditioningForm__item">
            <TextField
              label={t("conditioning.ventilation")}
              field={formik.getFieldProps("ventilation")}
              theme="regular"
              isValid={isValid("ventilation")}
              errorText={getErrorText("ventilation")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </div>

          <div className="conditioningForm__item">
            <TextField
              label={t("conditioning.oxygenDebit")}
              field={formik.getFieldProps("oxygenDebit")}
              theme="regular"
              isValid={isValid("oxygenDebit")}
              errorText={getErrorText("oxygenDebit")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </div>

          <div className="conditioningForm__item">
            <TextField
              label={t("conditioning.sngNumber")}
              field={formik.getFieldProps("sngNumber")}
              theme="regular"
              isValid={isValid("sngNumber")}
              errorText={getErrorText("sngNumber")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </div>

          <div className="fullWidth conditioningForm__item">
            <TextField
              field={formik.getFieldProps("others")}
              theme="regular"
              label={t("conditioning.others")}
              multiline={true}
              type="text"
              isValid={isValid("others")}
              errorText={getErrorText("others")}
              onBlur={formik.handleBlur}
              rows={3}
              disabled={isLoading}
              maxLength={2000}
            />
          </div>
        </div>

        <div className="conditioningForm__buttonSet">
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
          <div className="submit_button">
            <Button type="submit" variant="contained" disabled={isLoading}>
              {submitButtonLabel}
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
  );
};

export default ConditioningForm;
