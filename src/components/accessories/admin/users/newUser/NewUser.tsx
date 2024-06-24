import React, { useEffect, useMemo } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import TextField from "../../../textField/TextField";
import Button from "../../../button/Button";
import AutocompleteField from "../../../autocompleteField/AutocompleteField";

import { IState } from "../../../../../types";
import { ApiResponse } from "../../../../../state/types";
import { UserDTO, UserGroupDTO } from "../../../../../generated";

import { userSchema } from "./validation";
import "./styles.scss";
import { createUser } from "../../../../../state/users/actions";
import { getUserGroups } from "../../../../../state/usergroups/actions";

export const NewUser = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const create = useSelector<IState, ApiResponse<UserDTO>>(
    (state) => state.users.create
  );

  const userGroupsTypeState = useSelector(
    (state: IState) => state.usergroups.groupList
  );

  const userGroupsOptions = useMemo(
    () =>
      userGroupsTypeState.data?.map((item: UserGroupDTO) => ({
        value: item.code,
        label: item.desc ?? item.code,
      })) ?? [],
    [userGroupsTypeState.data]
  );

  const formik = useFormik({
    initialValues: {
      // TODO: use specific file
      userName: "",
      userGroupName: { code: "adm" },
      desc: "",
      passwd: "",
    },
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
      <form className="newUserForm__form" onSubmit={formik.handleSubmit}>
        <div className="row start-sm center-xs">
          <div className="newUserForm__item fullWidth">
            <AutocompleteField
              fieldName="type"
              fieldValue={formik.values.userGroupName.code}
              label={t("user.group")}
              /*isValid={isValid("type")}
              errorText={getErrorText("type")}
              onBlur={onBlurCallback("type")}*/
              isValid={true}
              errorText={"is this mandatory?"}
              onBlur={() => {}}
              options={userGroupsOptions}
              loading={userGroupsTypeState.isLoading}
              disabled={create.isLoading}
            />
          </div>
          <div className="newUserForm__item fullWidth">
            <TextField
              field={formik.getFieldProps("userName")}
              theme="regular"
              label={t("user.username")}
              isValid={!!formik.touched.userName && !!formik.errors.userName}
              errorText={formik.errors.userName ?? ""}
              onBlur={formik.handleBlur}
              type="text"
            />
          </div>
          <div className="newUserForm__item fullWidth">
            <TextField
              field={formik.getFieldProps("passwd")}
              theme="regular"
              label={t("user.password")}
              isValid={!!formik.touched.passwd && !!formik.errors.passwd}
              errorText={formik.errors.passwd ?? ""}
              onBlur={formik.handleBlur}
              type="password"
            />
          </div>
        </div>
        <div className="newUserForm__buttonSet">
          <div className="submit_button">
            <Button
              type="submit"
              variant="contained"
              disabled={!!create.isLoading || !formik.isValid || !formik.dirty}
            >
              {t("common.save")}
            </Button>
          </div>
          <div className="reset_button">
            <Button
              type="reset"
              variant="text"
              disabled={!!create.isLoading || !formik.dirty}
              onClick={() => {
                /*setOpenResetConfirmation(true)*/
              }}
            >
              {t("common.reset")}
            </Button>
          </div>
          {/* TODO: remove debug */}
        </div>
        <p>errors{JSON.stringify(formik.errors)}</p>
        <p>dirty {JSON.stringify(formik.dirty)}</p>
        <p>touched {JSON.stringify(formik.touched)}</p>
        <p>isLoading: {JSON.stringify(create.isLoading)}</p>
        <p>isValid: {JSON.stringify(formik.isValid)}</p>
      </form>
    </div>
  );
};
