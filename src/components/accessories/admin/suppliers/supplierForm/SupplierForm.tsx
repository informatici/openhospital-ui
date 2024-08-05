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
import { ISupplierFormProps } from "./types";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { IState } from "../../../../../types";
import InfoBox from "../../../infoBox/InfoBox";
import { useNavigate } from "react-router";
import { PATHS } from "../../../../../consts";
import { ISupplierState } from "../../../../../state/suppliers/types";
import {
  createSupplierReset,
  updateSupplierReset,
} from "../../../../../state/suppliers";
import "./styles.scss";

const FORMAT = /^([0-9]{3})?[0-9]{2,10}$/;

const SupplierForm: FC<ISupplierFormProps> = ({
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

  const supplierStore = useAppSelector((state) => state.suppliers);

  const errorMessage = useMemo(
    () =>
      (creationMode
        ? supplierStore.create.error?.message
        : supplierStore.update.error?.message) ?? t("common.somethingwrong"),
    [
      creationMode,
      t,
      supplierStore.create.error?.message,
      supplierStore.update.error?.message,
    ]
  );

  const initialValues = getFromFields(fields, "value");

  const validationSchema = object({
    supId: string().notRequired(),
    supName: string().required(t("common.required")),
    supAddress: string().notRequired(),
    supTaxcode: string().notRequired(),
    supPhone: string().notRequired(),
    //.matches(FORMAT, t("common.incorrectformat")),
    supFax: string().notRequired(),
    //.matches(FORMAT, t("common.incorrectformat")),
    supEmail: string().notRequired().email(t("validations.email")),
    supNote: string().notRequired(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      if (creationMode) {
        formattedValues.supId = 0;
      }
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
      dispatch(createSupplierReset());
    } else {
      dispatch(updateSupplierReset());
    }
  }, [creationMode, dispatch]);

  useEffect(() => {
    return cleanUp;
  }, [cleanUp]);

  return (
    <div className="supplierForm">
      <form className="supplierForm__form" onSubmit={formik.handleSubmit}>
        <div className="row start-sm center-xs">
          {!creationMode && (
            <div className="supplierForm__item halfWidth">
              <TextField
                field={formik.getFieldProps("supId")}
                theme="regular"
                label={t("supplier.id")}
                isValid={isValid("supId")}
                errorText={getErrorText("supId")}
                onBlur={formik.handleBlur}
                type="text"
                disabled={isLoading || !creationMode}
              />
            </div>
          )}
          <div className="supplierForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("supName")}
              theme="regular"
              label={t("supplier.name")}
              isValid={isValid("supName")}
              errorText={getErrorText("supName")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
          <div className="supplierForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("supAddress")}
              theme="regular"
              label={t("supplier.address")}
              isValid={isValid("supAddress")}
              errorText={getErrorText("supAddress")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
          <div className="supplierForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("supTaxcode")}
              theme="regular"
              label={t("supplier.taxcode")}
              isValid={isValid("supTaxcode")}
              errorText={getErrorText("supTaxcode")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>

          <div className="supplierForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("supPhone")}
              theme="regular"
              label={t("supplier.phone")}
              isValid={isValid("supPhone")}
              errorText={getErrorText("supPhone")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
          <div className="supplierForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("supFax")}
              theme="regular"
              label={t("supplier.fax")}
              isValid={isValid("supFax")}
              errorText={getErrorText("supFax")}
              onBlur={formik.handleBlur}
              type="text"
              disabled={isLoading}
            />
          </div>
          <div className="supplierForm__item halfWidth">
            <TextField
              field={formik.getFieldProps("supEmail")}
              theme="regular"
              label={t("supplier.email")}
              isValid={isValid("supEmail")}
              errorText={getErrorText("supEmail")}
              onBlur={formik.handleBlur}
              type="email"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="row start-sm center-xs">
          <div className="supplierForm__item fullWidth">
            <TextField
              field={formik.getFieldProps("supNote")}
              theme="regular"
              label={t("supplier.note")}
              multiline={true}
              type="text"
              isValid={isValid("supNote")}
              errorText={getErrorText("supNote")}
              onBlur={formik.handleBlur}
              rows={3}
              disabled={isLoading}
              maxLength={1500}
            />
          </div>
        </div>

        <div className="supplierForm__buttonSet">
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
          ? supplierStore.create.status === "FAIL"
          : supplierStore.update.status === "FAIL") && (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}
        <ConfirmationDialog
          isOpen={
            !!(creationMode
              ? supplierStore.create.hasSucceeded
              : supplierStore.update.hasSucceeded)
          }
          title={creationMode ? t("supplier.created") : t("supplier.updated")}
          icon={checkIcon}
          info={
            creationMode
              ? t("supplier.createSuccess")
              : t("supplier.updateSuccess", { supId: formik.values.supId })
          }
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() => {
            navigate(PATHS.admin_suppliers);
          }}
          handleSecondaryButtonClick={() => ({})}
        />
      </form>
    </div>
  );
};

export default SupplierForm;
