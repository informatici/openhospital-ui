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
import { number, object, string } from "yup";
import warningIcon from "../../../../../assets/warning-icon.png";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../../libraries/formDataHandling/functions";
import checkIcon from "../../../../../assets/check-icon.png";
import Button from "../../../button/Button";
import ConfirmationDialog from "../../../confirmationDialog/ConfirmationDialog";
import TextField from "../../../textField/TextField";
import "./styles.scss";
import { IWardProps } from "./types";
import CheckboxField from "../../../checkboxField/CheckboxField";
import { useDispatch, useSelector } from "libraries/hooks/redux";
import { IState } from "../../../../../types";
import InfoBox from "../../../infoBox/InfoBox";
import { useNavigate } from "react-router";
import { IWardState } from "../../../../../state/ward/types";
import { PATHS } from "../../../../../consts";
import { createWardReset, updateWardReset } from "../../../../../state/ward";

const FORMAT = /^([0-9]{3})?[0-9]{2,10}$/;

const WardForm: FC<IWardProps> = ({
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

  const wardStore = useSelector((state) => state.wards);

  const errorMessage = useMemo(
    () =>
      (creationMode
        ? wardStore.create.error?.message
        : wardStore.update.error?.message) ?? t("common.somethingwrong"),
    [
      creationMode,
      t,
      wardStore.create.error?.message,
      wardStore.update.error?.message,
    ]
  );

  const initialValues = getFromFields(fields, "value");

  const validationSchema = object({
    code: string().required(t("common.required")),
    description: string().required(t("common.required")),
    email: string().email(t("validations.email")),
    beds: number().min(0, t("validations.min", { min: 0 })),
    nurs: number().min(0, t("validations.min", { min: 0 })),
    docs: number().min(0, t("validations.min", { min: 0 })),
    visitDuration: number().min(0, t("validations.min", { min: 0 })),
    telephone: string().matches(FORMAT, t("common.incorrectformat")),
    fax: string().matches(FORMAT, t("common.incorrectformat")),
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

  const { setFieldValue } = formik;

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

  const handleCheckboxChange = useCallback(
    (fieldName: string) => (value: boolean) => {
      setFieldValue(fieldName, value ? "true" : "false");
    },
    [setFieldValue]
  );

  const cleanUp = useCallback(() => {
    if (creationMode) {
      dispatch(createWardReset());
    } else {
      dispatch(updateWardReset());
    }
  }, [creationMode, dispatch]);

  useEffect(() => {
    return cleanUp;
  }, [cleanUp]);

  return (
    <div className="wardForm">
      <form className="wardForm__form" onSubmit={formik.handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="wardForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("code")}
              theme="regular"
              label={t("ward.code")}
              isValid={isValid("code")}
              errorText={getErrorText("code")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading || !creationMode}
            />
          </div>
          <div className="wardForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("description")}
              theme="regular"
              label={t("ward.description")}
              isValid={isValid("description")}
              errorText={getErrorText("description")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="row start-sm center-xs">
          <div className="wardForm__item thirdWidth">
            <TextField
              field={formik.getFieldProps("email")}
              theme="regular"
              label={t("ward.email")}
              isValid={isValid("email")}
              errorText={getErrorText("email")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
          <div className="wardForm__item thirdWidth">
            <TextField
              field={formik.getFieldProps("telephone")}
              theme="regular"
              label={t("ward.telephone")}
              isValid={isValid("telephone")}
              errorText={getErrorText("telephone")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
          <div className="wardForm__item thirdWidth">
            <TextField
              field={formik.getFieldProps("fax")}
              theme="regular"
              label={t("ward.fax")}
              isValid={isValid("fax")}
              errorText={getErrorText("fax")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="row start-sm center-xs">
          <div className="wardForm__item">
            <TextField
              field={formik.getFieldProps("beds")}
              theme="regular"
              label={t("ward.beds")}
              isValid={isValid("beds")}
              errorText={getErrorText("beds")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
          <div className="wardForm__item">
            <TextField
              field={formik.getFieldProps("nurs")}
              theme="regular"
              label={t("ward.nurs")}
              isValid={isValid("nurs")}
              errorText={getErrorText("nurs")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
          <div className="wardForm__item">
            <TextField
              field={formik.getFieldProps("docs")}
              theme="regular"
              label={t("ward.docs")}
              isValid={isValid("docs")}
              errorText={getErrorText("docs")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
          <div className="wardForm__item">
            <TextField
              field={formik.getFieldProps("visitDuration")}
              theme="regular"
              label={t("ward.visitDuration")}
              isValid={isValid("visitDuration")}
              errorText={getErrorText("visitDuration")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="wardForm__item">
            <CheckboxField
              fieldName={"opd"}
              checked={formik.values.opd === "true"}
              label={t("ward.opd")}
              onChange={handleCheckboxChange("opd")}
            />
          </div>
          <div className="wardForm__item">
            <CheckboxField
              fieldName={"pharmacy"}
              checked={formik.values.pharmacy === "true"}
              label={t("ward.pharmacy")}
              onChange={handleCheckboxChange("pharmacy")}
            />
          </div>
          <div className="wardForm__item">
            <CheckboxField
              fieldName={"male"}
              checked={formik.values.male === "true"}
              label={t("ward.male")}
              onChange={handleCheckboxChange("male")}
            />
          </div>
          <div className="wardForm__item">
            <CheckboxField
              fieldName={"female"}
              checked={formik.values.female === "true"}
              label={t("ward.female")}
              onChange={handleCheckboxChange("female")}
            />
          </div>
        </div>

        <div className="wardForm__buttonSet">
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
              dataCy="cancel-form"
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
          primaryButtonLabel={t("common.ok")}
          secondaryButtonLabel={t("common.discard")}
          handlePrimaryButtonClick={handleResetConfirmation}
          handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
        />
        {(creationMode
          ? wardStore.create.status === "FAIL"
          : wardStore.update.status === "FAIL") && (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}
        <ConfirmationDialog
          isOpen={
            !!(creationMode
              ? wardStore.create.hasSucceeded
              : wardStore.update.hasSucceeded)
          }
          title={creationMode ? t("ward.created") : t("ward.updated")}
          icon={checkIcon}
          info={
            creationMode
              ? t("ward.createSuccess")
              : t("ward.updateSuccess", { code: formik.values.code })
          }
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() => {
            navigate(PATHS.admin_wards);
          }}
          handleSecondaryButtonClick={() => ({})}
        />
      </form>
    </div>
  );
};

export default WardForm;
