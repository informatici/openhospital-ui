import React, { ChangeEvent, useCallback, useMemo } from "react";

import { Checkbox, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PermissionDTO } from "../../../../../generated";
import { AclPermissionCheckbox } from "./AclPermissionCheckbox";
import classes from "./AclTable.module.scss";
import {
  Crud,
  PermissionActionEnum,
  permissionsToCrud,
} from "./permission.utils";

interface IProps {
  permissions: PermissionDTO[];
  groupPermissions: PermissionDTO[];
  onChange: (
    permissions: PermissionDTO[],
    action: PermissionActionEnum
  ) => void;
}

export const AclTable = ({
  permissions,
  groupPermissions,
  onChange,
}: IProps) => {
  const crudPermissions = useMemo(() => {
    return permissionsToCrud(permissions);
  }, [permissions]);

  const { t } = useTranslation();

  const crudKeys = Array.from(crudPermissions.keys());

  const allColumnsChecked = useCallback(
    (crudKey: string) => {
      return (
        [Crud.CREATE, Crud.READ, Crud.UPDATE, Crud.DELETE].filter((item) =>
          groupPermissions.some((p) => p.name === `${crudKey}.${item}`)
        ).length ===
        [Crud.CREATE, Crud.READ, Crud.UPDATE, Crud.DELETE].filter((item) =>
          permissions.some((p) => p.name === `${crudKey}.${item}`)
        ).length
      );
    },
    [groupPermissions, permissions]
  );

  const allRowsChecked = useCallback(() => {
    return (
      crudKeys.filter((crudKey) => allColumnsChecked(crudKey)).length ===
      crudKeys.length
    );
  }, [groupPermissions, permissions, allColumnsChecked]);

  const toggleCheckAllColumns = useCallback(
    (crudKey: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const crudPermNames = [
        Crud.CREATE,
        Crud.READ,
        Crud.UPDATE,
        Crud.DELETE,
      ].map((item) => `${crudKey}.${item}`);
      const crudPerms = permissions.filter((p) =>
        crudPermNames.includes(p.name!)
      );
      if (event.target.checked) {
        onChange(
          crudPerms.filter(
            (item) => !groupPermissions.some((p) => p.id === item.id)
          ),
          PermissionActionEnum.ASSIGN
        );
      } else {
        onChange(crudPerms, PermissionActionEnum.REVOKE);
      }
    },
    [groupPermissions, permissions, onChange]
  );

  const toggleCheckAllRows = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const crudPermNames = [
        Crud.CREATE,
        Crud.READ,
        Crud.UPDATE,
        Crud.DELETE,
      ].flatMap((item) => crudKeys.map((crudKey) => `${crudKey}.${item}`));
      const crudPerms = permissions.filter((p) =>
        crudPermNames.includes(p.name!)
      );
      if (event.target.checked) {
        onChange(
          crudPerms.filter(
            (item) => !groupPermissions.some((p) => p.id === item.id)
          ),
          PermissionActionEnum.ASSIGN
        );
      } else {
        onChange(crudPerms, PermissionActionEnum.REVOKE);
      }
    },
    [groupPermissions, permissions]
  );

  return (
    <div className={classes.container}>
      <table className={classes.acl}>
        <thead>
          <tr>
            <th>
              <Tooltip title={t("permission.toggle-check-all")}>
                <Checkbox
                  checked={allRowsChecked()}
                  onChange={toggleCheckAllRows}
                  name={"permission.all"}
                />
              </Tooltip>
            </th>
            <th>{t("permission.name")}</th>
            <th>{t("permission.create")}</th>
            <th>{t("permission.read")}</th>
            <th>{t("permission.update")}</th>
            <th>{t("permission.delete")}</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(crudPermissions.values()).map((crudPermission, index) => {
            return (
              <tr key={index}>
                <td>
                  <Tooltip title={t("permission.toggle-check-all")}>
                    <Checkbox
                      checked={allColumnsChecked(crudKeys[index])}
                      onChange={toggleCheckAllColumns(crudKeys[index])}
                      name={"permission.all"}
                    />
                  </Tooltip>
                </td>
                <td>{crudKeys[index]}</td>
                {[Crud.CREATE, Crud.READ, Crud.UPDATE, Crud.DELETE].map(
                  (access: Crud, index: number) => {
                    return crudPermission[access] ? (
                      <td key={index}>
                        <AclPermissionCheckbox
                          permission={crudPermission[access]}
                          onChange={onChange}
                          groupPermissions={groupPermissions}
                        />
                      </td>
                    ) : (
                      <td key={index} className={classes.empty}>
                        <span>∅</span>
                      </td>
                    );
                  }
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
