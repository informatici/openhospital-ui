import { useFormik } from "formik";
import { has, get } from "lodash";
import { isEmpty } from "lodash";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { number, object, string } from "yup";
import {
  formatAllFieldValues,
  getBirthDateAndAge,
  getFromFields,
  isFieldSuggested,
} from "../../../libraries/formDataHandling/functions";
import warningIcon from "../../../assets/warning-icon.png";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import DateField from "../dateField/DateField";
import { ProfilePicture } from "../profilePicture/ProfilePicture";
import SelectField from "../selectField/SelectField";
import Button from "../button/Button";
import TextField from "../textField/TextField";
import "./styles.scss";
import { TAgeFieldName, TAgeType, TProps } from "./types";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@material-ui/core";
import { formCustomization } from "../../../customization/formCustomization";
import { FIELD_VALIDATION, IState } from "../../../types";
import moment from "moment";
import { useCityOptions } from "./useCityOptions";
import AutocompleteField from "../autocompleteField/AutocompleteField";
import { useDispatch, useSelector } from "react-redux";
import { getAgeTypes } from "../../../state/ageTypes/actions";
import { getCities } from "../../../state/patients/actions";
import { useNavigate } from "react-router-dom";

const PatientDataForm: FunctionComponent<TProps> = ({
  fields,
  profilePicture,
  onSubmit,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
  shouldResetForm,
  resetFormCallback,
  mode = "create",
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [ageType, setAgeType] = useState("birthDate" as TAgeFieldName);

  const validationSchema = useMemo(() => {
    return object({
      firstName: string().required(t("common.required")),
      secondName: string().required(t("common.required")),
      age:
        ageType === "age"
          ? number().required(t("common.required")).min(0).max(200)
          : string(),
      agetype:
        ageType === "agetype"
          ? string().required(t("common.required"))
          : string(),
      birthDate:
        ageType === "birthDate"
          ? string()
              .required(t("common.required"))
              .test({
                name: "birthDate",
                message: t("common.invaliddate"),
                test: function (value) {
                  return moment(value).isValid();
                },
              })
          : string(),
      sex: string().required(t("common.required")),
      telephone: string().matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        t("common.incorrectformat")
      ),
    });
  }, [ageType]);

  useEffect(() => {
    dispatch(getAgeTypes());
  }, []);

  const initialValues = getFromFields(fields, "value");
  const cities = useSelector((state: IState) => state.patients.getCities.data);
  const options = getFromFields(fields, "options");
  const cityOptions = useCityOptions(cities);

  const ageRangeOptions = useSelector((state: IState) =>
    state.ageTypes.getAllAgeTypes.data?.map((e) => ({
      value: e.code ?? "",
      label: e.code ? t("patient.agetypes." + e.code) : "",
    }))
  );

  const allAgeTypes = useSelector(
    (state: IState) => state.ageTypes.getAllAgeTypes.data
  );

  const ageTypeOptions = [
    { value: "age", label: t("patient.age") },
    { value: "agetype", label: t("patient.agetype") },
    { value: "birthDate", label: t("patient.birthdate") },
  ];

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      const { birthDate, age } = getBirthDateAndAge(
        ageType,
        {
          age: formattedValues.age,
          birthDate: formattedValues.birthDate,
          agetype: formattedValues.agetype,
        },
        allAgeTypes
      );

      onSubmit({
        ...formattedValues,
        blobPhoto: isEmpty(formattedValues.blobPhoto)
          ? null
          : formattedValues.blobPhoto,
        birthDate: birthDate,
        age: age,
        agetype: "",
      } as any);
    },
  });

  const { setFieldValue, resetForm, handleBlur } = formik;

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  const onProfilePictureChange = useCallback(
    (picture: string) => {
      setFieldValue("blobPhoto", picture);
    },
    [setFieldValue]
  );

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
    }
  }, [shouldResetForm, resetForm]);

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
      formik.setFieldTouched(fieldName);
    },
    [setFieldValue]
  );

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
    dispatch(getCities());
  }, [dispatch, shouldResetForm]);
  const navigate = useNavigate();

  const handleCancelEdit = () => {
    setOpenResetConfirmation(false);
    navigate(-1);
  };

  return (
    <div className="patientDataForm">
      <div className="patientDataForm__profilePictureContainer">
        <ProfilePicture
          isEditable={!isLoading}
          preLoadedPicture={profilePicture}
          onChange={onProfilePictureChange}
          shouldReset={shouldResetForm}
          resetCallback={resetFormCallback}
        />
      </div>
      <form className="patientDataForm__form" onSubmit={formik.handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("firstName")}
              theme="regular"
              label={t("patient.firstname")}
              isValid={isValid("firstName")}
              errorText={getErrorText("firstName")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
              required={
                isFieldSuggested(formCustomization, "firstName")
                  ? FIELD_VALIDATION.SUGGESTED
                  : FIELD_VALIDATION.REQUIRED
              }
              maxLength={50}
            />
          </div>
          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("secondName")}
              theme="regular"
              label={t("patient.secondname")}
              isValid={isValid("secondName")}
              errorText={getErrorText("secondName")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
              required={
                isFieldSuggested(formCustomization, "secondName")
                  ? FIELD_VALIDATION.SUGGESTED
                  : FIELD_VALIDATION.REQUIRED
              }
              maxLength={50}
            />
          </div>

          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("taxCode")}
              theme="regular"
              label={t("patient.taxcode")}
              isValid={isValid("taxCode")}
              errorText={getErrorText("taxCode")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
              required={
                isFieldSuggested(formCustomization, "taxCode")
                  ? FIELD_VALIDATION.SUGGESTED
                  : FIELD_VALIDATION.IDLE
              }
              maxLength={30}
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="patientDataForm__item">
            <SelectField
              fieldName="sex"
              fieldValue={formik.values.sex}
              label={t("patient.sex")}
              isValid={isValid("sex")}
              errorText={getErrorText("sex")}
              onBlur={onBlurCallback("sex")}
              options={options.sex}
              translateOptions={true}
              disabled={isLoading}
              required={
                isFieldSuggested(formCustomization, "sex")
                  ? FIELD_VALIDATION.SUGGESTED
                  : FIELD_VALIDATION.REQUIRED
              }
            />
          </div>
          <div className="patientDataForm__item">
            <SelectField
              fieldName="atype"
              fieldValue={ageType}
              label={t("patient.agetype")}
              isValid={isValid("atype")}
              errorText={""}
              onBlur={(e, value) => {
                setAgeType(value as TAgeFieldName);
              }}
              onChange={(value) => {
                setAgeType(value as TAgeFieldName);
              }}
              options={ageTypeOptions}
              disabled={isLoading}
              required={FIELD_VALIDATION.SUGGESTED}
            />
          </div>
          {ageType == "agetype" && (
            <div className="patientDataForm__item">
              <SelectField
                fieldName="agetype"
                fieldValue={formik.values.agetype}
                label={t("patient.agerange")}
                isValid={isValid("agetype")}
                errorText={getErrorText("agetype")}
                onBlur={onBlurCallback("agetype")}
                options={ageRangeOptions ?? []}
                translateOptions={true}
                disabled={isLoading}
                required={
                  isFieldSuggested(formCustomization, "agetype")
                    ? FIELD_VALIDATION.SUGGESTED
                    : FIELD_VALIDATION.REQUIRED
                }
              />
            </div>
          )}
          {ageType == "age" && (
            <div className="patientDataForm__item">
              <TextField
                field={formik.getFieldProps("age")}
                theme="regular"
                label={t("patient.age")}
                isValid={isValid("age")}
                errorText={getErrorText("age")}
                onBlur={formik.handleBlur}
                disabled={isLoading}
                type="number"
                required={
                  isFieldSuggested(formCustomization, "age")
                    ? FIELD_VALIDATION.SUGGESTED
                    : FIELD_VALIDATION.REQUIRED
                }
              />
            </div>
          )}
          {ageType === "birthDate" && (
            <div className="patientDataForm__item">
              <DateField
                fieldName="birthDate"
                fieldValue={formik.values.birthDate}
                disableFuture={true}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("birthDate")}
                errorText={getErrorText("birthDate")}
                label={t("patient.birthdate")}
                onChange={dateFieldHandleOnChange("birthDate")}
                disabled={isLoading}
                required={
                  isFieldSuggested(formCustomization, "birthDate")
                    ? FIELD_VALIDATION.SUGGESTED
                    : FIELD_VALIDATION.REQUIRED
                }
              />
            </div>
          )}

          <div className="patientDataForm__item">
            <SelectField
              fieldName="bloodType"
              onBlur={onBlurCallback("bloodType")}
              fieldValue={formik.values.bloodType}
              label={t("patient.bloodtype")}
              isValid={isValid("bloodType")}
              errorText={getErrorText("bloodType")}
              options={options.bloodType}
              disabled={isLoading}
              required={
                isFieldSuggested(formCustomization, "bloodType")
                  ? FIELD_VALIDATION.SUGGESTED
                  : FIELD_VALIDATION.IDLE
              }
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("motherName")}
              theme="regular"
              label={t("patient.mothername")}
              isValid={isValid("motherName")}
              errorText={getErrorText("motherName")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
              required={
                isFieldSuggested(formCustomization, "motherName")
                  ? FIELD_VALIDATION.SUGGESTED
                  : FIELD_VALIDATION.IDLE
              }
              maxLength={50}
            />
          </div>

          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("fatherName")}
              theme="regular"
              label={t("patient.fathername")}
              isValid={isValid("fatherName")}
              errorText={getErrorText("fatherName")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
              required={
                isFieldSuggested(formCustomization, "fatherName")
                  ? FIELD_VALIDATION.SUGGESTED
                  : FIELD_VALIDATION.IDLE
              }
              maxLength={50}
            />
          </div>

          <div className="patientDataForm__item">
            <SelectField
              fieldName="parentTogether"
              fieldValue={formik.values.parentTogether}
              label={t("patient.parentslivetoghether")}
              isValid={isValid("parentTogether")}
              errorText={getErrorText("parentTogether")}
              onBlur={onBlurCallback("parentTogether")}
              options={options.parentTogether}
              translateOptions={true}
              disabled={isLoading}
              required={
                isFieldSuggested(formCustomization, "parentTogether")
                  ? FIELD_VALIDATION.SUGGESTED
                  : FIELD_VALIDATION.IDLE
              }
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="patientDataForm__item">
            <TextField
              field={formik.getFieldProps("address")}
              theme="regular"
              label={t("patient.address")}
              isValid={isValid("address")}
              errorText={getErrorText("address")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
              required={
                isFieldSuggested(formCustomization, "address")
                  ? FIELD_VALIDATION.SUGGESTED
                  : FIELD_VALIDATION.IDLE
              }
              maxLength={50}
            />
          </div>

          <div className="patientDataForm__item">
            <AutocompleteField
              fieldName="city"
              fieldValue={formik.values.city}
              label={t("patient.city")}
              isValid={isValid("city")}
              errorText={getErrorText("city")}
              onBlur={onBlurCallback("city")}
              options={cityOptions ?? []}
              disabled={isLoading}
              freeSolo={true}
              autoSelect={true}
              clearOnBlur={true}
              selectOnFocus={true}
              handleHomeEndKeys={true}
              maxLength={50}
            />
          </div>

          <div className="patientDataForm__item">
            <Tooltip title="ex: +237 690000000" placement="bottom">
              <div>
                <TextField
                  field={formik.getFieldProps("telephone")}
                  theme="regular"
                  label={t("patient.telephone")}
                  isValid={isValid("telephone")}
                  errorText={getErrorText("telephone")}
                  onBlur={formik.handleBlur}
                  type="tel"
                  disabled={isLoading}
                  required={
                    isFieldSuggested(formCustomization, "telephone")
                      ? FIELD_VALIDATION.SUGGESTED
                      : FIELD_VALIDATION.IDLE
                  }
                  maxLength={50}
                />
              </div>
            </Tooltip>
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="patientDataForm__item">
            <SelectField
              fieldName="hasInsurance"
              fieldValue={formik.values.hasInsurance}
              label={t("patient.hasinsurance")}
              isValid={isValid("hasInsurance")}
              errorText={getErrorText("hasInsurance")}
              onBlur={onBlurCallback("hasInsurance")}
              options={options.hasInsurance}
              translateOptions={true}
              disabled={isLoading}
              required={
                isFieldSuggested(formCustomization, "hasInsurance")
                  ? FIELD_VALIDATION.SUGGESTED
                  : FIELD_VALIDATION.IDLE
              }
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="patientDataForm__item fullWidth">
            <TextField
              field={formik.getFieldProps("note")}
              theme="regular"
              multiline={true}
              label={t("patient.note")}
              isValid={isValid("note")}
              errorText={getErrorText("note")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
              required={
                isFieldSuggested(formCustomization, "note")
                  ? FIELD_VALIDATION.SUGGESTED
                  : FIELD_VALIDATION.IDLE
              }
              maxLength={65535}
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="patientDataForm__item fullWidth">
            <small>* required, ** suggested</small>
          </div>
        </div>

        <div className="patientDataForm__buttonSet">
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
              {mode == "create" && resetButtonLabel}
              {mode == "edit" && t("common.cancel")}
            </Button>
          </div>
        </div>

        {mode == "create" && (
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
        )}

        {mode == "edit" && (
          <ConfirmationDialog
            isOpen={openResetConfirmation}
            title={t("common.cancel").toUpperCase()}
            info={t("common.discardconfirmationmessage")}
            icon={warningIcon}
            primaryButtonLabel={t("common.cancel")}
            secondaryButtonLabel={t("common.keepediting")}
            handlePrimaryButtonClick={handleCancelEdit}
            handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
          />
        )}
      </form>
    </div>
  );
};

export default PatientDataForm;
