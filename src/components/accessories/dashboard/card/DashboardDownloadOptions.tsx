import { MenuItem } from "@mui/material";
import React from "react";
import { TDashboardDownloadProps } from "./types";

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
