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
import { object } from "yup";
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
import { IDiseaseState } from "../../../../state/diseases/types";
import SelectField from "../../selectField/SelectField";
import { format } from "date-fns";

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

  const [diseasesOptions, setDiseasesOptions] = useState(
    Array<{
      value: string;
      label: string;
    }>()
  );
  const initialValues = getFromFields(fields, "value");

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      const disease1 = diseaseSate.diseasesAll.data!.filter(
        (el) => el.code === +values.disease
      );
      const disease2 = diseaseSate.diseasesAll.data!.filter(
        (el) => el.code === +values.disease2
      );
      const disease3 = diseaseSate.diseasesAll.data!.filter(
        (el) => el.code === +values.disease3
      );
      formattedValues.disease = disease1 ? disease1[0] : undefined;
      formattedValues.disease2 = disease2 ? disease2[0] : undefined;
      formattedValues.disease3 = disease3 ? disease3[0] : undefined;
      formattedValues.date = values.date ? values.date : undefined;

      onSubmit(formattedValues);
    },
  });

  const { setFieldValue, resetForm, handleBlur } = formik;
  const { t } = useTranslation();

  const dateFieldHandleOnChange = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
    },
    [setFieldValue]
  );
  const diseaseSate = useSelector<IState, IDiseaseState>(
    (state: IState) => state.diseases
  );

  useEffect(() => {
    if (diseaseSate.diseasesAll.data!.length > 0) {
      setDiseasesOptions(
        diseaseSate.diseasesAll.data!.map((item) => {
          return { value: item.code! + "", label: item.description! };
        })
      );
    }
  }, [diseaseSate]);
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
                fieldValue={formik.values.opdDate}
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
                label="disease"
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
                label="disease2"
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
                label="disease3"
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
