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
import { IAdmissionTypeFormProps } from "./types";
import { useDispatch, useSelector } from "libraries/hooks/redux";
import { useNavigate } from "react-router";
import { IState } from "../../../../../../../types";
import { IAdmissionTypesState } from "../../../../../../../state/types/admissions/types";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../../../../libraries/formDataHandling/functions";
import {
  createAdmissionTypeReset,
  updateAdmissionTypeReset,
} from "../../../../../../../state/types/admissions";
import TextField from "../../../../../textField/TextField";
import Button from "../../../../../button/Button";
import ConfirmationDialog from "../../../../../confirmationDialog/ConfirmationDialog";
import InfoBox from "../../../../../infoBox/InfoBox";
import { PATHS } from "../../../../../../../consts";

const AdmissionTypeForm: FC<IAdmissionTypeFormProps> = ({
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

  const admissionTypesStore = useSelector<IState, IAdmissionTypesState>(
    (state) => state.types.admissions
  );

  const errorMessage = useMemo(
    () =>
      (creationMode
        ? admissionTypesStore.create.error?.message
        : admissionTypesStore.update.error?.message) ??
      t("common.somethingwrong"),
    [
      creationMode,
      t,
      admissionTypesStore.create.error?.message,
      admissionTypesStore.update.error?.message,
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
      dispatch(createAdmissionTypeReset());
    } else {
      dispatch(updateAdmissionTypeReset());
    }
  }, [creationMode, dispatch]);

  useEffect(() => {
    return cleanUp;
  }, [cleanUp]);

  return (
    <div className="admissionTypesForm">
      <form className="admissionTypesForm__form" onSubmit={formik.handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="admissionTypesForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("code")}
              theme="regular"
              label={t("admissionTypes.code")}
              isValid={isValid("code")}
              errorText={getErrorText("code")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading || !creationMode}
            />
          </div>
          <div className="admissionTypesForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("description")}
              theme="regular"
              label={t("admissionTypes.description")}
              isValid={isValid("description")}
              errorText={getErrorText("description")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="admissionTypesForm__buttonSet">
          <div className="submit_button">
            <Button
              type="submit"
              dataCy="submit-form"
              variant="contained"
              disabled={isLoading}
            >
              {submitButtonLabel}
            </Button>
          </div>
          <div className="reset_button">
            <Button
              type="reset"
              variant="text"
              dataCy="cancel-form"
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
          info={
            creationMode
              ? t("admissionTypes.cancelCreation")
              : t("admissionTypes.cancelUpdate")
          }
          icon={warningIcon}
          primaryButtonLabel={t("common.ok")}
          secondaryButtonLabel={t("common.discard")}
          handlePrimaryButtonClick={handleResetConfirmation}
          handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
        />
        {(creationMode
          ? admissionTypesStore.create.status === "FAIL"
          : admissionTypesStore.update.status === "FAIL") && (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}
        <ConfirmationDialog
          isOpen={
            !!(creationMode
              ? admissionTypesStore.create.hasSucceeded
              : admissionTypesStore.update.hasSucceeded)
          }
          title={
            creationMode
              ? t("admissionTypes.created")
              : t("admissionTypes.updated")
          }
          icon={checkIcon}
          info={
            creationMode
              ? t("admissionTypes.createSuccess")
              : t("admissionTypes.updateSuccess", { code: formik.values.code })
          }
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() => {
            navigate(PATHS.admin_admissions_types);
          }}
          handleSecondaryButtonClick={() => ({})}
        />
      </form>
    </div>
  );
};

export default AdmissionTypeForm;
