import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import checkIcon from "../../../../../assets/check-icon.png";
import warningIcon from "../../../../../assets/warning-icon.png";
import Button from "../../../button/Button";
import ConfirmationDialog from "../../../confirmationDialog/ConfirmationDialog";
import InfoBox from "../../../infoBox/InfoBox";
import TextField from "../../../textField/TextField";

import { PATHS } from "../../../../../consts";
import { usePermission } from "../../../../../libraries/permissionUtils/usePermission";

import { CircularProgress } from "@mui/material";
import CheckboxField from "components/accessories/checkboxField/CheckboxField";
import { PermissionDTO } from "generated/models/PermissionDTO";
import { UserGroupDTO } from "generated/models/UserGroupDTO";
import { getAllPermissions } from "../../../../../state/permissions";
import {
  getUserGroup,
  getUserGroupReset,
  updateUserGroup,
  updateUserGroupReset,
} from "../../../../../state/usergroups";
import { TabOptions } from "../Users";
import { GroupPermissionsEditor } from "../editPermissions/GroupPermissionsEditor";
import {
  PermissionActionEnum,
  PermissionActionType,
  comparePermissions,
} from "../editPermissions/permission.utils";
import "./styles.scss";
import { userGroupSchema } from "./validation";

export const EditGroup = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const canUpdatePermissions = usePermission("grouppermission.update");

  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const update = useAppSelector((state) => state.usergroups.update);
  const permissions = useAppSelector((state) => state.permissions.getAll);
  const group = useAppSelector((state) => state.usergroups.currentGroup);

  // local state to keep track of permissions
  const [groupPermissions, setGroupPermissions] = useState<PermissionDTO[]>([]);
  const [dirtyPermissions, setDirtyPermissions] = useState<boolean>(false);

  // make sure everything is loaded before displaying the editor
  const isPermissionEditorAvailable = useMemo(
    () => canUpdatePermissions && group.data && permissions.data,
    [canUpdatePermissions, group.data, permissions.data]
  );

  // compare permissions to update the update stack
  // and display permissions when ready
  const updatedPermissionsStack = useMemo(() => {
    if (canUpdatePermissions && group.data && permissions.data) {
      return comparePermissions(
        permissions.data,
        group.data?.permissions ?? [],
        groupPermissions
      );
    }
    return [];
  }, [canUpdatePermissions, group.data, permissions.data, groupPermissions]);

  const handleUpdatePermissions = ({
    permissions: perms,
    action,
  }: PermissionActionType) => {
    const otherPermissions = groupPermissions.filter(
      (p) => !perms.some((item) => item.id === p.id)
    );

    if (action === PermissionActionEnum.REVOKE) {
      setGroupPermissions(otherPermissions);
    }
    if (action === PermissionActionEnum.ASSIGN) {
      setGroupPermissions([...otherPermissions, ...perms]);
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
    values,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: group.data ?? { code: "" },
    validationSchema: userGroupSchema(t),
    onSubmit: (values: UserGroupDTO) => {
      const dto: UserGroupDTO = { ...values, permissions: groupPermissions };

      dispatch(updateUserGroup(dto));
    },
  });

  // load permissions and group on mount
  useEffect(() => {
    dispatch(getAllPermissions());
    dispatch(getUserGroup(id!!));
    return () => {
      dispatch(updateUserGroupReset());
    };
  }, [dispatch, id]);

  // update group permissions on group load
  useEffect(() => {
    if (group.data) {
      setGroupPermissions(group.data.permissions ?? []);
      setValues(group.data);
    }
  }, [group.data]);

  useEffect(() => {
    return () => {
      dispatch(getUserGroupReset());
    };
  }, []);

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
    <>
      {group.isLoading ||
      group.status === "IDLE" ||
      permissions.status === "IDLE" ||
      permissions.isLoading ? (
        <CircularProgress style={{ marginLeft: "50%", position: "relative" }} />
      ) : (
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
            <div className="newGroupForm__item fullWidth">
              <CheckboxField
                fieldName={"deleted"}
                checked={!!values.deleted}
                label={t("common.deleted")}
                onChange={handleCheckboxChange("deleted")}
              />
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
                        .flatMap((p) =>
                          p.permissions.map(
                            (item) =>
                              `${item.name}: ${
                                p.action === PermissionActionEnum.ASSIGN
                                  ? "assign"
                                  : "revoked"
                              }`
                          )
                        )
                        .join(",")}
                    </code>
                    <br />
                    {updatedPermissionsStack.length} permission
                    {updatedPermissionsStack.length > 1 ? "s" : ""} will be
                    updated.
                  </p>
                )}
              {update.hasFailed && (
                <div className="info-box-container">
                  <InfoBox
                    type="error"
                    message={t(
                      update.error?.message ?? "common.somethingwrong"
                    )}
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
                    !!update.isLoading ||
                    !isValid ||
                    !(dirty || dirtyPermissions)
                  }
                >
                  {t("common.save")}
                </Button>
              </div>
              <div className="reset_button">
                <Button
                  dataCy="cancel-form"
                  type="reset"
                  variant="text"
                  disabled={update.isLoading}
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
            isOpen={update.hasSucceeded}
            title={t("user.groupUpdated")}
            icon={checkIcon}
            info={t("user.groupUpdateSuccess")}
            primaryButtonLabel="Ok"
            handlePrimaryButtonClick={() => {
              navigate(PATHS.admin_users, {
                state: { tab: TabOptions.groups },
              });
            }}
            handleSecondaryButtonClick={() => ({})}
          />
        </div>
      )}
    </>
  );
};
