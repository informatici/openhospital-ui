import React, { useMemo } from "react";

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
  onChange: (permission: PermissionDTO, action: PermissionActionEnum) => void;
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

  return (
    <div className={classes.container}>
      <table className={classes.acl}>
        <thead>
          <tr>
            <th>{t("permission.name")}</th>
            <th>{t("permission.create")}</th>
            <th>{t("permission.read")}</th>
            <th>{t("permission.update")}</th>
            <th>{t("permission.deleted")}</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(crudPermissions.values()).map((crudPermission, index) => {
            return (
              <tr key={index}>
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
