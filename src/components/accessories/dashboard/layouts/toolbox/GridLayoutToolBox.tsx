import { FC } from "react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../types";
import { useTranslation } from "react-i18next";
import { TGridLayoutToolboxItemProps, TDashboardComponent } from "../types";
import { defaultLayoutConfig, getDashboardLabel } from "../consts";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Layout, Layouts } from "react-grid-layout";
import { saveLayouts, setToolbox } from "../../../../../state/layouts/actions";
import "./styles.scss";

export const GridLayoutToolbox: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const breakpoint = useSelector<IState, string>(
    (state) => state.layouts.breakpoint
  );

  const layouts = useSelector<IState, Layouts>(
    (state: IState) => state.layouts.getLayouts.data ?? defaultLayoutConfig
  );

  const toolbox = useSelector<IState, Layouts>(
    (state: IState) => state.layouts.toolbox ?? {}
  );

  const onItemPut = (item: Layout) => {
    let layoutsTmp = {
      ...layouts,
      [breakpoint]: [...layouts[breakpoint], item],
    };
    let toolboxTmp = {
      ...toolbox,
      [breakpoint]: toolbox[breakpoint].filter(({ i }) => i !== item.i),
    };

    dispatch(setToolbox(toolboxTmp));
    dispatch(saveLayouts(layoutsTmp));

    console.log(toolboxTmp[breakpoint]);
    console.log(layoutsTmp[breakpoint]);
  };

  const GridLayoutToolboxItem: FC<TGridLayoutToolboxItemProps> = ({
    item,
    onTake,
  }) => {
    return (
      <div className="Toolbox-item">
        <Button
          className="Toolbox-item-button"
          variant="contained"
          color="default"
          endIcon={<Add />}
          onClick={() => onTake()}
        >
          <h4>{t(getDashboardLabel(item.i as TDashboardComponent))}</h4>
        </Button>
      </div>
    );
  };

  return (
    <div className="Dashboard-toolbox side">
      <div className="side__header">
        <div>
          <span>{t("dashboard.availabledashboard")}</span>
        </div>
      </div>
      <div className="side__body">
        <div className="section">
          {toolbox[breakpoint]
            ? toolbox[breakpoint].map((layout) => {
                return (
                  <GridLayoutToolboxItem
                    key={layout.i}
                    item={layout}
                    onTake={() => onItemPut(layout)}
                  />
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
};
