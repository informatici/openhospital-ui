import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { PermissionDTO } from "../../../../../generated";
import { PermissionActionEnum } from "./permission.utils";

interface IProps {
  permission: PermissionDTO;
  groupPermissions: Array<PermissionDTO>;
  onChange: (permission: PermissionDTO, action: PermissionActionEnum) => void;
}

export const PermissionCheckbox = ({
  permission,
  groupPermissions,
  onChange,
}: IProps) => {
  const checked =
    groupPermissions?.some((p) => p.id === permission.id) || false;
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={(_ev, val) =>
            onChange(
              permission,
              checked
                ? PermissionActionEnum.REVOKE
                : PermissionActionEnum.ASSIGN
            )
          }
          name={permission.id.toString()}
        />
      }
      label={permission.name || "unknown"}
    />
  );
};
