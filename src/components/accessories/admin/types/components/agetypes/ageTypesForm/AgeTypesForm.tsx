import DiscardButton from "components/accessories/discardButton/DiscardButton";
import ResetButton from "components/accessories/resetButton/resetButton";
import { useFormik } from "formik";
import { AgeTypeDTO } from "generated";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { get, has } from "lodash";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { updateAgeTypeReset } from "state/types/ageTypes";
import { array, number, object, ref, string } from "yup";
import checkIcon from "../../../../../../../assets/check-icon.png";
import { PATHS } from "../../../../../../../consts";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../../../../libraries/formDataHandling/functions";
import Button from "../../../../../button/Button";
import ConfirmationDialog from "../../../../../confirmationDialog/ConfirmationDialog";
import InfoBox from "../../../../../infoBox/InfoBox";
import AgeTypeFields from "./AgeTypeFields";
import { validateRange } from "./consts";
import "./styles.scss";
import { IAgeTypesFormProps } from "./types";

const AgeTypesForm: FC<IAgeTypesFormProps> = ({
  onSubmit,
  rows,
  submitButtonLabel,
  resetButtonLabel,
  isLoading,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const updateAgeTypes = useAppSelector((state) => state.types.ageTypes.update);

  const errorMessage = useMemo(
    () => updateAgeTypes.error?.message ?? t("common.somethingwrong"),
    [t, updateAgeTypes.error?.message]
  );

  const initialValues = {
    ageTypes: rows.map((fields) => getFromFields(fields, "value")),
  };

  const validationSchema = object({
    ageTypes: array(
      object({
        code: string().required(t("common.required")),
        description: string().required(t("common.required")),
        from: number()
          .required(t("common.required"))
          .min(0, t("common.greaterthan", { value: 0 })),
        to: number()
          .required(t("common.required"))
          .min(ref("from"), t("ageTypes.shouldbegreaterthanfrom")),
      })
    ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = rows.map((fields, index) =>
        formatAllFieldValues(fields, values.ageTypes[index])
      );

      const errors = validateRange(formattedValues as AgeTypeDTO[], t);
      setValidationErrors(errors);
      if (errors.length === 0) {
        onSubmit(formattedValues as any);
      }
    },
  });

  const isValid = (fieldName: string, index: number): boolean => {
    return (
      has(formik.touched.ageTypes?.[index], fieldName) &&
      has(formik.errors.ageTypes?.[index], fieldName)
    );
  };

  const getErrorText = (fieldName: string, index: number): string => {
    return has(formik.touched.ageTypes?.[index], fieldName)
      ? (get(formik.errors.ageTypes?.[index], fieldName) as string)
      : "";
  };

  useEffect(() => {
    return () => {
      dispatch(updateAgeTypeReset());
    };
  }, [dispatch]);

  return (
    <div className="ageTypesForm">
      <div className="form__header">
        <div className="form__actions">
          <DiscardButton />
        </div>
      </div>
      <form className="ageTypesForm__form" onSubmit={formik.handleSubmit}>
        <div className="row">
          <table className="ageTypesFormTable">
            <thead>
              <tr>
                <th>{t("ageTypes.code")}</th>
                <th>{t("ageTypes.from")}</th>
                <th>{t("ageTypes.to")}</th>
                <th>{t("ageTypes.description")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((fields, index) => (
                <AgeTypeFields
                  formik={formik}
                  getErrorText={getErrorText}
                  index={index}
                  isValid={isValid}
                  key={index}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="ageTypesForm__buttonSet">
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
            <ResetButton formik={formik as any} title={resetButtonLabel} />
          </div>
        </div>
        {updateAgeTypes.status === "FAIL" && (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}
        {validationErrors.length > 0 && (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="error" message={validationErrors.join("; ")} />
          </div>
        )}
        <ConfirmationDialog
          isOpen={!!updateAgeTypes.hasSucceeded}
          title={t("ageTypes.updated")}
          icon={checkIcon}
          info={t("ageTypes.updateSuccess")}
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() => {
            navigate(PATHS.admin_age_types, { replace: true });
          }}
          handleSecondaryButtonClick={() => ({})}
        />
      </form>
    </div>
  );
};

export default AgeTypesForm;
