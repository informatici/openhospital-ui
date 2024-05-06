import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IOwnProps, TFilterFormFieldName } from "./types";
import { IconButton, Menu } from "@material-ui/core";
import { LocalBar } from "@material-ui/icons";
import classes from "./FilterButton.module.scss";
import { useFormik } from "formik";
import { TFields } from "../../../../libraries/formDataHandling/types";
import { object, string } from "yup";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import TextField from "../../textField/TextField";
import { useTranslation } from "react-i18next";
import { get, has, isEmpty } from "lodash";
import DateField from "../../dateField/DateField";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import SelectField from "../../selectField/SelectField";
import CheckboxField from "../../checkboxField/CheckboxField";
import classnames from "classnames";

export const FilterButton = ({ field, onChange }: IOwnProps) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fields: TFields<TFilterFormFieldName> = useMemo(() => {
    return {
      value: {
        type:
          field.type === "number" || field.type === "boolean"
            ? field.type
            : "text",
        value: "",
      },
      min: { type: field.type === "number" ? "number" : "text", value: "" },
      max: { type: field.type === "number" ? "number" : "text", value: "" },
    };
  }, [field.type]);

  const validationSchema = object({
    value: string(),
  });

  const formik = useFormik({
    initialValues: getFromFields(fields, "value"),
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formattedValues = formatAllFieldValues(fields, values);
      onChange({
        value:
          (values.value as string).length === 0
            ? undefined
            : formattedValues.value,
        min:
          (values.min as string).length === 0 ? undefined : formattedValues.min,
        max:
          (values.max as string).length === 0 ? undefined : formattedValues.max,
      } as any);
    },
  });

  const handleDateFieldChange = useCallback(
    (fieldName: string) => (value: any) => {
      formik.setFieldValue(fieldName, value);
      formik.setFieldTouched(fieldName);
    },
    [formik]
  );

  const handleCheckboxChange = useCallback(
    (fieldName: string) => (value: boolean) => {
      const currentValue = formik.values.value;
      if (currentValue === "false") {
        formik.setFieldValue(fieldName, "");
      } else {
        formik.setFieldValue(
          fieldName,
          isEmpty(currentValue) ? "true" : "false"
        );
      }
    },
    [formik]
  );

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  useEffect(() => {
    formik.submitForm();
  }, [formik.values]);

  return (
    <div>
      <IconButton
        aria-controls="filter-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <LocalBar
          className={classnames(classes.icon, {
            [classes.filtered]:
              !isEmpty(formik.values.value) ||
              !isEmpty(formik.values.min) ||
              !isEmpty(formik.values.max),
          })}
          fontSize="small"
        />
      </IconButton>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className={classes.filterButton}>
          <span className={classes.label}>{t("common.filter")}</span>
          {(field.type === "text" || field.type === "number") && (
            <TextField
              field={formik.getFieldProps("value")}
              theme="regular"
              label={field.label}
              isValid={isValid("value")}
              errorText={getErrorText("value")}
              onBlur={formik.handleBlur}
              type={field.type}
            />
          )}
          {field.type === "boolean" && (
            <CheckboxField
              fieldName={"value"}
              checked={formik.values.value === "true"}
              label={field.label}
              onChange={handleCheckboxChange("value")}
              indeterminate={isEmpty(formik.values.value)}
            />
          )}
          {field.type === "select" && (
            <>
              {(field.autocomplete && (
                <AutocompleteField
                  fieldName="value"
                  fieldValue={formik.values.value}
                  label={field.label}
                  isValid={isValid("value")}
                  errorText={getErrorText("value")}
                  onBlur={formik.handleBlur}
                  options={field.options}
                />
              )) || (
                <SelectField
                  fieldName="value"
                  fieldValue={formik.values.value}
                  label={field.label}
                  isValid={isValid("value")}
                  errorText={getErrorText("value")}
                  onBlur={formik.handleBlur}
                  options={field.options}
                />
              )}
            </>
          )}
          {field.type === "number" && (
            <>
              <TextField
                field={formik.getFieldProps("min")}
                theme="regular"
                label={t("common.min")}
                isValid={isValid("min")}
                errorText={getErrorText("min")}
                onBlur={formik.handleBlur}
                type="number"
              />
              <TextField
                field={formik.getFieldProps("max")}
                theme="regular"
                label={t("common.max")}
                isValid={isValid("max")}
                errorText={getErrorText("max")}
                onBlur={formik.handleBlur}
                type="number"
              />
            </>
          )}
          {field.type === "date" && (
            <>
              <DateField
                fieldName="min"
                fieldValue={formik.values.min}
                disableFuture={false}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("min")}
                errorText={getErrorText("min")}
                label={t("common.min")}
                onChange={handleDateFieldChange("min")}
                disabled={false}
              />
              <DateField
                fieldName="max"
                fieldValue={formik.values.max}
                disableFuture={false}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={isValid("max")}
                errorText={getErrorText("max")}
                label={t("common.max")}
                onChange={handleDateFieldChange("max")}
                disabled={false}
              />
            </>
          )}
        </div>
      </Menu>
    </div>
  );
};
