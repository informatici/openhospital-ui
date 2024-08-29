import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import checkIcon from "../../../../../assets/check-icon.png";
import Button from "../../../button/Button";
import ConfirmationDialog from "../../../confirmationDialog/ConfirmationDialog";
import InfoBox from "../../../infoBox/InfoBox";
import TextField from "../../../textField/TextField";

import { PATHS } from "../../../../../consts";
import { PermissionDTO, UserGroupDTO } from "../../../../../generated";
import { usePermission } from "../../../../../libraries/permissionUtils/usePermission";

import {
  getAllPermissions,
  updatePermission,
  updatePermissionReset,
} from "../../../../../state/permissions";
import {
  updateUserGroup,
  updateUserGroupReset,
} from "../../../../../state/usergroups";
import { GroupPermissionsEditor } from "../editPermissions/GroupPermissionsEditor";
import { filterChangedGroupsPermissions } from "../editPermissions/permission.utils";
import { TabOptions } from "../Users";
import "./styles.scss";
import { userGroupSchema } from "./validation";

export const EditGroup = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state }: { state: UserGroupDTO } = useLocation();
  const { id } = useParams();
  const canUpdatePermissions = usePermission("grouppermission.update");

  const update = useAppSelector((state) => state.usergroups.update);
  const permissionsInitialState = useAppSelector(
    (state) => state.permissions.getAll
  );

  const [dirtyPermissions, setDirtyPermissions] = useState<boolean>(false);
  const [permissionsStack, setPermissionsStack] = useState<PermissionDTO[]>([]);

  const handleUpdatePermissions = (newPermission: PermissionDTO) => {
    const otherPermissions = permissionsStack.filter(
      ({ id }) => id !== newPermission.id
    );

    setPermissionsStack([
      ...otherPermissions,
      ...filterChangedGroupsPermissions(permissionsInitialState.data!, [
        newPermission,
      ]),
    ]);
  };

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
  } = useFormik({
    initialValues: state,
    validationSchema: userGroupSchema(t),
    onSubmit: (values: UserGroupDTO) => {
      dispatch(updateUserGroup(values));
      for (let index = 0; index < permissionsStack.length; index++) {
        dispatch(
          updatePermission({
            id: permissionsStack[index].id,
            permissionDTO: permissionsStack[index],
          })
        );
      }
    },
  });

  useEffect(() => {
    dispatch(getAllPermissions());
    return () => {
      dispatch(updateUserGroupReset());
      dispatch(updatePermissionReset());
    };
  }, [dispatch]);

  if (state?.code !== id) {
    return <Navigate to={PATHS.admin_users} state={{ tab: "groups" }} />;
  }

  if (permissionsInitialState.hasFailed)
    return (
      <InfoBox
        type="error"
        message={`Unable to load permissions ${permissionsInitialState.error?.toString()}`}
      />
    );
  if (!permissionsInitialState.hasSucceeded || !permissionsInitialState.data)
    return <>...</>;
  if (!permissionsInitialState.data.length)
    return <>no permissions in database</>;

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
              disabled
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

        {canUpdatePermissions && (
          <GroupPermissionsEditor
            permissions={permissionsInitialState.data ?? []}
            thisGroupId={values.code as string}
            setDirty={setDirtyPermissions}
            update={handleUpdatePermissions}
          />
        )}

        <div className="newGroupForm__item fullWidth">
          {permissionsStack.length > 0 && (
            <p>
              <code>
                Editing permissions:{" "}
                {permissionsStack.map(({ id }) => id).join(",")}
              </code>
              <br />
              {permissionsStack.length} permissions will be updated.
            </p>
          )}
          {update.hasFailed && (
            <div className="info-box-container">
              <InfoBox
                type="error"
                message={update.error?.message ?? t("common.somethingwrong")}
              />
            </div>
          )}
        </div>

        <div className="newGroupForm__buttonSet">
          <div className="submit_button">
            <Button
              type="submit"
              variant="contained"
              disabled={
                !!update.isLoading || !isValid || !(dirty || dirtyPermissions)
              }
            >
              {t("common.save")}
            </Button>
          </div>
          <div className="reset_button">
            <Button
              type="reset"
              variant="text"
              disabled={!!update.isLoading || !(dirty || dirtyPermissions)}
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
        isOpen={update.hasSucceeded}
        title={t("user.groupUpdated")}
        icon={checkIcon}
        info={t("user.groupUpdateSuccess")}
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => {
          navigate(PATHS.admin_users, { state: { tab: TabOptions.groups } });
        }}
        handleSecondaryButtonClick={() => ({})}
      />
    </div>
  );
};
