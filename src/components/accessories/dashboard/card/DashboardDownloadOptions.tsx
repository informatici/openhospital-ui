import { MenuItem } from "@mui/material";
import { TDashboardDownloadProps } from "./types";
import React from "react";

type TDashboardDownloadOptions = {
  actions: TDashboardDownloadProps[];
  onClose?: () => void;
};
export const DownloadOptions = React.forwardRef<
  HTMLDivElement,
  TDashboardDownloadOptions
>((props, ref) => {
  const { actions, onClose } = props;

  return (
    <>
      {actions.map((action) => {
        return <MenuItem onClick={onClose}>{action.action}</MenuItem>;
      })}
    </>
  );
});
