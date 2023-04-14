import { ListItemIcon, MenuItem } from "@material-ui/core";
import { TDashboardDownloadProps } from "./types";
import React from "react";
import { Description, PictureAsPdf, SaveAlt } from "@material-ui/icons";

//import "./styles.scss";

type TDashboardDownloadOptions = { actions: TDashboardDownloadProps[] };
export const DownloadOptions = React.forwardRef<
  HTMLDivElement,
  TDashboardDownloadOptions
>((props, ref) => {
  const actions = props.actions;
  const pdf = actions.find((el) => el.format === "pdf");
  const excel = actions.find((el) => el.format === "excel");
  const csv = actions.find((el) => el.format === "csv");

  return (
    <>
      {pdf && (
        <MenuItem innerRef={ref}>
          <a href={pdf.link} className="download-link">
            <ListItemIcon>
              <PictureAsPdf />
            </ListItemIcon>
            <span className="download-format"> PDF </span>
          </a>
        </MenuItem>
      )}
      {excel && (
        <MenuItem innerRef={ref}>
          <a href={excel.link} className="download-link">
            <ListItemIcon>
              <SaveAlt />
            </ListItemIcon>
            <span className="download-format"> Excel </span>
          </a>
        </MenuItem>
      )}
      {csv && (
        <MenuItem innerRef={ref}>
          <a href={csv.link} className="download-link">
            <ListItemIcon>
              <Description />
            </ListItemIcon>
            <span className="download-format"> CSV </span>
          </a>
        </MenuItem>
      )}
    </>
  );
});
