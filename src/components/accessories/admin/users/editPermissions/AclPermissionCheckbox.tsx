import { Checkbox, Popper } from "@mui/material";
import React from "react";
import { PermissionDTO } from "../../../../../generated";
import { PermissionActionEnum } from "./permission.utils";

interface IProps {
  permission: PermissionDTO;
  groupPermissions: Array<PermissionDTO>;
  onChange: (permission: PermissionDTO, action: PermissionActionEnum) => void;
}

export const AclPermissionCheckbox = ({
  permission,
  groupPermissions,
  onChange,
}: IProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const checked =
    groupPermissions?.some((p) => p.id === permission.id) || false;
  return (
    <>
      <Checkbox
        aria-describedby={id}
        checked={checked}
        onChange={(_ev, val) =>
          onChange(
            permission,
            checked ? PermissionActionEnum.REVOKE : PermissionActionEnum.ASSIGN
          )
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
