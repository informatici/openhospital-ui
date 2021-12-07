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
import { ItemGroups } from "../consts";
import { useItems } from "../hooks";
import { BillItemFormFieldName } from "./types";

export const useItemFormik = (
  fields: TFields<BillItemFormFieldName>,
  itemType: string,
  items: BillItemsDTO[],
  itemToEdit: Record<string, any> | undefined,
  onSubmit: (item: BillItemsDTO) => void
) => {
  const { t } = useTranslation();

  const validationSchema = useMemo(() => {
    if (itemType == ItemGroups.other.id) {
      return object({
        itemAmount: number()
          .required(t("common.required"))
          .min(0, t("common.greaterthan", { value: "0" })),
        itemQuantity: number().min(1, t("common.greaterthan", { value: "1" })),
        itemDescription: string()
          .test({
            name: "item",
            message: t("bill.itemalreadypresent"),
            test: (value) => {
              const item = items.find(
                (e) =>
                  e.itemDescription?.toLocaleLowerCase() ==
                  value?.toLocaleLowerCase()
              );
              return item == null || itemToEdit != undefined;
            },
          })
          .required(t("common.required")),
      });
    }
    return object({
      itemId: string()
        .test({
          name: "item",
          message: t("bill.itemalreadypresent"),
          test: (value) => {
            const item = items.find((e) => e.itemId == value);
            return item == null || itemToEdit != undefined;
          },
        })
        .required(t("common.required")),
      itemQuantity: number()
        .test({
          name: "quantity",
          message: t("common.lessthan", { value: "1" }),
          test: (value) => {
            if (itemType == ItemGroups.medical.id) return true;
            return value > 1 ? false : true;
          },
        })
        .min(1, t("common.greaterthan", { value: "1" })),
    });
  }, [itemType]);
  const initialValues = useMemo(() => {
    if (itemToEdit != undefined) {
      return getFromFields(
        {
          itemAmount: {
            type: "number",
            value: (itemToEdit?.amount ?? 0).toString(),
          },
          itemQuantity: {
            type: "number",
            value: (itemToEdit?.quantity ?? 1).toString(),
          },
          itemId: {
            type: "text",
            value: itemToEdit?.itemId ?? "",
          },
          itemDescription: {
            type: "text",
            value: itemToEdit?.description,
          },
        },
        "value"
      );
    }
    return getFromFields(fields, "value");
  }, [itemToEdit]);

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

  const isValid = (fieldName: string): boolean => {
    return has(formik.touched, fieldName) && has(formik.errors, fieldName);
  };

  const getErrorText = (fieldName: string): string => {
    return has(formik.touched, fieldName)
      ? (get(formik.errors, fieldName) as string)
      : "";
  };

  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    resetForm();
  };

  return {
    handleSubmit,
    handleBlur,
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
