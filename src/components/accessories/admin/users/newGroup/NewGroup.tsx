import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import TextField from "../../../textField/TextField";
import Button from "../../../button/Button";
import InfoBox from "../../../infoBox/InfoBox";
import ConfirmationDialog from "../../../confirmationDialog/ConfirmationDialog";
import checkIcon from "../../../../../assets/check-icon.png";

import { IState } from "../../../../../types";
import { ApiResponse } from "../../../../../state/types";
import { UserGroupDTO } from "../../../../../generated";
import { PATHS } from "../../../../../consts";

import { userGroupSchema } from "./validation";
import { TabOptions } from "../Users";
import "./styles.scss";
import {
  createUserGroup,
  createUserGroupReset,
} from "../../../../../state/usergroups/actions";

const initialValues = {
  code: "",
  desc: "",
};

export const NewGroup = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const create = useSelector<IState, ApiResponse<UserGroupDTO>>(
    (state) => state.usergroups.create
  );

  const {
    handleSubmit,
    handleBlur,
    getFieldProps,
    isValid,
    dirty,
    resetForm,
    errors,
    touched,
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
        </div>
        <div className="newGroupForm__item fullWidth">
          <p>You can edit a group's permission once you created it.</p>
          {create.hasFailed && (
            <div className="info-box-container">
              <InfoBox
                type="error"
                message={create.error?.message ?? t("common.somethingwrong")}
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
              type="reset"
              variant="text"
              disabled={!!create.isLoading || !dirty}
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
