import { useFormik } from "formik";
import { has, get } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
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
  itemType: string,
  items: BillItemsDTO[],
  onSubmit: (item: BillItemsDTO) => void
) => {
  const { t } = useTranslation();
  const validationSchema = useMemo(() => {
    return object({
      itemId: string()
        .required()
        .test({
          name: "item",
          message: t("bill.itemalreadypresent"),
          test: (value) => {
            const item = items.find((e) => e.itemId == value);
            return item == null;
          },
        }),
      itemDescription: string()
        .required()
        .test({
          name: "item",
          message: t("bill.itemalreadypresent"),
          test: (value) => {
            const item = items.find((e) => e.itemDescription == value);
            return item == null;
          },
        }),
      itemAmount: number().required().min(0),
      itemQuantity: number().min(1),
    });
  }, [itemType]);
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

  const {
    setFieldValue,
    getFieldProps,
    values,
    resetForm,
    handleBlur,
    handleSubmit,
    isValid: isFormValid,
  } = formik;

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
    handleSubmit,
    onBlurCallback,
    handleResetConfirmation,
    openResetConfirmation,
    getFieldProps,
    getErrorText,
    isFormValid,
    isValid,
    values,
  };
};
