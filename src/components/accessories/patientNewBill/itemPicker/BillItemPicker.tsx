import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useFormik } from "formik";
import get from "lodash.get";
import has from "lodash.has";
import moment from "moment";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { object, string } from "yup";
import warningIcon from "../../../../assets/warning-icon.png";
import {
  formatAllFieldValues,
  getFromFields,
} from "../../../../libraries/formDataHandling/functions";
import { IState } from "../../../../types";
import AutocompleteField from "../../autocompleteField/AutocompleteField";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";
import DateField from "../../dateField/DateField";
import SmallButton from "../../smallButton/SmallButton";
import TextButton from "../../textButton/TextButton";
import TextField from "../../textField/TextField";
import "./styles.scss";
import { BillItemPickerProps } from "./types";

const BillItemPickerForm: FC<BillItemPickerProps> = ({}) => {
  const { t } = useTranslation();

  const [itemType, setItemType] = useState("medical");

  const handleItemTypeChange = useCallback(
    (e: any, value: string) => {
      setItemType(value);
    },
    [itemType]
  );

  const medicalOptionsSelector = (state: IState) => {
    if (state.medicals.medicalsOrderByName.data) {
      return state.medicals.medicalsOrderByName.data.map((medical) => {
        return {
          value: medical.code ?? "",
          label: medical.description ?? "",
        };
      });
    } else return [];
  };
  const medicalOptions = useSelector((state: IState) =>
    medicalOptionsSelector(state)
  );

  return (
    <div className="itemPicker">
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
        {true && (
          <AutocompleteField
            fieldName="itemId"
            fieldValue={"value"}
            label={t("bill.item")}
            isValid={false}
            errorText={""}
            onBlur={(e, v) => {}}
            options={[{ value: "item1", label: "Item 1" }]}
            isLoading={false}
          />
        )}
        {false && (
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
        )}
        {false && (
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
        <TextButton onClick={() => {}}>{t("button.discard")}</TextButton>
        <SmallButton>{t("button.save")}</SmallButton>
      </div>
    </div>
  );
};

export default BillItemPickerForm;
