import { Dialog, Fab } from "@mui/material";
import React, { FC } from "react";
import { TFullscreenCardProps } from "./types";
import { useAppSelector } from "libraries/hooks/redux";
import { IState } from "../../../../types";
import { DashboardWidget } from "../layouts/item/GridLayoutItem";
import { GridCloseIcon } from "@mui/x-data-grid";

export const FullscreenCard: FC<TFullscreenCardProps> = ({
  dashboard,
  onClose,
}) => {
  const period = useAppSelector<IState, string[]>(
    (state) => state.dashboard.period
  );

  return (
    <Dialog fullScreen open={dashboard !== undefined} onClose={onClose}>
      {dashboard && <DashboardWidget dashboard={dashboard} period={period} />}
      <Fab
        title="Exit fullscreen"
        aria-label="Exit fullscreen"
        style={{ position: "absolute", top: 5, right: 5 }}
        onClick={onClose}
        color="primary"
      >
        <GridCloseIcon />
      </Fab>
    </Dialog>
  );
};
