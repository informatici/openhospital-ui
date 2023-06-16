import React, { useLayoutEffect } from "react";
import { FC, useRef, useEffect, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../types";
import {
  defaultGridLayoutBreakpoints,
  defaultGridLayoutCols,
  encodeLayout,
  getBreakpointFromWidth,
  removeDuplicates,
} from "../consts";
import { TDashboardComponent } from "../types";
import {
  getLayouts,
  getLayoutsReset,
  resetLayouts,
  saveLayouts,
  saveLayoutsReset,
  setBreakpoint,
} from "../../../../../state/layouts/actions";
import { GridLayoutItem } from "../item/GridLayoutItem";
import { Button, CircularProgress } from "@material-ui/core";
import { FullscreenCard } from "../../card/FullscreenCard";
import { ErrorOutline } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import InfoBox from "../../../infoBox/InfoBox";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import "../styles.scss";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const GridLayoutContainer: FC = () => {
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState(false);
  const [canUpdateLayouts, setCanUpdateLayouts] = useState(true);
  const [localBreakpoint, setLocalBreakpoint] = useState<string>("md");
  const [fsDashboard, setFsDashboard] =
    useState<TDashboardComponent | undefined>(undefined);
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const gridLayoutRef = useRef<HTMLDivElement>(null);

  const layouts = useSelector<IState, Layouts>(
    (state) => state.layouts.layouts
  );

  const toolbox = useSelector<IState, Layouts>(
    (state) => state.layouts.toolbox
  );

  useLayoutEffect(() => {
    if (gridLayoutRef.current) {
      setLocalBreakpoint(
        getBreakpointFromWidth(gridLayoutRef.current.offsetWidth)
      );
    }
  }, []);

  useEffect(() => {
    dispatch(getLayouts());
    setMounted(true);
  }, []);

  const onRetry = () => {
    dispatch(getLayouts());
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

    dispatch(saveLayouts(encodeLayout({ layout: allLayouts, toolbox })));
  };

  const onItemRemove = (item: Layout) => {
    let toolboxTmp = removeDuplicates({
      ...toolbox,
      [localBreakpoint]: [...(toolbox[localBreakpoint] || []), item],
    });

    let layoutsTmp = removeDuplicates({
      ...layouts,
      [localBreakpoint]: layouts[localBreakpoint].filter(
        ({ i }) => i !== item.i
      ),
    });

    setCanUpdateLayouts(false);

    dispatch(
      saveLayouts(encodeLayout({ layout: layoutsTmp, toolbox: toolboxTmp }))
    );
  };

  const onFullScreenEnter = (label: TDashboardComponent) => {
    setFsDashboard(label);
  };

  const onFullScreenExit = () => {
    setFsDashboard(undefined);
  };

  const getLayoutsStatus = useSelector(
    (state: IState) => state.layouts.getLayouts.status
  );

  const resetLayoutsStatus = useSelector(
    (state: IState) => state.layouts.resetLayouts.status
  );

  const saveLayoutsStatus = useSelector(
    (state: IState) => state.layouts.saveLayouts.status
  );

  const errorMessage = useSelector(
    (state: IState) =>
      state.layouts.getLayouts.error?.response ||
      state.layouts.resetLayouts.error?.response ||
      t("dashboard.cantretrieveconfig")
  );

  const saveErrorMessage = useSelector(
    (state: IState) =>
      state.layouts.saveLayouts.error?.response ?? t("dashboard.cantsaveconfig")
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
                <div key={ldash} style={{ background: "#ccc" }} data-grid={l}>
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

          <FullscreenCard dashboard={fsDashboard} onClose={onFullScreenExit} />
        </>
      )}
    </div>
  );
};

export default GridLayoutContainer;
