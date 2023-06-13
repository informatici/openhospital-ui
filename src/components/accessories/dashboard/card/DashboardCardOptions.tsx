import { Button, Fade, IconButton, Menu } from "@material-ui/core";
import { TDashboardCardOptionActions } from "./types";
import { useState } from "react";
import React from "react";
import { Close, Fullscreen, GetApp } from "@material-ui/icons";
import { DownloadOptions } from "./DashboardDownloadOptions";
import { useTranslation } from "react-i18next";

type TDashboardCardOptionProps = { actions: TDashboardCardOptionActions };
export const DashboardCardActions = React.forwardRef<
  HTMLDivElement,
  TDashboardCardOptionProps
>((props, ref) => {
  const actions = props.actions;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();

  const handleDownloadBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {actions.downloadButton}
      {actions.onDownload && (
        <>
          <IconButton
            onClick={handleDownloadBtnClick}
            aria-controls="Download-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            aria-label="donwload data"
            title={t("dashboard.downloaddata")}
          >
            <GetApp />
          </IconButton>

          <Menu
            ref={ref}
            getContentAnchorEl={null}
            anchorEl={anchorEl}
            id="Download-menu"
            className="Download-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            elevation={2}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            transformOrigin={{ horizontal: "left", vertical: "top" }}
            TransitionComponent={Fade}
          >
            <DownloadOptions actions={actions.onDownload} />
          </Menu>
        </>
      )}

      {actions.onExpand && (
        <IconButton
          title={t("dashboard.togglefullscreen")}
          onClick={actions.onExpand}
          aria-label="fullscreen"
        >
          <Fullscreen />
        </IconButton>
      )}

      {actions.onClose && (
        <IconButton
          title={t("dashboard.removedashboard")}
          onClick={actions.onClose}
          aria-label="close"
        >
          <Close />
        </IconButton>
      )}
    </>
  );
});
