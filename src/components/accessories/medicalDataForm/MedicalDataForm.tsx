import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { object, string, number } from "yup";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { formatAllFieldValues, getFromFields } from "../../../libraries/formDataHandling/functions";
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
import { getMedicalTypes } from "../../../state/medicaltypes/actions";
import { MedicalTypeDTO } from "../../../generated";
import isEmpty from "lodash.isempty";

import { medicalTypesFormatter } from "../../../libraries/formatUtils/optionFormatting";

const MedicalDataForm: FunctionComponent<TProps> = (
  props
  ) => {
  const { t } = useTranslation();

  const validationSchema = object({
    type: string().required(t("common.required")),
    prod_code: string().required(t("common.required")),
    description: string().required(t("common.required")),
    pcsperpck: number(),
    minqty: number()
  });

  const initialValues = getFromFields(props.fields, "value");

  const history = useHistory();

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(props.fields, values);
      //Use correct MedicalTypeDTO
      formattedValues.type = props.medicalTypes.find((mt: MedicalTypeDTO) => mt.code === formattedValues.type);
      props.onSubmit(formattedValues);
    },
  });

  useEffect(() => {
    if (props.medicalTypeStatus == "IDLE")
      props.getMedicalTypes({});
    if (!isEmpty(props.medicalTypes) && isEmpty(props.medicalTypesOptions)) {
      setOptions(medicalTypesFormatter(props.medicalTypes));
      //Custom management of medical type
      if (!isEmpty(props.fields.type.value)) {
        setFieldValue(
          "type",
          props.medicalTypes.find(
            (x: MedicalTypeDTO) => x.code == (props.fields.type.value as MedicalTypeDTO).code
          )?.code
        );
      }
    }
  }, [
    props.medicalTypeStatus,
    props.medicalTypesOptions,
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
    if (props.shouldResetForm) {
      resetForm();
    }
  }, [props.shouldResetForm, resetForm]);

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
  const [options, setOptions] = useState(props.medicalTypesOptions);

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
            disabled={initialValues.code != "0" || props.isLoading}
          />
        </div>

        <div className="medicalDataForm__item">
          <TextField
            field={formik.getFieldProps("prod_code")}
            theme="regular"
            label={t("medical.prod_code")}
            isValid={isValid("prod_code")}
            errorText={getErrorText("prod_code")}
            onBlur={formik.handleBlur}
            disabled={props.isLoading}
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
            disabled={props.isLoading}
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
            disabled={props.isLoading}
          />
        </div>

        <div className="medicalDataForm__item">
          <TextField
            field={formik.getFieldProps("minqty")}
            theme="regular"
            label={t("medical.minqty")}
            isValid={isValid("minqty")}
            errorText={getErrorText("minqty")}
            onBlur={formik.handleBlur}
            disabled={props.isLoading}
          />
        </div>

        <div className="medicalDataForm__buttonSet">
          <div className="cancel_button">
            <SmallButton type="button" disabled={props.isLoading} onClick={() => { history.goBack() }}>
            {t("common.discard")}
            </SmallButton>
          </div>
          <div className="reset_button">
            <TextButton onClick={() => setOpenResetConfirmation(true)}>
              {props.resetButtonLabel}
            </TextButton>
          </div>
          <div className="submit_button">
            <SmallButton type="submit" disabled={props.isLoading}>
              {props.submitButtonLabel}
            </SmallButton>
          </div>
        </div>
        <ConfirmationDialog
          isOpen={openResetConfirmation}
          title={props.resetButtonLabel.toUpperCase()}
          info={`Are you sure to ${props.resetButtonLabel} the Form?`}
          icon={warningIcon}
          primaryButtonLabel={props.resetButtonLabel}
          secondaryButtonLabel="Dismiss"
          handlePrimaryButtonClick={handleResetConfirmation}
          handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state: IState): IStateProps => ({
  medicalTypeStatus: state.medicaltypes.getMedicalType.status || "IDLE",
  medicalTypes: state.medicaltypes.getMedicalType.data || new Array(),
  medicalTypesOptions: [],
});

const mapDispatchToProps: IDispatchProps = {
  getMedicalTypes,
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalDataForm); //
