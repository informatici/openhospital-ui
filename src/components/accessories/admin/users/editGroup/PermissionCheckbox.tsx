import React from "react";

import { PermissionDTO } from "../../../../../generated";
import { Checkbox, FormControlLabel } from "@material-ui/core";

interface IProps {
  permission: PermissionDTO;
  onChange: (permission: PermissionDTO) => void;
  thisGroup: string;
}

export const PermissionCheckbox = ({
  permission,
  onChange,
  thisGroup,
}: IProps) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={
            !!permission.userGroupIds.find((group) => group === thisGroup)
          }
          onChange={() => console.log}
          name={permission.id.toString()}
        />
      }
      label={permission.name || "unknown"}
    />
  );
};
