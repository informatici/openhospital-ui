import React, { useLayoutEffect } from "react";
import { FC, useRef, useEffect, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { IState } from "../../../../../types";
import {
  addWidget,
  defaultGridLayoutBreakpoints,
  defaultGridLayoutCols,
  encodeLayout,
  getBreakpointFromWidth,
  isEmptyLayout,
  removeDuplicates,
  removeWidget,
} from "../consts";
import { LayoutBreakpoints, TDashboardComponent } from "../types";
import {
  getLayouts,
  getLayoutsReset,
  resetLayouts,
  saveLayouts,
  saveLayoutsReset,
  setBreakpoint,
} from "../../../../../state/layouts";
import { GridLayoutItem } from "../item/GridLayoutItem";
import { Button, CircularProgress } from "@mui/material";
import { FullscreenCard } from "../../card/FullscreenCard";
import { ErrorOutline } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import InfoBox from "../../../infoBox/InfoBox";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import "../styles.scss";
import { UserSettingDTO } from "../../../../../generated";
import { IAuthentication } from "../../../../../state/main/types";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const GridLayoutContainer: FC = () => {
  const dispatch = useAppDispatch();

  const [mounted, setMounted] = useState(false);
  const [canUpdateLayouts, setCanUpdateLayouts] = useState(true);
  const [localBreakpoint, setLocalBreakpoint] = useState<string>("md");
  const [fsDashboard, setFsDashboard] = useState<
    TDashboardComponent | undefined
  >(undefined);
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const gridLayoutRef = useRef<HTMLDivElement>(null);

  const userCredentials = useAppSelector(
    (state) => state.main.authentication.data
  );

  const layouts = useAppSelector((state) => state.layouts.layouts);

  const dashboardSetting = useAppSelector(
    (state) => state.layouts.getLayouts.data
  );

  const toolbox = useAppSelector((state) => state.layouts.toolbox);

  useLayoutEffect(() => {
    if (gridLayoutRef.current) {
      setLocalBreakpoint(
        getBreakpointFromWidth(gridLayoutRef.current.offsetWidth)
      );
    }
  }, []);

  useEffect(() => {
    dispatch(getLayouts(userCredentials?.username!));
    setMounted(true);
  }, []);

  const onRetry = () => {
    dispatch(getLayouts(userCredentials?.username!));
  };

  const onReset = () => {
    dispatch(resetLayouts());
    dispatch(getLayoutsReset());
    dispatch(saveLayoutsReset());
  };

  const onBreakpointChange = (breakpoint: string) => {
    setLocalBreakpoint(breakpoint);
    dispatch(setBreakpoint(breakpoint));
  };

  const getRealBreakpoint = (): string => {
    if (gridLayoutRef.current) {
      return getBreakpointFromWidth(gridLayoutRef.current.offsetWidth);
    }

    return localBreakpoint;
  };

  const onLayoutChange = (newLayout: Layout[], allLayouts: Layouts) => {
    if (!canUpdateLayouts) {
      setCanUpdateLayouts(true);
      return;
    }

    let currentBreakpoint = getRealBreakpoint();

    if (currentBreakpoint !== localBreakpoint) {
      return;
    }

    let setting: UserSettingDTO;

    if (!dashboardSetting) {
      setting = {
        configName: "dashboard",
        user: userCredentials?.username!,
      } as UserSettingDTO;
    } else {
      setting = { ...dashboardSetting };
    }

    setting.configValue = encodeLayout({ layout: allLayouts, toolbox });

    dispatch(saveLayouts(setting));
  };

  const onItemRemove = (item: Layout) => {
    let toolboxTmp = removeDuplicates({
      ...toolbox,
      ...addWidget(toolbox, item, localBreakpoint as LayoutBreakpoints),
    });

    let layoutsTmp = removeDuplicates({
      ...layouts,
      ...removeWidget(layouts, item),
    });

    setCanUpdateLayouts(false);

    let setting: UserSettingDTO;

    if (!dashboardSetting) {
      setting = {
        configName: "dashboard",
        user: userCredentials?.username!,
      } as UserSettingDTO;
    } else {
      setting = { ...dashboardSetting };
    }

    setting.configValue = encodeLayout({
      layout: layoutsTmp,
      toolbox: toolboxTmp,
    });

    dispatch(saveLayouts(setting));
  };

  const onFullScreenEnter = (label: TDashboardComponent) => {
    setFsDashboard(label);
  };

  const onFullScreenExit = () => {
    setFsDashboard(undefined);
  };

  const getLayoutsStatus = useAppSelector(
    (state: IState) => state.layouts.getLayouts.status
  );

  const resetLayoutsStatus = useAppSelector(
    (state: IState) => state.layouts.resetLayouts.status
  );

  const saveLayoutsStatus = useAppSelector(
    (state: IState) => state.layouts.saveLayouts.status
  );

  const errorMessage = useAppSelector((state: IState) =>
    t(
      state.layouts.getLayouts.error?.message ||
        state.layouts.resetLayouts.error?.message ||
        "dashboard.cantretrieveconfig"
    )
  );

  const saveErrorMessage = useAppSelector((state: IState) =>
    t(state.layouts.saveLayouts.error?.message || "dashboard.cantsaveconfig")
  );

  return (
    <div ref={gridLayoutRef}>
      {(getLayoutsStatus === "LOADING" || resetLayoutsStatus === "LOADING") && (
        <CircularProgress style={{ marginLeft: "50%", position: "relative" }} />
      )}

      {(getLayoutsStatus === "FAIL" || resetLayoutsStatus === "FAIL") && (
        <div className="error">
          <p>
            <ErrorOutline className="icon" color="primary" fontSize="large" />
          </p>
          <h2>{errorMessage}</h2>
          <div className="actions">
            <Button
              onClick={onRetry}
              variant="outlined"
              color="primary"
              style={{ marginRight: "10px" }}
            >
              {t("common.retry")}
            </Button>
            <Button
              onClick={onReset}
              variant="outlined"
              title={t("dashboard.resetcustomization")}
              color="secondary"
            >
              {t("dashboard.reset")}
            </Button>
          </div>
        </div>
      )}

      {(getLayoutsStatus === "SUCCESS" || resetLayoutsStatus === "SUCCESS") && (
        <>
          {saveLayoutsStatus === "FAIL" && (
            <div ref={infoBoxRef} className="info-box-container">
              <InfoBox type="error" message={saveErrorMessage} />
            </div>
          )}

          {isEmptyLayout(layouts) && (
            <div
              ref={infoBoxRef}
              style={{ textAlign: "center" }}
              className="info-box-container"
            >
              {isEmptyLayout(toolbox) ? (
                <InfoBox type="info" message={t("dashboard.noallowedwidget")} />
              ) : (
                <InfoBox type="info" message={t("dashboard.emptylayout")} />
              )}
            </div>
          )}

          {!isEmptyLayout(layouts) && (
            <>
              <ResponsiveReactGridLayout
                className="layout"
                layouts={layouts}
                onBreakpointChange={onBreakpointChange}
                onLayoutChange={onLayoutChange}
                isDraggable
                isDroppable
                isResizable
                measureBeforeMount={false}
                useCSSTransforms={mounted}
                draggableHandle=".DashboardCard-item-header"
                resizeHandles={["ne", "se"]}
                breakpoints={defaultGridLayoutBreakpoints}
                cols={defaultGridLayoutCols}
              >
                {layouts[getRealBreakpoint()].map((l, key) => {
                  let ldash = l.i as TDashboardComponent;

                  return (
                    <div
                      key={ldash}
                      style={{ background: "#ccc" }}
                      data-grid={l}
                    >
                      <GridLayoutItem
                        dashboardKey={ldash}
                        onRemove={() => onItemRemove(l)}
                        onFullScreenEnter={() =>
                          onFullScreenEnter(l.i as TDashboardComponent)
                        }
                      />
                    </div>
                  );
                })}
              </ResponsiveReactGridLayout>

              <FullscreenCard
                dashboard={fsDashboard}
                onClose={onFullScreenExit}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default GridLayoutContainer;
