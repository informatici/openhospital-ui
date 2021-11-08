import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { object, string, number } from "yup";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../libraries/formDataHandling/functions";
import warningIcon from "../../../assets/warning-icon.png";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import SmallButton from "../smallButton/SmallButton";
import TextButton from "../textButton/TextButton";
import TextField from "../textField/TextField";
import SelectField from "../selectField/SelectField";
import "./styles.scss";
import { IState } from "../../../types";
import { TProps, IDispatchProps, IStateProps } from "./types";
import { useTranslation } from "react-i18next";
import {
  getMedicalTypes,
  getMedicalTypesSuccess,
} from "../../../state/medicaltypes/actions";
import { MedicalTypeDTO } from "../../../generated";
import isEmpty from "lodash.isempty";

import { medicalTypesFormatter } from "../../../libraries/formatUtils/optionFormatting";

const MedicalDataForm: FunctionComponent<TProps> = ({
  fields,
  onSubmit,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
  shouldResetForm,
  isMedTypeLoading,
  hasMedTypeSucceeded,
  hasMedTypeFailed,
  medicalTypes,
  medicalTypesOptions,
  getMedicalTypes,
}) => {
  const { t } = useTranslation();

  const validationSchema = object({
    type: string().required("This field is required"),
    code: number().required("This field is required"),
    description: string().required("This field is required"),
  });

  const initialValues = getFromFields(fields, "value");

  const history = useHistory();

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      //Use correct MedicalTypeDTO
      var medType = medicalTypes.find((mt) => mt.code == formattedValues.type);
      formattedValues.type = medType;
      onSubmit(formattedValues);
    },
  });

  useEffect(() => {
    if (!isMedTypeLoading && !hasMedTypeFailed && !hasMedTypeSucceeded)
      getMedicalTypes({});
    if (!isEmpty(medicalTypes) && isEmpty(medicalTypesOptions)) {
      medicalTypesOptions = medicalTypesFormatter(medicalTypes);
      setOptions(medicalTypesOptions);
      //Custom management of medical type
      if (!isEmpty(fields.type.value)) {
        setFieldValue(
          "type",
          medicalTypes.find(
            (x) => x.code == (fields.type.value as MedicalTypeDTO).code
          )?.code
        );
      }
    }
  }, [
    isMedTypeLoading,
    hasMedTypeFailed,
    hasMedTypeSucceeded,
    medicalTypesOptions,
  ]);

  const { setFieldValue, resetForm, handleBlur } = formik;

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  useEffect(() => {
    if (shouldResetForm) {
      resetForm();
    }
  }, [shouldResetForm, resetForm]);

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
  const [options, setOptions] = useState(medicalTypesOptions);

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    formik.resetForm();
  };
  return (
    <div className="medicalDataForm">
      <form className="medicalDataForm__form" onSubmit={formik.handleSubmit}>
        <div className="medicalDataForm__item">
          <SelectField
            fieldName="type"
            fieldValue={formik.values.type}
            label={t("medical.type")}
            isValid={isValid("type")}
            errorText={getErrorText("type")}
            onBlur={onBlurCallback("type")}
            options={options || []}
            disabled={initialValues.code != "" || isLoading}
          />
        </div>

        <div className="medicalDataForm__item">
          <TextField
            field={formik.getFieldProps("code")}
            theme="regular"
            label={t("medical.code")}
            isValid={isValid("code")}
            errorText={getErrorText("code")}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
        </div>

        <div className="medicalDataForm__item">
          <TextField
            field={formik.getFieldProps("description")}
            theme="regular"
            label={t("medical.description")}
            isValid={isValid("description")}
            errorText={getErrorText("description")}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
        </div>

        <div className="medicalDataForm__item">
          <TextField
            field={formik.getFieldProps("pcsperpck")}
            theme="regular"
            label={t("medical.pcsperpck")}
            isValid={isValid("pcsperpck")}
            errorText={getErrorText("pcsperpck")}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
        </div>

        <div className="row start-sm center-xs">
          <div className="medicalDataForm__item">
            <TextField
              field={formik.getFieldProps("minqty")}
              theme="regular"
              label={t("medical.minqty")}
              isValid={isValid("minqty")}
              errorText={getErrorText("minqty")}
              onBlur={formik.handleBlur}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="medicalDataForm__buttonSet">
          <div className="cancel_button">
            <SmallButton type="button" disabled={isLoading} onClick={() => { history.goBack() }}>
            {t("common.discard")}
            </SmallButton>
          </div>
          <div className="reset_button">
            <TextButton onClick={() => setOpenResetConfirmation(true)}>
              {resetButtonLabel}
            </TextButton>
          </div>
          <div className="submit_button">
            <SmallButton type="submit" disabled={isLoading}>
              {submitButtonLabel}
            </SmallButton>
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
  );
};

const mapStateToProps = (state: IState): IStateProps => ({
  isMedTypeLoading: state.medicaltypes.getMedicalType.status == "LOADING",
  hasMedTypeSucceeded: state.medicaltypes.getMedicalType.status == "SUCCESS",
  hasMedTypeFailed: state.medicaltypes.getMedicalType.status == "FAIL",
  medicalTypes: state.medicaltypes.getMedicalType.data || new Array(),
  medicalTypesOptions: [],
});

const mapDispatchToProps: IDispatchProps = {
  getMedicalTypes,
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalDataForm); //
