import React from "react";

import { PermissionDTO } from "../../../../../generated";
import CheckboxField from "../../../checkboxField/CheckboxField";

interface IProps {
  permission: PermissionDTO;
  onChange: (permission: PermissionDTO) => void;
  thisGroup: string;
}

export const PermissionCheckbox = ({
  permission,
  onChange,
  thisGroup,
}: IProps) => (
  <CheckboxField
    fieldName={permission.id.toString()}
    checked={!!permission.userGroupIds.find((group) => group === thisGroup)}
    label={permission.name || "unknown"}
    // onChange={onChange}
    onChange={() => console.log}
  />
);
