import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useFormik } from "formik";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import DateField from "../../dateField/DateField";
import { object, string } from "yup";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import Button from "../../button/Button";
import warningIcon from "../../../../assets/warning-icon.png";
import TextField from "../../textField/TextField";
import has from "lodash.has";
import get from "lodash.get";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { TProps } from "./types";
import { IState } from "../../../../types";
import { useSelector } from "react-redux";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { DiseaseDTO, OpdDTO } from "../../../../generated";
import moment from "moment";
import { renderDate } from "../../../../libraries/formatUtils/dataFormatting";
import CheckboxField from "../../checkboxField/CheckboxField";
import { isEmpty } from "lodash";

const PatientOPDForm: FunctionComponent<TProps> = ({
  fields,
  onSubmit,
  creationMode,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
  shouldResetForm,
  resetFormCallback,
}) => {
  const { t } = useTranslation();

  const validationSchema = object({
    visitDate: string()
      .required(t("common.required"))
      .test({
        name: "visitDate",
        message: t("common.invaliddate"),
        test: function (value) {
          return moment(value).isValid();
        },
      }),
    disease: string().required(t("common.required")),
    disease2: string().test({
      name: "disease2",
      message: t("opd.validatedisease"),
      test: function (value) {
        return !value || (this.parent.disease && value !== this.parent.disease);
      },
    }),
    disease3: string().test({
      name: "disease3",
      message: t("opd.validatedisease"),
      test: function (value) {
        return (
          !value ||
          (this.parent.disease &&
            this.parent.disease2 &&
            value !== this.parent.disease &&
            value !== this.parent.disease2)
        );
      },
    }),
  });

  const initialValues = getFromFields(fields, "value");

  const diseases = useSelector<IState, DiseaseDTO[]>(
    (state: IState) => state.diseases.diseasesOpd.data ?? []
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      const opdToSave: OpdDTO = {
        ...formattedValues,
        referralFrom: isEmpty(formattedValues.referralFrom)
          ? undefined
          : formattedValues.referralFrom,
        referralTo: isEmpty(formattedValues.referralTo)
          ? undefined
          : formattedValues.referralTo,
        date: formattedValues.visitDate,
        disease: diseases.find((e) => e.code === formik.values.disease),
        disease2: diseases.find((e) => e.code === formik.values.disease2),
        disease3: diseases.find((e) => e.code === formik.values.disease3),
      };
      onSubmit(opdToSave);
    },
  });

  const { setFieldValue, resetForm, handleBlur } = formik;

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
      formik.setFieldTouched(fieldName);
    },
    [setFieldValue]
  );
  const diseasesOptionsSelector = (state: IState) => {
    return state.diseases.diseasesOpd.data
      ? state.diseases.diseasesOpd.data.map((item) => {
          return {
            value: item.code ?? "",
            label: item.description ?? "",
          };
        })
      : [];
  };
  const diseasesOptions = useSelector<
    IState,
    { value: string; label: string }[]
  >((state: IState) => diseasesOptionsSelector(state));

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
    resetForm();
    resetFormCallback();
  };

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
      resetFormCallback();
    }
  }, [shouldResetForm, resetForm, resetFormCallback]);

  const onBlurCallback = useCallback(
    (fieldName: string) =>
      (e: React.FocusEvent<HTMLDivElement>, value: string) => {
        handleBlur(e);
        setFieldValue(fieldName, value);
      },
    [setFieldValue, handleBlur]
  );

  const handleCheckboxChange = useCallback(
    (fieldName: string) => (value: boolean) => {
      setFieldValue(fieldName, value ? "R" : "");
    },
    [setFieldValue]
  );

  return (
    <>
      <div className="patientOpdForm">
        <h5 className="formInsertMode">
          {creationMode
            ? t("opd.newopd")
            : t("opd.editopd") + ": " + renderDate(formik.values.visitDate)}
        </h5>
        <form className="patientOpdForm__form" onSubmit={formik.handleSubmit}>
          <div className="row start-sm center-xs">
            <div className="patientOpdForm__item">
              <FormControl component="fieldset">
                <FormLabel component="legend">{t("opd.newpatient")}</FormLabel>
                <RadioGroup
                  aria-label="newpatient"
                  name="newpatient"
                  value={formik.values["newPatient"]}
                  onChange={(event) => {
                    formik.setFieldValue("newPatient", event.target.value);
                  }}
                >
                  <FormControlLabel
                    value="R"
                    control={<Radio />}
                    label={t("opd.reattendance")}
                    checked={formik.values["newPatient"] === "R"}
                  />
                  <FormControlLabel
                    value="N"
                    control={<Radio />}
                    label={t("opd.newadmittance")}
                    checked={formik.values["newPatient"] === "N"}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientOpdForm__item fullWidth">
              <div className="checkboxes">
                <CheckboxField
                  fieldName={"referralFrom"}
                  checked={formik.values.referralFrom === "R"}
                  label={t("opd.referralfrom")}
                  onChange={handleCheckboxChange("referralFrom")}
                />
                <CheckboxField
                  fieldName={"referralTo"}
                  checked={formik.values.referralTo === "R"}
                  label={t("opd.referralto")}
                  onChange={handleCheckboxChange("referralTo")}
                />
              </div>
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientOpdForm__item">
              <DateField
                fieldName="visitDate"
                fieldValue={formik.values.visitDate}
                disableFuture={true}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("visitDate")}
                errorText={getErrorText("visitDate")}
                label={t("opd.dateopd")}
                onChange={dateFieldHandleOnChange("visitDate")}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientOpdForm__item fullWidth">
              <TextField
                field={formik.getFieldProps("note")}
                multiline={true}
                theme="regular"
                label={t("opd.note")}
                isValid={isValid("note")}
                errorText={getErrorText("note")}
                onBlur={formik.handleBlur}
                type="string"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientOpdForm__item fullWidth">
              <AutocompleteField
                fieldName="disease"
                fieldValue={formik.values.disease}
                label={t("opd.disease1")}
                isValid={isValid("disease")}
                errorText={getErrorText("disease")}
                onBlur={onBlurCallback("disease")}
                options={diseasesOptions}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientOpdForm__item fullWidth">
              <AutocompleteField
                fieldName="disease2"
                fieldValue={formik.values.disease2}
                label={t("opd.disease2")}
                isValid={isValid("disease2")}
                errorText={getErrorText("disease2")}
                onBlur={onBlurCallback("disease2")}
                options={diseasesOptions}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientOpdForm__item fullWidth">
              <AutocompleteField
                fieldName="disease3"
                fieldValue={formik.values.disease3}
                label={t("opd.disease3")}
                isValid={isValid("disease3")}
                errorText={getErrorText("disease3")}
                onBlur={onBlurCallback("disease3")}
                options={diseasesOptions}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientOpdForm__item fullWidth">
              <TextField
                field={formik.getFieldProps("prescription")}
                multiline={true}
                theme="regular"
                label={t("opd.prescription")}
                isValid={isValid("prescription")}
                errorText={getErrorText("prescription")}
                onBlur={formik.handleBlur}
                type="string"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="patientOpdForm__buttonSet">
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

export default PatientOPDForm;
