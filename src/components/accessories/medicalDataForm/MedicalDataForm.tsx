import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { object, string } from "yup";
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
import { getMedicalTypes, getMedicalTypesSuccess } from "../../../state/medicaltypes/actions";
import {MedicalTypeDTO } from "../../../generated";
import isEmpty from "lodash.isempty";

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
    code: string().required("This field is required"),
    description: string().required("This field is required"),
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

  useEffect(() => {
    if(!isMedTypeLoading && !hasMedTypeFailed && !hasMedTypeSucceeded)
      getMedicalTypes({});
    if(!isEmpty(medicalTypes) && isEmpty(medicalTypesOptions))
    {  
      medicalTypesOptions = setupOptions(medicalTypes);
      setOptions(medicalTypesOptions);
    }
  }
  , [isMedTypeLoading, hasMedTypeFailed, hasMedTypeSucceeded]);

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
            />
          </div>
        </div>
        <div className="medicalDataForm__buttonSet">
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

const setupOptions = (medicalTypes: Array<MedicalTypeDTO>) : {value: string, label: string}[] => {
  let options: {value: string, label: string}[] = [];
  if(medicalTypes)
  {
    medicalTypes.forEach(el => {
      let option: { value: string, label: string} =
       {
          value: el.code ?? '',
          label: el.description ?? ''
       };
       options.push(option);
    });
  }
  
  return options;
};

const mapStateToProps = (state: IState): IStateProps => ({
  isMedTypeLoading: state.medicaltypes.getMedicalType.status == 'LOADING',
  hasMedTypeSucceeded: state.medicaltypes.getMedicalType.status == 'SUCCESS',
  hasMedTypeFailed: state.medicaltypes.getMedicalType.status == 'FAIL',
  medicalTypes: state.medicaltypes.getMedicalType.data || new Array,
  medicalTypesOptions: [],
}); 

const mapDispatchToProps: IDispatchProps = {
  getMedicalTypes
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalDataForm); //
