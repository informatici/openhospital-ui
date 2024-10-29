import { Checkbox, Tooltip } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { PermissionDTO } from "../../../../../generated";
import { PermissionActionEnum } from "./permission.utils";

interface IProps {
  permission: PermissionDTO;
  groupPermissions: Array<PermissionDTO>;
  onChange: (
    permissions: [PermissionDTO],
    action: PermissionActionEnum
  ) => void;
}

export const AclPermissionCheckbox = ({
  permission,
  groupPermissions,
  onChange,
}: IProps) => {
  const { t } = useTranslation();
  const checked =
    groupPermissions?.some((p) => p.id === permission.id) || false;
  return (
    <Tooltip title={t(`permission.${permission.name!.split(".")[1]}`)}>
      <Checkbox
        aria-describedby={permission.name}
        checked={checked}
        onChange={(_ev, val) =>
          onChange(
            [permission],
            checked ? PermissionActionEnum.REVOKE : PermissionActionEnum.ASSIGN
          )
        }
        name={permission.id.toString()}
      />
    </Tooltip>
  );
};
