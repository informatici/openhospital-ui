import { Autocomplete } from "@mui/lab";
import {
  FormControl,
  FormHelperText,
  TextField as MuiTextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { UserDTO, UserGroupDTO } from "../../../../../generated";

import checkIcon from "../../../../../assets/check-icon.png";
import Button from "../../../button/Button";
import ConfirmationDialog from "../../../confirmationDialog/ConfirmationDialog";
import InfoBox from "../../../infoBox/InfoBox";
import TextField from "../../../textField/TextField";

import { PATHS } from "../../../../../consts";
import "./styles.scss";
import { userSchema } from "./validation";

interface IProps {
  initialValues: UserDTO;
  isLoading: boolean;
  hasSucceeded: boolean;
  hasFailed: boolean;
  error: any;
  groups: UserGroupDTO[];
  onSubmit: (userValue: UserDTO) => void;
}

export const EditUserForm = ({
  initialValues,
  isLoading,
  hasSucceeded,
  hasFailed,
  error,
  onSubmit,
  groups,
}: IProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    handleBlur,
    getFieldProps,
    isValid,
    dirty,
    resetForm,
    errors,
    touched,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<UserDTO>({
    initialValues,
    validationSchema: userSchema(t),
    onSubmit,
  });

  return (
    <div className="editUserForm">
      <form className="editUserForm__form" onSubmit={handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="editUserForm__item fullWidth">
            <FormControl variant="outlined" className="autocomplete">
              <Autocomplete
                id="userGroupName"
                options={groups}
                value={values.userGroupName}
                onBlur={() => setFieldTouched("userGroupName")}
                onChange={(_ev: any, value: UserGroupDTO | null) => {
                  setFieldValue("userGroupName", value);
                }}
                renderInput={(params) => (
                  <MuiTextField
                    {...params}
                    name="userGroupName"
                    variant="outlined"
                    size="small"
                    error={!!(touched.userGroupName && errors.userGroupName)}
                    fullWidth
                    label={t("user.group")}
                  />
                )}
                getOptionLabel={(option: UserGroupDTO) =>
                  option.code.toString() +
                  (option.desc ? ` - ${option.desc}` : "")
                }
                isOptionEqualToValue={(option, value) => option.code === value.code}
              />
              {touched.userGroupName && errors.userGroupName && (
                <FormHelperText error>
                  {
                    (errors.userGroupName?.code ||
                      errors.userGroupName) as ReactNode
                  }
                </FormHelperText>
              )}
            </FormControl>
          </div>

          <div className="editUserForm__item fullWidth">
            <TextField
              field={getFieldProps("passwd")}
              theme="regular"
              label={t("user.password")}
              isValid={!!touched.passwd && !!errors.passwd}
              errorText={(touched.passwd && errors.passwd) || ""}
              onBlur={handleBlur}
              type="password"
              // this below prevents from saving the password on the computer
              InputProps={{ autoComplete: "one-time-code" }}
            />
          </div>
          <div className="editUserForm__item fullWidth">
            <TextField
              field={getFieldProps("desc")}
              theme="regular"
              label={t("user.description")}
              isValid={!!touched.desc && !!errors.desc}
              errorText={(touched.desc && errors.desc) || ""}
              onBlur={handleBlur}
            />
          </div>
        </div>

        <div className="editUserForm__item fullWidth">
          {hasFailed && (
            <div className="info-box-container">
              <InfoBox
                type="error"
                message={error?.message ?? t("common.somethingwrong")}
              />
            </div>
          )}
        </div>
        <div className="editUserForm__buttonSet">
          <div className="submit_button">
            <Button
              type="submit"
              variant="contained"
              disabled={!!isLoading || !isValid || !dirty}
            >
              {t("common.save")}
            </Button>
          </div>
          <div className="reset_button">
            <Button
              type="reset"
              variant="text"
              disabled={!!isLoading || !dirty}
              onClick={async () => {
                resetForm();
              }}
            >
              {t("common.reset")}
            </Button>
          </div>
        </div>
      </form>
      <ConfirmationDialog
        isOpen={hasSucceeded}
        title={t("user.updatedSuccessTitle")}
        icon={checkIcon}
        info={t("user.updatedSuccessMessage")}
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => {
          navigate(PATHS.admin_users);
        }}
        handleSecondaryButtonClick={() => ({})}
      />
    </div>
  );
};
