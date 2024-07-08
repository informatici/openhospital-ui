import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Autocomplete } from "@material-ui/lab";
import {
  TextField as MuiTextField,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import TextField from "../../../textField/TextField";
import Button from "../../../button/Button";

import { IState } from "../../../../../types";
import { ApiResponse } from "../../../../../state/types";
import { UserDTO, UserGroupDTO } from "../../../../../generated";

import { userSchema } from "./validation";
import "./styles.scss";
import { createUser } from "../../../../../state/users/actions";
import { getUserGroups } from "../../../../../state/usergroups/actions";

const initialValues = {
  userName: "",
  userGroupName: { code: "" },
  desc: "",
  passwd: "",
};

export const NewUser = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
    resetForm,
    errors,
    touched,
    values,
  } = useFormik({
    initialValues,
    validationSchema: userSchema,
    onSubmit: (values: UserDTO) => {
      dispatch(createUser(values));
      alert("plop" + JSON.stringify(values));
    },
  });

  useEffect(() => {
    dispatch(getUserGroups());
  }, [dispatch]);

  return (
    <div className="newUserForm">
      <form className="newUserForm__form" onSubmit={handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="newUserForm__item fullWidth">
            <FormControl variant="outlined" className="autocomplete">
              <Autocomplete
                id="userGroupName"
                options={userGroupsTypeState.data ?? []}
                value={values.userGroupName}
                disabled={userGroupsTypeState.isLoading || create.isLoading}
                onBlur={() => setFieldTouched("userGroupName")}
                onChange={(_ev: any, value: UserGroupDTO | null) => {
                  console.log("onblur value", value);
                  setFieldValue("userGroupName", value);
                }}
                renderInput={(params) => (
                  <MuiTextField
                    {...params}
                    name="userGroupName"
                    variant="outlined"
                    size="small"
                    error={!!errors.userGroupName}
                    fullWidth
                    label={t("user.group")}
                  />
                )}
                getOptionLabel={(option: UserGroupDTO) =>
                  option.desc ?? option.code ?? "no option code"
                }
              />
              {touched.userGroupName && errors.userGroupName && (
                <FormHelperText error>
                  {errors.userGroupName?.code || errors.userGroupName}
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div className="newUserForm__item fullWidth">
            <TextField
              field={getFieldProps("userName")}
              theme="regular"
              label={t("user.username")}
              isValid={!!touched.userName && !!errors.userName}
              errorText={errors.userName ?? ""}
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
              errorText={errors.passwd ?? ""}
              onBlur={handleBlur}
              type="password"
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
              onClick={async () => {
                resetForm()
              }}
            >
              {t("common.reset")}
            </Button>
          </div>
        </div>
        {/* TODO: remove debug */}
        <p>errors{JSON.stringify(errors)}</p>
        <p>dirty {JSON.stringify(dirty)}</p>
        <p>touched {JSON.stringify(touched)}</p>
        <p>isLoading: {JSON.stringify(create.isLoading)}</p>
        <p>isValid: {JSON.stringify(isValid)}</p>
        <p>values: {JSON.stringify(values)}</p>
      </form>
    </div>
  );
};
