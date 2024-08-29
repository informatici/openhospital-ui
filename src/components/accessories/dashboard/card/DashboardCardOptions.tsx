import { Close, Fullscreen, GetApp } from "@mui/icons-material";
import { Fade, IconButton, Menu } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { DownloadOptions } from "./DashboardDownloadOptions";
import { TDashboardCardOptionActions } from "./types";

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
            <DownloadOptions
              actions={actions.onDownload}
              onClose={handleClose}
            />
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
