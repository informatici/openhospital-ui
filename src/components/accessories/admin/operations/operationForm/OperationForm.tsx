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
import { IOperationProps } from "./types";
import CheckboxField from "../../../checkboxField/CheckboxField";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../types";
import InfoBox from "../../../infoBox/InfoBox";
import { useNavigate } from "react-router";
import { IOperationState } from "../../../../../state/operations/types";
import { PATHS } from "../../../../../consts";
import {
  createOperationReset,
  updateOperationReset,
} from "../../../../../state/operations/actions";
import AutocompleteField from "../../../autocompleteField/AutocompleteField";
import { getOperationTypes } from "../../../../../state/operationTypes/actions";

const OperationForm: FC<IOperationProps> = ({
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

  const operationStore = useSelector<IState, IOperationState>(
    (state) => state.operations
  );

  const operationsTypeState = useSelector(
    (state: IState) => state.operationTypes.getOperationTypes
  );

  const operationsTypeOptions = useMemo(
    () =>
      operationsTypeState.data?.map((item) => ({
        value: item.code,
        label: item.description,
      })) ?? [],
    [operationsTypeState.data]
  );

  const errorMessage = useMemo(
    () =>
      (creationMode
        ? operationStore.create.error?.message
        : operationStore.update.error?.message) ?? t("common.somethingwrong"),
    [
      creationMode,
      t,
      operationStore.create.error?.message,
      operationStore.update.error?.message,
    ]
  );

  const initialValues = getFromFields(fields, "value");

  const validationSchema = object({
    code: string().required(t("common.required")),
    description: string().required(t("common.required")),
    type: string().required(t("common.required")),
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

  const { setFieldValue, handleBlur } = formik;

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
      setFieldValue(fieldName, value ? "0" : "1");
    },
    [setFieldValue]
  );

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
      dispatch(createOperationReset());
    } else {
      dispatch(updateOperationReset());
    }
  }, [creationMode, dispatch]);

  useEffect(() => {
    dispatch(getOperationTypes());
  }, [dispatch]);

  useEffect(() => {
    return cleanUp;
  }, [cleanUp]);

  return (
    <div className="operationForm">
      <form className="operationForm__form" onSubmit={formik.handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="operationForm__item fullWidth">
            <AutocompleteField
              fieldName="type"
              fieldValue={formik.values.type}
              label={t("operation.type")}
              isValid={isValid("type")}
              errorText={getErrorText("type")}
              onBlur={onBlurCallback("type")}
              options={operationsTypeOptions}
              loading={operationsTypeState.status === "LOADING"}
              disabled={isLoading}
            />
          </div>
          <div className="operationForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("code")}
              theme="regular"
              label={t("operation.code")}
              isValid={isValid("code")}
              errorText={getErrorText("code")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading || !creationMode}
            />
          </div>
          <div className="operationForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("description")}
              theme="regular"
              label={t("operation.description")}
              isValid={isValid("description")}
              errorText={getErrorText("description")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="operationForm__item">
            <CheckboxField
              fieldName={"major"}
              checked={formik.values.major === "1"}
              label={t("operation.classes.major")}
              onChange={handleCheckboxChange("major")}
            />
          </div>
        </div>

        <div className="operationForm__buttonSet">
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
          ? operationStore.create.status === "FAIL"
          : operationStore.update.status === "FAIL") && (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}
        <ConfirmationDialog
          isOpen={
            !!(creationMode
              ? operationStore.create.hasSucceeded
              : operationStore.update.hasSucceeded)
          }
          title={creationMode ? t("operation.created") : t("operation.updated")}
          icon={checkIcon}
          info={
            creationMode
              ? t("operation.createSuccess")
              : t("operation.updateSuccess", { code: formik.values.code })
          }
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() => {
            navigate(PATHS.operations);
          }}
          handleSecondaryButtonClick={() => ({})}
        />
      </form>
    </div>
  );
};

export default OperationForm;
