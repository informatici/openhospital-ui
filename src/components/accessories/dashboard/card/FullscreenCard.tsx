import { Dialog, Fab } from "@material-ui/core";
import React, { FC } from "react";
import { TFullscreenCardProps } from "./types";
import { useSelector } from "react-redux";
import { IState } from "../../../../types";
import { DashboardWidget } from "../layouts/item/GridLayoutItem";
import { GridCloseIcon } from "@material-ui/data-grid";

export const FullscreenCard: FC<TFullscreenCardProps> = ({
  dashboard,
  onClose,
}) => {
  const period = useSelector<IState, string[]>(
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
