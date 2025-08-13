import { Autocomplete } from "@mui/lab";
import {
  FormControl,
  FormHelperText,
  TextField as MuiTextField,
} from "@mui/material";
import DiscardButton from "components/accessories/discardButton/DiscardButton";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { ReactNode, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import checkIcon from "../../../../../assets/check-icon.png";
import warningIcon from "../../../../../assets/warning-icon.png";
import ConfirmationDialog from "../../../confirmationDialog/ConfirmationDialog";
import TextField from "../../../textField/TextField";

import { IState } from "../../../../../types";

import Button from "components/accessories/button/Button";
import CheckboxField from "components/accessories/checkboxField/CheckboxField";
import ResetButton from "components/accessories/resetButton/resetButton";
import { UserDTO } from "generated/models/UserDTO";
import { UserGroupDTO } from "generated/models/UserGroupDTO";
import { PATHS } from "../../../../../consts";
import { getUserGroups } from "../../../../../state/usergroups";
import { createUser, createUserReset } from "../../../../../state/users";
import "./styles.scss";
import { userSchema } from "./validation";

const initialValues = {
  userName: "",
  userGroupName: { code: "" },
  desc: "",
  passwd: "",
  passwd2: "",
};

export type FormProps = UserDTO & { passwd2: string };

export const NewUser = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const create = useAppSelector((state) => state.users.create);

  const userGroupsTypeState = useAppSelector(
    (state: IState) => state.usergroups.groupList
  );

  const formik = useFormik<FormProps>({
    initialValues,
    validationSchema: userSchema(t),
    onSubmit: (values: FormProps) => {
      const { passwd2, ...cleaned } = values;
      dispatch(createUser(cleaned));
    },
  });

  const {
    handleSubmit,
    handleBlur,
    setFieldValue,
    getFieldProps,
    setFieldTouched,
    isValid,
    dirty,
    errors,
    touched,
    values,
  } = formik;

  useEffect(() => {
    dispatch(getUserGroups());
  }, [dispatch]);

  useEffect(() => {
    if (create.hasSucceeded) navigate(PATHS.admin_users);
    return () => {
      dispatch(createUserReset());
    };
  }, [create.hasSucceeded, dispatch, navigate]);

  const handleCheckboxChange = useCallback(
    (fieldName: string) => (value: boolean) => {
      setFieldValue(fieldName, value);
    },
    [setFieldValue]
  );

  return (
    <div className="newUserForm">
      <div className="newUserForm__header">
        <div className="newUserForm__actions">
          <DiscardButton />
        </div>
      </div>
      <form className="newUserForm__form" onSubmit={handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="newUserForm__item fullWidth">
            <TextField
              field={getFieldProps("userName")}
              theme="regular"
              label={t("user.username")}
              isValid={!!touched.userName && !!errors.userName}
              errorText={(touched.userName && errors.userName) || ""}
              onBlur={handleBlur}
              type="text"
            />
          </div>
          <div className="newUserForm__item halfWidth">
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
          <div className="newUserForm__item halfWidth">
            <TextField
              field={getFieldProps("passwd2")}
              theme="regular"
              label={t("user.passwordRetype")}
              isValid={!!touched.passwd2 && !!errors.passwd2}
              errorText={(touched.passwd2 && errors.passwd2) || ""}
              onBlur={handleBlur}
              type="password"
              // this below prevents from saving the password on the computer
              InputProps={{ autoComplete: "one-time-code" }}
            />
          </div>
          <hr />
          <div className="newUserForm__item fullWidth">
            <FormControl variant="outlined" className="autocomplete">
              <Autocomplete
                id="userGroupName"
                options={
                  userGroupsTypeState.data?.filter((group) => !group.deleted) ??
                  []
                }
                value={values.userGroupName}
                disabled={userGroupsTypeState.isLoading || create.isLoading}
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
          <div className="newUserForm__item fullWidth">
            <TextField
              field={getFieldProps("desc")}
              theme="regular"
              label={t("user.description")}
              isValid={!!touched.desc && !!errors.desc}
              errorText={(touched.desc && errors.desc) || ""}
              onBlur={handleBlur}
              rows={3}
              multiline
            />
          </div>
          <div className="newUserForm__item fullWidth">
            <CheckboxField
              fieldName={"deleted"}
              checked={!!values.deleted}
              label={t("common.deleted")}
              onChange={handleCheckboxChange("deleted")}
            />
          </div>
        </div>
        <div className="newUserForm__buttonSet">
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
            <ResetButton formik={formik as any} />
          </div>
        </div>
        <ConfirmationDialog
          isOpen={create.hasSucceeded}
          title={t("user.createdSuccessTitle")}
          icon={checkIcon}
          info={t("user.createdSuccessMessage")}
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() => {
            navigate(PATHS.admin_users, { replace: true });
          }}
          handleSecondaryButtonClick={() => ({})}
        />
        <ConfirmationDialog
          isOpen={create.hasFailed}
          title={t("errors.internalerror")}
          icon={warningIcon}
          info={create.error?.message.toString()}
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() => {
            dispatch(createUserReset(), { replace: true });
          }}
          handleSecondaryButtonClick={() => ({})}
        />
      </form>
    </div>
  );
};
