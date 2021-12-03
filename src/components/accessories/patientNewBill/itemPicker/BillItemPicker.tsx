import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { useFormik } from "formik";
import React, { FC, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { number, object, string } from "yup";
import { BillItemsDTO } from "../../../../generated";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import SmallButton from "../../smallButton/SmallButton";
import TextButton from "../../textButton/TextButton";
import TextField from "../../textField/TextField";
import { useItems, useItemPrices } from "../hooks";
import { useItemFormik } from "./hooks";
import "./styles.scss";
import { BillItemProps } from "./types";

const BillItemPickerForm: FC<BillItemProps> = ({
  onSubmit,
  resetFormCallback,
  shouldResetForm,
  fields,
}) => {
  const { t } = useTranslation();

  const [itemType, setItemType] = useState("medical");
  const [creationMode, setCreationMode] = useState(false);

  const { dispatch, medicals, exams, surgeries } = useItems();

  const { examsOptions, medicalsOptions, surgeriesOptions } = useItemPrices();
  const {
    getErrorText,
    getFieldProps,
    handleResetConfirmation,
    isValid,
    onBlurCallback,
    values,
  } = useItemFormik(fields, onSubmit);

  const handleItemTypeChange = useCallback(
    (e: any, value: string) => {
      setItemType(value);
    },
    [itemType]
  );

  const handleSubmit = (values: Record<string, any>) => {
    let item: BillItemsDTO = {
      itemId: values?.itemId,
      itemQuantity: values?.itemQuantity,
    };
    if (itemType == "other") {
      item.itemId = "0";
    }
  };

  const options = useMemo(() => {
    return (
      (itemType == "medical" && medicalsOptions) ||
      (itemType == "exam" && examsOptions) ||
      (itemType == "surgery" && surgeriesOptions) ||
      []
    );
  }, [itemType]);

  return (
    <form className="itemPicker">
      <div id="first">
        <RadioGroup
          aria-label="gender"
          name="itemType"
          value={itemType}
          row
          onChange={handleItemTypeChange}
        >
          <FormControlLabel
            value="medical"
            className={itemType == "medical" ? "checked" : ""}
            control={<Radio />}
            label="Medical"
            labelPlacement="top"
          />
          <FormControlLabel
            value="exam"
            className={itemType == "exam" ? "checked" : ""}
            control={<Radio />}
            label="Exam"
            labelPlacement="top"
          />
          <FormControlLabel
            value="surgery"
            className={itemType == "surgery" ? "checked" : ""}
            control={<Radio />}
            label="Surgery"
            labelPlacement="top"
          />
          <FormControlLabel
            value="other"
            className={itemType == "other" ? "checked" : ""}
            control={<Radio />}
            label="Other"
            labelPlacement="top"
          />
        </RadioGroup>
      </div>
      <div id="second">
        {itemType != "other" && (
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
        {itemType == "other" && (
          <>
            <TextField
              theme="regular"
              field={{
                name: "item",
                value: "",
                onBlur: (e: any) => {},
                onChange: (e: any) => {},
              }}
              label={t("bill.item")}
              isValid={false}
              errorText={""}
              onBlur={(e) => {}}
              type="text"
            />
            <TextField
              theme="regular"
              field={{
                name: "amount",
                value: 1,
                onBlur: (e: any) => {},
                onChange: (e: any) => {},
              }}
              label={t("bill.amount")}
              isValid={false}
              errorText={""}
              onBlur={(e) => {}}
              type="number"
            />
          </>
        )}
        <TextField
          theme="regular"
          field={{
            name: "quantity",
            value: 1,
            onBlur: (e: any) => {},
            onChange: (e: any) => {},
          }}
          label={t("bill.quantity")}
          isValid={false}
          errorText={""}
          onBlur={(e) => {}}
          type="number"
        />
      </div>
      <div id="third">
        <TextButton onClick={handleResetConfirmation}>
          {t("button.discard")}
        </TextButton>
        <SmallButton type="submit">{t("button.save")}</SmallButton>
      </div>
    </form>
  );
};

export default BillItemPickerForm;
