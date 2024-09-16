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

import { getAllPermissions } from "../../../../../state/permissions";
import {
  assignPermission,
  revokePermission,
} from "../../../../../state/usergroups";
import {
  updateUserGroup,
  updateUserGroupReset,
  getUserGroup,
} from "../../../../../state/usergroups";
import { GroupPermissionsEditor } from "../editPermissions/GroupPermissionsEditor";
import {
  PermissionActionEnum,
  PermissionActionType,
  comparePermissions,
} from "../editPermissions/permission.utils";
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
  const permissions = useAppSelector((state) => state.permissions.getAll);
  const group = useAppSelector((state) => state.usergroups.currentGroup);
  // local state to keep track of permissions
  const [groupPermissions, setGroupPermissions] = useState<PermissionDTO[]>([]);
  const [dirtyPermissions, setDirtyPermissions] = useState<boolean>(false);
  // make sure everything is loaded before displaying the editor
  const [isPermissionEditorAvailable, setIsPermissionEditorAvailable] =
    useState<boolean>(false);
  // keep track of which permissions have been updated and how
  const [updatedPermissionsStack, setUpdatedPermissionsStack] = useState<
    Array<PermissionActionType>
  >([]);

  const handleUpdatePermissions = ({
    permission,
    action,
  }: PermissionActionType) => {
    const otherPermissions = groupPermissions.filter(
      (p) => p.id !== permission.id
    );

    if (action === PermissionActionEnum.REVOKE) {
      setGroupPermissions(otherPermissions);
    }
    if (action === PermissionActionEnum.ASSIGN) {
      setGroupPermissions([...otherPermissions, permission]);
    }
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
  } = useFormik({
    initialValues: state,
    validationSchema: userGroupSchema(t),
    onSubmit: (values: UserGroupDTO) => {
      dispatch(updateUserGroup(values));

      // this is applying to all permissions, but we may want to only apply to the ones that have changed
      // using the updatedPermissionsStack array
      // this is open to debate
      for (const permission of permissions.data!) {
        const isAllowed = groupPermissions.some(
          (gp) => gp.id === permission.id
        );
        if (isAllowed) {
          dispatch(
            assignPermission({
              permissionId: permission.id,
              groupCode: state.code,
            })
          );
        } else {
          dispatch(
            revokePermission({
              permissionId: permission.id,
              groupCode: state.code,
            })
          );
        }
      }
    },
  });

  // load permissions and group on mount
  useEffect(() => {
    dispatch(getAllPermissions());
    dispatch(getUserGroup(state.code));
    return () => {
      dispatch(updateUserGroupReset());
    };
  }, [dispatch, state.code]);

  // update group permissions on group load
  useEffect(() => {
    if (group.data) {
      setGroupPermissions(group.data.permissions ?? []);
    }
  }, [group.data]);

  // compare permissions to update the update stack
  // and display permissions when ready
  useEffect(() => {
    if (canUpdatePermissions && group.data && permissions.data) {
      setIsPermissionEditorAvailable(true);

      const newPermissionStack = comparePermissions(
        permissions.data,
        group.data?.permissions ?? [],
        groupPermissions
      );

      setUpdatedPermissionsStack(newPermissionStack);
    }
  }, [canUpdatePermissions, group.data, permissions.data, groupPermissions]);

  if (state?.code !== id) {
    return <Navigate to={PATHS.admin_users} state={{ tab: "groups" }} />;
  }

  if (permissions.hasFailed)
    return (
      <InfoBox
        type="error"
        message={`Unable to load permissions ${permissions.error?.toString()}`}
      />
    );
  if (group.hasFailed)
    return (
      <InfoBox
        type="error"
        message={`Unable to load permissions ${permissions.error?.toString()}`}
      />
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

        {isPermissionEditorAvailable && (
          <GroupPermissionsEditor
            permissions={permissions.data ?? []}
            groupPermissions={groupPermissions}
            setDirty={setDirtyPermissions}
            update={handleUpdatePermissions}
          />
        )}

        <div className="newGroupForm__item fullWidth">
          {isPermissionEditorAvailable &&
            updatedPermissionsStack.length > 0 && (
              <p>
                <code>
                  Editing permissions:{" "}
                  {updatedPermissionsStack
                    .map(
                      (p) =>
                        `${p.permission.name}: ${
                          p.action ? "allowed" : "revoked"
                        }`
                    )
                    .join(",")}
                </code>
                <br />
                {updatedPermissionsStack.length} permission
                {updatedPermissionsStack.length > 1 ? "s" : ""} will be updated.
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
