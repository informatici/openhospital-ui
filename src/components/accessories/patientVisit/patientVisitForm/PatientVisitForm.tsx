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
import { number, object, string } from "yup";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import Button from "../../button/Button";
import warningIcon from "../../../../assets/warning-icon.png";
import AddIcon from "@mui/icons-material/Add";
import TextField from "../../textField/TextField";
import { get, has } from "lodash";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { TProps } from "./types";
import { IState } from "../../../../types";
import { useSelector } from "react-redux";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import { WardDTO } from "../../../../generated";

const PatientVisitForm: FunctionComponent<TProps> = ({
  fields,
  onSubmit,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
  shouldResetForm,
  resetFormCallback,
  addOperationCallback,
}) => {
  const { t } = useTranslation();

  const validationSchema = object({
    date: string().required(t("common.required")),
    service: string().required(t("common.required")),
    duration: number()
      .required(t("common.required"))
      .min(1, t("common.greaterthan", { value: "1" })),
  });

  const wards = useSelector<IState, WardDTO[]>(
    (state) => state.wards.allWards.data ?? []
  );

  const initialValues = getFromFields(fields, "value");

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      formattedValues.ward = wards.find((e) => e.code === formattedValues.ward);
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

  const wardOptionsSelector = (state: IState) => {
    return (
      state.wards.allWards.data?.map((item) => {
        return {
          value: item.code?.toString() ?? "",
          label: item.description ?? "",
        };
      }) ?? []
    );
  };
  const wardOptions = useSelector<IState, { value: string; label: string }[]>(
    (state: IState) => wardOptionsSelector(state)
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

  return (
    <>
      <div className="patientVisitForm">
        <form className="patientVisitForm__form" onSubmit={formik.handleSubmit}>
          <div className="row start-sm center-xs">
            <div className="patientVisitForm__item fullWith">
              <AutocompleteField
                fieldName="ward"
                fieldValue={formik.values.ward}
                label={t("visit.ward")}
                isValid={isValid("ward")}
                errorText={getErrorText("ward")}
                onBlur={onBlurCallback("ward")}
                options={wardOptions}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientVisitForm__item halfWidth">
              <DateField
                fieldName="date"
                fieldValue={formik.values.date}
                disableFuture={true}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("date")}
                errorText={getErrorText("date")}
                label={t("visit.date")}
                onChange={dateFieldHandleOnChange("date")}
                disabled={isLoading}
              />
            </div>
            <div className="patientVisitForm__item halfWidth">
              <TextField
                field={formik.getFieldProps("duration")}
                theme="regular"
                label={t("visit.duration")}
                isValid={isValid("duration")}
                errorText={getErrorText("duration")}
                onBlur={formik.handleBlur}
                type="number"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientVisitForm__item fullWith">
              <TextField
                field={formik.getFieldProps("service")}
                multiline={true}
                theme="regular"
                label={t("visit.service")}
                isValid={isValid("service")}
                errorText={getErrorText("service")}
                onBlur={formik.handleBlur}
                type="string"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="patientVisitForm__buttonSet">
            <div className="visits_button">
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
            <div className="add_button">
              <Button
                type="button"
                onClick={() => addOperationCallback!()}
                disabled={false}
              >
                {" "}
                <AddIcon fontSize="small" />
                {t("button.addoperation")}
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

export default PatientVisitForm;
