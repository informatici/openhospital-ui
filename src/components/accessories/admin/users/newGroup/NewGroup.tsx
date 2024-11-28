import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import checkIcon from "../../../../../assets/check-icon.png";
import warningIcon from "../../../../../assets/warning-icon.png";
import Button from "../../../button/Button";
import ConfirmationDialog from "../../../confirmationDialog/ConfirmationDialog";
import InfoBox from "../../../infoBox/InfoBox";
import TextField from "../../../textField/TextField";

import { PATHS } from "../../../../../consts";
import { UserGroupDTO } from "../../../../../generated";

import CheckboxField from "components/accessories/checkboxField/CheckboxField";
import {
  createUserGroup,
  createUserGroupReset,
} from "../../../../../state/usergroups";
import { TabOptions } from "../Users";
import "./styles.scss";
import { userGroupSchema } from "./validation";

const initialValues = {
  code: "",
  desc: "",
};

export const NewGroup = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const create = useAppSelector((state) => state.usergroups.create);

  const {
    handleSubmit,
    handleBlur,
    getFieldProps,
    isValid,
    dirty,
    errors,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: userGroupSchema(t),
    onSubmit: (values: UserGroupDTO) => {
      dispatch(createUserGroup(values));
    },
  });

  useEffect(() => {
    return () => {
      dispatch(createUserGroupReset());
    };
  }, [dispatch]);

  const handleResetConfirmation = () => {
    setOpenResetConfirmation(false);
    navigate(-1);
  };

  const handleCheckboxChange = useCallback(
    (fieldName: string) => (value: boolean) => {
      setFieldValue(fieldName, value);
    },
    [setFieldValue]
  );

  return (
    <div className="newGroupForm">
      <form className="newGroupForm__form" onSubmit={handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="newGroupForm__item fullWidth">
            <TextField
              field={getFieldProps("code")}
              theme="regular"
              label={t("user.code")}
              isValid={!!touched.code && !!errors.code}
              errorText={(touched.code && errors.code) || ""}
              onBlur={handleBlur}
              type="text"
            />
          </div>
          <div className="newGroupForm__item fullWidth">
            <TextField
              field={getFieldProps("desc")}
              theme="regular"
              label={t("user.desc")}
              isValid={!!touched.desc && !!errors.desc}
              errorText={(touched.desc && errors.desc) || ""}
              onBlur={handleBlur}
            />
          </div>
          <div className="newGroupForm__item fullWidth">
            <CheckboxField
              fieldName={"deleted"}
              checked={!!values.deleted}
              label={t("common.deleted")}
              onChange={handleCheckboxChange("deleted")}
            />
          </div>
        </div>
        <div className="newGroupForm__item fullWidth">
          <p>{t("user.groupPermissionsOnlyOnUpdate")}</p>
          {create.hasFailed && (
            <div className="info-box-container">
              <InfoBox
                type="error"
                message={t(create.error?.message ?? "common.somethingwrong")}
              />
            </div>
          )}
        </div>
        <div className="newGroupForm__buttonSet">
          <div className="submit_button">
            <Button
              type="submit"
              variant="contained"
              disabled={!!create.isLoading || !isValid || !dirty}
            >
              {t("common.save")}
            </Button>
          </div>
          <div className="reset_button">
            <Button
              dataCy="cancel-form"
              type="reset"
              variant="text"
              disabled={create.isLoading}
              onClick={() => setOpenResetConfirmation(true)}
            >
              {t("common.cancel")}
            </Button>
          </div>
        </div>
      </form>
      <ConfirmationDialog
        isOpen={openResetConfirmation}
        title={t("common.cancel")}
        info={t("common.resetform")}
        icon={warningIcon}
        primaryButtonLabel={t("common.ok")}
        secondaryButtonLabel={t("common.discard")}
        handlePrimaryButtonClick={handleResetConfirmation}
        handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
      />
      <ConfirmationDialog
        isOpen={create.hasSucceeded}
        title={t("user.groupCreated")}
        icon={checkIcon}
        info={t("user.groupCreateSuccess")}
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => {
          navigate(PATHS.admin_users, { state: { tab: TabOptions.groups } });
        }}
        handleSecondaryButtonClick={() => ({})}
      />
    </div>
  );
};
