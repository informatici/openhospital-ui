import React from "react";

import { useTranslation } from "react-i18next";
import { PermissionDTO } from "../../../../../generated";
import { AclTable } from "./AclTable";
import { AreaAccess } from "./AreaAccess";
import { PermissionActionEnum, PermissionActionType } from "./permission.utils";

interface IProps {
  permissions: PermissionDTO[];
  groupPermissions: PermissionDTO[];
  setDirty: (v: boolean) => void;
  update: (pa: PermissionActionType) => void;
}
export const GroupPermissionsEditor = ({
  permissions,
  groupPermissions,
  setDirty,
  update,
}: IProps) => {
  const handleChange = (
    newPermission: PermissionDTO,
    action: PermissionActionEnum
  ) => {
    setDirty(true);
    update({ permission: newPermission, action });
  };

  const { t } = useTranslation();

  return (
    <>
      <h2>{t("permission.accessarea")}</h2>
      <AreaAccess
        permissions={permissions}
        groupPermissions={groupPermissions}
        onChange={handleChange}
      />
      <h2>{t("permission.accesscontrollist")}</h2>
      <AclTable
        permissions={permissions}
        groupPermissions={groupPermissions}
        onChange={handleChange}
      />
    </>
  );
};
