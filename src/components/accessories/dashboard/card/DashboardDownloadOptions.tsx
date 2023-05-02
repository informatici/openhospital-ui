import { MenuItem } from "@material-ui/core";
import { TDashboardDownloadProps } from "./types";
import React from "react";

type TDashboardDownloadOptions = { actions: TDashboardDownloadProps[] };
export const DownloadOptions = React.forwardRef<
  HTMLDivElement,
  TDashboardDownloadOptions
>((props, ref) => {
  const actions = props.actions;

  return (
    <>
      {actions.map((action) => {
        return <MenuItem innerRef={ref}>{action.action}</MenuItem>;
      })}
    </>
  );
});
