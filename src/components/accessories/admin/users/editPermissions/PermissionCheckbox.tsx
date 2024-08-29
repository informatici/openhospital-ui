import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { PermissionDTO } from "../../../../../generated";
import { computeNewPermission } from "./permission.utils";

interface IProps {
  permission: PermissionDTO;
  onChange: (permission: PermissionDTO) => void;
  thisGroupId: string;
}

export const PermissionCheckbox = ({
  permission,
  onChange,
  thisGroupId,
}: IProps) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={
            !!permission.userGroupIds.find((group) => group === thisGroupId)
          }
          onChange={(_ev, val) =>
            onChange(computeNewPermission(thisGroupId, permission, val))
          }
          name={permission.id.toString()}
        />
      }
      label={permission.name || "unknown"}
    />
  );
};
