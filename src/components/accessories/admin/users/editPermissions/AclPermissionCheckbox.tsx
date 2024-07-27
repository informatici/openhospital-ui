import React from "react";
import { Checkbox, Popper } from "@material-ui/core";

import { PermissionDTO } from "../../../../../generated";
import { computeNewPermission } from "./permission.utils";

interface IProps {
  permission: PermissionDTO;
  onChange: (permission: PermissionDTO) => void;
  thisGroupId: string;
}

export const AclPermissionCheckbox = ({
  permission,
  onChange,
  thisGroupId,
}: IProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <>
      <Checkbox
        aria-describedby={id}
        checked={
          !!permission.userGroupIds.find((group) => group === thisGroupId)
        }
        onChange={(_ev, val) =>
          onChange(computeNewPermission(thisGroupId, permission, val))
        }
        name={permission.id.toString()}
        onMouseEnter={(event: React.MouseEvent<HTMLElement>) => {
          setAnchorEl(anchorEl ? null : event.currentTarget);
        }}
        onMouseLeave={() => setAnchorEl(null)}
      />
      <Popper
        id={id}
        open={open}
        placement="right"
        disablePortal
        anchorEl={anchorEl}
        style={{ zIndex: 1 }}
      >
        <span
          style={{
            backgroundColor: "#fc1812",
            color: "#fff",
            padding: "5px",
          }}
        >
          {permission.name || "unknown"}
        </span>
      </Popper>
    </>
  );
};
