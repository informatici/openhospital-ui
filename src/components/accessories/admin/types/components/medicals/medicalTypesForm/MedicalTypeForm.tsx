import { useFormik } from "formik";
import { get, has } from "lodash";
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";
import warningIcon from "../../../../../../../assets/warning-icon.png";
import checkIcon from "../../../../../../../assets/check-icon.png";
import "./styles.scss";
import { IMedicalTypeFormProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { IState } from "../../../../../../../types";
import { IMedicalTypesState } from "../../../../../../../state/types/medicals/types";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../../../../libraries/formDataHandling/functions";
import {
  createMedicalTypeReset,
  updateMedicalTypeReset,
} from "../../../../../../../state/types/medicals/actions";
import TextField from "../../../../../textField/TextField";
import Button from "../../../../../button/Button";
import ConfirmationDialog from "../../../../../confirmationDialog/ConfirmationDialog";
import InfoBox from "../../../../../infoBox/InfoBox";
import { PATHS } from "../../../../../../../consts";

const MedicalTypeForm: FC<IMedicalTypeFormProps> = ({
  fields,
  onSubmit,
  creationMode,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const medicalTypesStore = useSelector<IState, IMedicalTypesState>(
    (state) => state.types.medicals
  );

  const errorMessage = useMemo(
    () =>
      (creationMode
        ? medicalTypesStore.create.error?.message
        : medicalTypesStore.update.error?.message) ??
      t("common.somethingwrong"),
    [
      creationMode,
      t,
      medicalTypesStore.create.error?.message,
      medicalTypesStore.update.error?.message,
    ]
  );

  const initialValues = getFromFields(fields, "value");

  const validationSchema = object({
    code: string().required(t("common.required")),
    description: string().required(t("common.required")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      onSubmit(formattedValues as any);
    },
  });

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    navigate(-1);
  };

  const cleanUp = useCallback(() => {
    if (creationMode) {
      dispatch(createMedicalTypeReset());
    } else {
      dispatch(updateMedicalTypeReset());
    }
  }, [creationMode, dispatch]);

  useEffect(() => {
    return cleanUp;
  }, [cleanUp]);

  return (
    <div className="medicalTypesForm">
      <form className="medicalTypesForm__form" onSubmit={formik.handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="medicalTypesForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("code")}
              theme="regular"
              label={t("medicalTypes.code")}
              isValid={isValid("code")}
              errorText={getErrorText("code")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading || !creationMode}
            />
          </div>
          <div className="medicalTypesForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("description")}
              theme="regular"
              label={t("medicalTypes.description")}
              isValid={isValid("description")}
              errorText={getErrorText("description")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="medicalTypesForm__buttonSet">
          <div className="submit_button">
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              dataCy="submit-form"
            >
              {submitButtonLabel}
            </Button>
          </div>
          <div className="reset_button">
            <Button
              type="reset"
              variant="text"
              disabled={isLoading}
              onClick={() => setOpenResetConfirmation(true)}
              dataCy="cancel-form"
            >
              {resetButtonLabel}
            </Button>
          </div>
        </div>
        <ConfirmationDialog
          isOpen={openResetConfirmation}
          title={resetButtonLabel.toUpperCase()}
          info={
            creationMode
              ? t("medicalTypes.cancelCreation")
              : t("medicalTypes.cancelUpdate")
          }
          icon={warningIcon}
          primaryButtonLabel={t("common.ok")}
          secondaryButtonLabel={t("common.discard")}
          handlePrimaryButtonClick={handleResetConfirmation}
          handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
        />
        {(creationMode
          ? medicalTypesStore.create.status === "FAIL"
          : medicalTypesStore.update.status === "FAIL") && (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}
        <ConfirmationDialog
          isOpen={
            !!(creationMode
              ? medicalTypesStore.create.hasSucceeded
              : medicalTypesStore.update.hasSucceeded)
          }
          title={
            creationMode ? t("medicalTypes.created") : t("medicalTypes.updated")
          }
          icon={checkIcon}
          info={
            creationMode
              ? t("medicalTypes.createSuccess")
              : t("medicalTypes.updateSuccess", { code: formik.values.code })
          }
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() => {
            navigate(PATHS.admin_medicals_types);
          }}
          handleSecondaryButtonClick={() => ({})}
        />
      </form>
    </div>
  );
};

export default MedicalTypeForm;
