import { useFormik } from "formik";
import { has, get } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { number, object, string } from "yup";
import { BillItemsDTO } from "../../../../generated";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import { TFields } from "../../../../libraries/formDataHandling/types";
import { useItems } from "../hooks";
import { BillItemFormFieldName } from "./types";

export const useItemFormik = (
  fields: TFields<BillItemFormFieldName>,
  onSubmit: (item: BillItemsDTO) => void
) => {
  const validationSchema = object({
    itemId: string().required(),
    itemDescription: string().required(),
    itemAmount: number().required().min(0),
    itemQuantity: number().required().min(1),
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

  const { setFieldValue, getFieldProps, values, resetForm, handleBlur } =
    formik;

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

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

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    resetForm();
  };

  return {
    onBlurCallback,
    handleResetConfirmation,
    openResetConfirmation,
    getFieldProps,
    getErrorText,
    isValid,
    values,
  };
};
