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
import TextButton from "../../textButton/TextButton";
import SmallButton from "../../smallButton/SmallButton";
import warningIcon from "../../../../assets/warning-icon.png";
import TextField from "../../textField/TextField";
import has from "lodash.has";
import get from "lodash.get";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { TProps } from "./types";
import { IState } from "../../../../types";
import { useSelector } from "react-redux";
import SelectField from "../../selectField/SelectField";

const PatientOPDForm: FunctionComponent<TProps> = ({
  fields,
  onSubmit,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
  shouldResetForm,
  resetFormCallback,
}) => {
  const { t } = useTranslation();

  const validationSchema = object({
    date: string().required(t("common.required")),
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

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      onSubmit(formattedValues);
    },
  });

  const { values, setFieldValue, resetForm, handleBlur } = formik;

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
    },
    [setFieldValue]
  );
  const diseasesOptionsSelector = (state: IState) => {
    return state.diseases.diseasesOpd.data
      ? state.diseases.diseasesOpd.data.map((item) => {
          return { value: item.code + "", label: item.description + "" };
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
  };

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
      resetFormCallback();
    }
  }, [shouldResetForm, resetForm, resetFormCallback]);

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
      <div className="patientOpdForm">
        <form className="patientOpdForm__form" onSubmit={formik.handleSubmit}>
          <div className="row start-sm center-xs">
            <div className="patientOpdForm__item">
              <DateField
                fieldName="date"
                fieldValue={formik.values.date}
                disableFuture={true}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("date")}
                errorText={getErrorText("date")}
                label={t("opd.dateopd")}
                onChange={dateFieldHandleOnChange("date")}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientOpdForm__item fullWith">
              <TextField
                field={formik.getFieldProps("anamnesis")}
                multiline={true}
                theme="regular"
                label={t("opd.anamnesis")}
                isValid={isValid("anamnesis")}
                errorText={getErrorText("anamnesis")}
                onBlur={formik.handleBlur}
                type="string"
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientOpdForm__item fullWith">
              <SelectField
                fieldName="disease"
                fieldValue={formik.values.disease}
                label={t("opd.disease1")}
                isValid={isValid("disease")}
                errorText={getErrorText("disease")}
                onBlur={onBlurCallback("disease")}
                options={diseasesOptions}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientOpdForm__item fullWith">
              <SelectField
                fieldName="disease2"
                fieldValue={formik.values.disease2}
                label={t("opd.disease2")}
                isValid={isValid("disease2")}
                errorText={getErrorText("disease2")}
                onBlur={onBlurCallback("disease2")}
                options={diseasesOptions}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientOpdForm__item fullWith">
              <SelectField
                fieldName="disease3"
                fieldValue={formik.values.disease3}
                label={t("opd.disease3")}
                isValid={isValid("disease3")}
                errorText={getErrorText("disease3")}
                onBlur={onBlurCallback("disease3")}
                options={diseasesOptions}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientOpdForm__item fullWith">
              <TextField
                field={formik.getFieldProps("note")}
                multiline={true}
                theme="regular"
                label={t("opd.note")}
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
            info={t("common.resetform", { resetButtonLabel })}
            icon={warningIcon}
            primaryButtonLabel={resetButtonLabel}
            secondaryButtonLabel={t("common.dismiss")}
            handlePrimaryButtonClick={handleResetConfirmation}
            handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
          />
        </form>
      </div>
    </>
  );
};

export default PatientOPDForm;
