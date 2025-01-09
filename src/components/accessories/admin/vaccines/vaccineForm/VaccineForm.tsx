import { ChevronLeft } from "@mui/icons-material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { useDiscardHelpers } from "libraries/hooks/ui";
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
import { useNavigate } from "react-router";
import { object, string } from "yup";
import checkIcon from "../../../../../assets/check-icon.png";
import warningIcon from "../../../../../assets/warning-icon.png";
import { PATHS } from "../../../../../consts";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../../libraries/formDataHandling/functions";
import { getVaccineTypes } from "../../../../../state/types/vaccines";
import {
  createVaccineReset,
  updateVaccineReset,
} from "../../../../../state/vaccines";
import { IState } from "../../../../../types";
import AutocompleteField from "../../../autocompleteField/AutocompleteField";
import Button from "../../../button/Button";
import ConfirmationDialog from "../../../confirmationDialog/ConfirmationDialog";
import InfoBox from "../../../infoBox/InfoBox";
import TextField from "../../../textField/TextField";
import "./styles.scss";
import { IVaccineFormProps } from "./types";

const VaccineForm: FC<IVaccineFormProps> = ({
  fields,
  onSubmit,
  creationMode,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const vaccineStore = useAppSelector((state) => state.vaccines);

  const vaccinesTypeState = useAppSelector(
    (state: IState) => state.types.vaccines.getVaccineTypes
  );

  const vaccinesTypeOptions = useMemo(
    () =>
      vaccinesTypeState.data?.map((item) => ({
        value: item.code,
        label: item.description,
      })) ?? [],
    [vaccinesTypeState.data]
  );

  const {
    openCancelConfirmation,
    handleCancelConfirmation,
    handleCancelConfirmationDialog,
  } = useDiscardHelpers();

  const errorMessage = useMemo(
    () =>
      (creationMode
        ? vaccineStore.create.error?.message
        : vaccineStore.update.error?.message) ?? t("common.somethingwrong"),
    [
      creationMode,
      t,
      vaccineStore.create.error?.message,
      vaccineStore.update.error?.message,
    ]
  );

  const initialValues = getFromFields(fields, "value");

  const validationSchema = object({
    code: string().required(t("common.required")),
    description: string().required(t("common.required")),
    vaccineType: string().required(t("common.required")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      formattedValues.vaccineType = vaccinesTypeState.data?.find(
        (item) => item.code === values.vaccineType
      );
      onSubmit(formattedValues as any);
    },
  });

  const { setFieldValue, handleBlur } = formik;

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  const handleResetConfirmationDialog = useCallback(
    (value: boolean) => () => {
      setOpenResetConfirmation(value);
    },
    [setOpenResetConfirmation]
  );

  const handleResetConfirmation = useCallback(() => {
    setOpenResetConfirmation(false);
    formik.resetForm();
  }, [navigate, formik.resetForm, setOpenResetConfirmation]);

  const onBlurCallback = useCallback(
    (fieldName: string) =>
      (e: React.FocusEvent<HTMLDivElement>, value: string) => {
        handleBlur(e);
        setFieldValue(fieldName, value);
      },
    [handleBlur, setFieldValue]
  );

  const cleanUp = useCallback(() => {
    if (creationMode) {
      dispatch(createVaccineReset());
    } else {
      dispatch(updateVaccineReset());
    }
  }, [creationMode, dispatch]);

  useEffect(() => {
    dispatch(getVaccineTypes());
  }, [dispatch]);

  useEffect(() => {
    return cleanUp;
  }, [cleanUp]);

  return (
    <div className="vaccineForm">
      <div className="vaccineForm__header">
        <div className="vaccineForm__actions">
          <Button
            dataCy="cancel-form"
            onClick={handleCancelConfirmationDialog(true)}
            type="button"
            variant="text"
            color="primary"
          >
            <ChevronLeft fontSize="small" />
            {t("common.discard")}
          </Button>
        </div>
      </div>
      <form className="vaccineForm__form" onSubmit={formik.handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="vaccineForm__item">
            <TextField
              field={formik.getFieldProps("code")}
              theme="regular"
              label={t("vaccine.code")}
              isValid={isValid("code")}
              errorText={getErrorText("code")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading || !creationMode}
            />
          </div>
          <div className="vaccineForm__item">
            <AutocompleteField
              fieldName="vaccineType"
              fieldValue={formik.values.vaccineType}
              label={t("vaccine.vaccinetype")}
              isValid={isValid("vaccineType")}
              errorText={getErrorText("vaccineType")}
              onBlur={onBlurCallback("vaccineType")}
              options={vaccinesTypeOptions}
              loading={vaccinesTypeState.status === "LOADING"}
              disabled={isLoading}
            />
          </div>
          <div className="vaccineForm__item">
            <TextField
              field={formik.getFieldProps("description")}
              theme="regular"
              label={t("vaccine.description")}
              isValid={isValid("description")}
              errorText={getErrorText("description")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="vaccineForm__buttonSet">
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
              dataCy="reset-form"
              type="reset"
              variant="text"
              disabled={isLoading || !formik.dirty}
              onClick={handleResetConfirmationDialog(true)}
            >
              {resetButtonLabel}
            </Button>
          </div>
        </div>
        <ConfirmationDialog
          isOpen={openCancelConfirmation}
          title={t("common.discard")}
          info={t("common.discardMessage")}
          icon={warningIcon}
          primaryButtonLabel={t("common.discard")}
          secondaryButtonLabel={t("common.backToEdit")}
          handlePrimaryButtonClick={handleCancelConfirmation}
          handleSecondaryButtonClick={handleCancelConfirmationDialog(false)}
        />
        <ConfirmationDialog
          isOpen={openResetConfirmation}
          title={t("common.reset")}
          info={t("common.resetform")}
          icon={warningIcon}
          primaryButtonLabel={t("common.reset")}
          secondaryButtonLabel={t("common.backToEdit")}
          handlePrimaryButtonClick={handleResetConfirmation}
          handleSecondaryButtonClick={handleResetConfirmationDialog(false)}
        />
        {(creationMode
          ? vaccineStore.create.status === "FAIL"
          : vaccineStore.update.status === "FAIL") && (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}
        <ConfirmationDialog
          isOpen={
            !!(creationMode
              ? vaccineStore.create.hasSucceeded
              : vaccineStore.update.hasSucceeded)
          }
          title={creationMode ? t("vaccine.created") : t("vaccine.updated")}
          icon={checkIcon}
          info={
            creationMode
              ? t("vaccine.createSuccess")
              : t("vaccine.updateSuccess", { code: formik.values.code })
          }
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() => {
            navigate(PATHS.admin_vaccines);
          }}
          handleSecondaryButtonClick={() => ({})}
        />
      </form>
    </div>
  );
};

export default VaccineForm;
