import React, { ReactNode, useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Autocomplete } from "@mui/lab";
import {
  TextField as MuiTextField,
  FormControl,
  FormHelperText,
} from "@mui/material";
import TextField from "../../../textField/TextField";
import Button from "../../../button/Button";
import ConfirmationDialog from "../../../confirmationDialog/ConfirmationDialog";
import checkIcon from "../../../../../assets/check-icon.png";
import warningIcon from "../../../../../assets/warning-icon.png";

import { IState } from "../../../../../types";
import { ApiResponse } from "../../../../../state/types";
import { UserDTO, UserGroupDTO } from "../../../../../generated";

import { userSchema } from "./validation";
import "./styles.scss";
import { createUser, createUserReset } from "../../../../../state/users";
import { getUserGroups } from "../../../../../state/usergroups";
import { PATHS } from "../../../../../consts";

const initialValues = {
  userName: "",
  userGroupName: { code: "" },
  desc: "",
  passwd: "",
  passwd2: "",
};

export type FormProps = UserDTO & { passwd2: string };

export const NewUser = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const create = useSelector<IState, ApiResponse<UserDTO>>(
    (state) => state.users.create
  );

  const userGroupsTypeState = useSelector(
    (state: IState) => state.usergroups.groupList
  );

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
  } = useFormik<FormProps>({
    initialValues,
    validationSchema: userSchema(t),
    onSubmit: (values: FormProps) => {
      const { passwd2, ...cleaned } = values;
      dispatch(createUser(cleaned));
    },
  });

  useEffect(() => {
    dispatch(getUserGroups());
    return () => {
      dispatch(createUserReset());
    };
  }, [dispatch]);

  return (
    <div className="newUserForm">
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
          <div className="newUserForm__item fullWidth">
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
          <div className="newUserForm__item fullWidth">
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
                options={userGroupsTypeState.data ?? []}
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
            <Button
              type="reset"
              variant="text"
              disabled={!!create.isLoading || !dirty}
              onClick={() => {
                navigate(PATHS.admin_users);
              }}
            >
              {t("common.cancel")}
            </Button>
          </div>
        </div>
        <ConfirmationDialog
          isOpen={create.hasSucceeded}
          title={t("user.createdSuccessTitle")}
          icon={checkIcon}
          info={t("user.createdSuccessMessage")}
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() => {
            navigate(PATHS.admin_users);
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
            dispatch(createUserReset());
          }}
          handleSecondaryButtonClick={() => ({})}
        />
      </form>
    </div>
  );
};
