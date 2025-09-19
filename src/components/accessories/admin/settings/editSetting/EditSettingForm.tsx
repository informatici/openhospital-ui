import Button from "components/accessories/button/Button";
import ConfirmationDialog from "components/accessories/confirmationDialog/ConfirmationDialog";
import InfoBox from "components/accessories/infoBox/InfoBox";
import SelectField from "components/accessories/selectField/SelectField";
import TextField from "components/accessories/textField/TextField";
import { useFormik } from "formik";
import { SettingDTO, SettingDTOTypeEnum } from "generated";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { updateSetting, updateSettingReset } from "state/settings";
import { object, string } from "yup";
import checkIcon from "../../../../../assets/check-icon.png";
import "./styles.scss";

type IOwnProps = {
  setting: SettingDTO;
  onSucceed: () => void;
  onCancel: () => void;
};

const EditSettingForm: FC<IOwnProps> = ({ setting, onSucceed, onCancel }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const updateSettingState = useAppSelector((state) => state.settings.update);

  const validationSchema = object().shape({
    value: string().when("$setting.type", {
      is: SettingDTOTypeEnum.Select,
      then: string()
        .required(t("form.requiredField"))
        .oneOf((setting.valueOptions ?? "").split(",")),
      otherwise: string().required(t("form.requiredField")),
    }),
  });

  const {
    handleSubmit,
    handleBlur,
    getFieldProps,
    setFieldValue,
    dirty,
    errors,
    touched,
    values,
  } = useFormik({
    initialValues: setting,
    validationSchema,
    onSubmit: (values: SettingDTO) => {
      dispatch(
        updateSetting({ code: setting.code, setting: { value: values.value! } })
      );
    },
  });

  useEffect(() => {
    return () => {
      dispatch(updateSettingReset());
    };
  }, [dispatch]);

  const valueOptions = (): { label: string; value: string }[] => {
    switch (setting.type) {
      case SettingDTOTypeEnum.Bool:
        return [
          { label: t("common.yes"), value: "TRUE" },
          { label: t("common.no"), value: "FALSE" },
        ];
      case SettingDTOTypeEnum.Select:
        return setting.valueOptions
          ? setting.valueOptions
              ?.split(",")
              .map((option) => ({ label: option, value: option }))
          : [];

      default:
        return [];
    }
  };

  return (
    <div className="editSettingForm">
      <form className="editSettingForm__form" onSubmit={handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="editSettingForm__item halfWidth">
            <TextField
              field={getFieldProps("code")}
              theme="regular"
              label={t("settings.code")}
              type="text"
              onBlur={() => {}}
              isValid={true}
              errorText=""
              disabled
            />
          </div>
          <div className="editSettingForm__item halfWidth">
            {setting.type === SettingDTOTypeEnum.Bool ||
            setting.type === SettingDTOTypeEnum.Select ? (
              <SelectField
                options={valueOptions()}
                fieldName="value"
                fieldValue={values.value ?? ""}
                label={t("settings.value")}
                isValid={!!touched.value && !!errors.value}
                errorText={(touched.value && errors.value) || ""}
                onBlur={handleBlur}
                onChange={(value) => setFieldValue("value", value)}
              />
            ) : (
              <TextField
                field={getFieldProps("value")}
                theme="regular"
                label={t("settings.value")}
                isValid={!!touched.value && !!errors.value}
                errorText={(touched.value && errors.value) || ""}
                onBlur={handleBlur}
                type={
                  setting.type === SettingDTOTypeEnum.Number ? "number" : "text"
                }
              />
            )}
          </div>
          <div className="editSettingForm__item fullWidth">
            <TextField
              field={getFieldProps("description")}
              theme="regular"
              label={t("settings.description")}
              rows={3}
              isValid={true}
              onBlur={() => {}}
              errorText=""
              disabled
              multiline
            />
          </div>
        </div>
        <div className="editSettingForm__item fullWidth">
          {updateSettingState.hasFailed && (
            <div className="info-box-container">
              <InfoBox
                type="error"
                message={
                  updateSettingState.error?.message ??
                  t("common.somethingwrong")
                }
              />
            </div>
          )}
        </div>
        <div className="editSettingForm__buttonSet">
          <div className="submit_button">
            <Button
              type="submit"
              variant="contained"
              disabled={!!updateSettingState.isLoading || !dirty}
            >
              {t("common.save")}
            </Button>
          </div>
          <div className="reset_button">
            <Button type="button" variant="text" onClick={onCancel}>
              {t("common.cancel")}
            </Button>
          </div>
        </div>
      </form>
      <ConfirmationDialog
        isOpen={updateSettingState.hasSucceeded}
        title={t("settings.updated")}
        icon={checkIcon}
        info={t("settings.successfullyUpdated")}
        primaryButtonLabel={t("common.ok")}
        handlePrimaryButtonClick={onSucceed}
        handleSecondaryButtonClick={() => ({})}
      />
    </div>
  );
};

export default EditSettingForm;
