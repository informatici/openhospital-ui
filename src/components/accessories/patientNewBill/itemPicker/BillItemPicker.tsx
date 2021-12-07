import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { useFormik } from "formik";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { number, object, string } from "yup";
import { BillItemsDTO } from "../../../../generated";
import { PriceDTO } from "../../../../generated/models/PriceDTO";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import SmallButton from "../../smallButton/SmallButton";
import TextButton from "../../textButton/TextButton";
import TextField from "../../textField/TextField";
import { ItemGroups } from "../consts";
import { useItems, useItemPrices } from "../hooks";
import { useItemFormik } from "./hooks";
import "./styles.scss";
import { BillItemProps } from "./types";

const BillItemPickerForm: FC<BillItemProps> = ({
  onSubmit,
  resetFormCallback,
  shouldResetForm,
  itemToEdit,
  items,
  fields,
}) => {
  const { t } = useTranslation();

  const [itemType, setItemType] = useState(ItemGroups.medical.id);

  const { prices, examsOptions, medicalsOptions, surgeriesOptions } =
    useItemPrices();

  useEffect(() => {
    if (itemToEdit) {
      setItemType(itemToEdit?.groupId);
    }
  }, [itemToEdit]);

  const handleFormSubmit = useCallback(
    (values: Record<string, any>) => {
      const id =
        itemToEdit == undefined
          ? (items.map((e) => e.id).sort()[items.length - 1] ?? 0) + 1
          : itemToEdit?.id;
      let item: BillItemsDTO = { id: id };
      item.itemQuantity = values?.itemQuantity;
      if (itemType == ItemGroups.other.id) {
        item.itemAmount = values?.itemAmount;
        item.itemDescription = values?.itemDescription;
        onSubmit(item, itemToEdit == undefined ? true : false);
        return;
      }
      let priceDTO: PriceDTO | undefined = prices.find(
        (e) => e?.item == values?.itemId
      );

      if (priceDTO) {
        item.itemAmount = priceDTO.price;
        item.itemDescription = priceDTO.description;
        item.itemId = priceDTO.item;
        item.price = true;
        item.priceId = priceDTO.id?.toString();
        onSubmit(item, itemToEdit == undefined ? true : false);
      }
    },
    [itemType]
  );

  const {
    getErrorText,
    getFieldProps,
    handleResetConfirmation,
    onBlurCallback,
    handleBlur,
    isValid,
    isFormValid,
    handleSubmit,
    values,
  } = useItemFormik(fields, itemType, items, itemToEdit, handleFormSubmit);

  const handleItemTypeChange = useCallback(
    (e: any, value: string) => {
      setItemType(value);
    },
    [itemType]
  );

  const options = useMemo(() => {
    return (
      (itemType == ItemGroups.medical.id && medicalsOptions) ||
      (itemType == ItemGroups.exam.id && examsOptions) ||
      (itemType == ItemGroups.surgery.id && surgeriesOptions) ||
      []
    );
  }, [itemType]);

  return (
    <form
      className="itemPicker"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <div id="first">
        <RadioGroup
          aria-label="gender"
          name="itemType"
          value={itemType}
          row
          onChange={handleItemTypeChange}
        >
          <FormControlLabel
            value={ItemGroups.medical.id}
            className={itemType == ItemGroups.medical.id ? "checked" : ""}
            control={<Radio />}
            label={t("bill.medical")}
            labelPlacement="top"
          />
          <FormControlLabel
            value={ItemGroups.exam.id}
            className={itemType == ItemGroups.exam.id ? "checked" : ""}
            control={<Radio />}
            label={t("bill.exam")}
            labelPlacement="top"
          />
          <FormControlLabel
            value={ItemGroups.surgery.id}
            className={itemType == ItemGroups.surgery.id ? "checked" : ""}
            control={<Radio />}
            label={t("bill.surgery")}
            labelPlacement="top"
          />
          <FormControlLabel
            value={ItemGroups.other.id}
            className={itemType == ItemGroups.other.id ? "checked" : ""}
            control={<Radio />}
            label={t("bill.other")}
            labelPlacement="top"
          />
        </RadioGroup>
      </div>
      <div id="second">
        {itemType != ItemGroups.other.id && (
          <AutocompleteField
            fieldName="itemId"
            fieldValue={values.itemId}
            label={t("bill.item")}
            isValid={isValid("itemId")}
            errorText={getErrorText("itemId")}
            onBlur={onBlurCallback("itemId")}
            options={options}
            isLoading={false}
          />
        )}
        {itemType == ItemGroups.other.id && (
          <>
            <TextField
              theme="regular"
              field={getFieldProps("itemDescription")}
              isValid={isValid("itemDescription")}
              errorText={getErrorText("itemDescription")}
              onBlur={handleBlur}
              label={t("bill.item")}
              type="text"
            />
            <TextField
              theme="regular"
              field={getFieldProps("itemAmount")}
              isValid={isValid("itemAmount")}
              errorText={getErrorText("itemAmount")}
              onBlur={handleBlur}
              label={t("bill.amount")}
              type="number"
            />
          </>
        )}
        <TextField
          theme="regular"
          field={getFieldProps("itemQuantity")}
          isValid={isValid("itemQuantity")}
          errorText={getErrorText("itemQuantity")}
          onBlur={handleBlur}
          label={t("bill.quantity")}
          type="number"
        />
      </div>
      <div id="third">
        <TextButton onClick={handleResetConfirmation}>
          {t("button.discard")}
        </TextButton>
        <SmallButton
          disabled={!isFormValid}
          onClick={(e) => {
            e.preventDefault();
            handleFormSubmit(formatAllFieldValues(fields, values));
          }}
        >
          {t("button.save")}
        </SmallButton>
      </div>
    </form>
  );
};

export default BillItemPickerForm;
