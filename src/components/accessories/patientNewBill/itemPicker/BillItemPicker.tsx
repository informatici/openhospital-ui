import { Checkbox, FormControlLabel } from "@material-ui/core";
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

  return <></>;
};

export default BillItemPickerForm;
