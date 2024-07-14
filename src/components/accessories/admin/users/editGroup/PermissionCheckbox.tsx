import React, { useState } from "react";

import { PermissionDTO } from "../../../../../generated";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { Popper } from "@material-ui/core";

interface IProps {
  permission: PermissionDTO;
  onChange: (permission: PermissionDTO) => void;
  thisGroup: string;
  popOver?: boolean;
}

const styles = {
  formControlLabel: {
    maxWidth: "3em",
    border: "1px solid",
    "&:hover": {
      borderColor: "red",
      "span.MuiFormControlLabel-label": {
        color: "red !important",
      },
    },
  },
};

export const PermissionCheckbox = ({
  permission,
  onChange,
  thisGroup,
  popOver,
}: IProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  if (popOver) {
    return (
      <>
        <Checkbox
          aria-describedby={id}
          checked={
            !!permission.userGroupIds.find((group) => group === thisGroup)
          }
          onChange={() => console.log}
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
  }
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
