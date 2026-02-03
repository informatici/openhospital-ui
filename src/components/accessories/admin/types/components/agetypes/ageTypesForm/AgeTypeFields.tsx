import TextField from "components/accessories/textField/TextField";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { IAgeTypeFieldsProps } from "./types";

const AgeTypeFields: FC<IAgeTypeFieldsProps> = ({
  formik,
  getErrorText,
  isValid,
  index,
}) => {
  const { t } = useTranslation();

  return (
    <tr className="ageTypeFormRow">
      <td>{formik.values.ageTypes[index].code}</td>
      <td className="fromField">
        <TextField
          field={formik.getFieldProps(`ageTypes[${index}].from`)}
          theme="regular"
          label={t("ageTypes.from")}
          isValid={isValid("from", index)}
          errorText={getErrorText("from", index)}
          onBlur={formik.handleBlur}
          type="number"
        />
      </td>
      <td className="toField">
        <TextField
          field={formik.getFieldProps(`ageTypes[${index}].to`)}
          theme="regular"
          label={t("ageTypes.to")}
          isValid={isValid("to", index)}
          errorText={getErrorText("to", index)}
          onBlur={formik.handleBlur}
          type="number"
        />
      </td>
      <td>{t(formik.values.ageTypes[index].description)}</td>
    </tr>
  );
};

export default AgeTypeFields;
