import React from "react";
import { FC, createRef, useEffect, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../types";
import {
  defaultGridLayoutBreakpoints,
  defaultGridLayoutCols,
  encodeLayout,
  removeDuplicates,
} from "../consts";
import { TDashboardComponent } from "../types";
import {
  getLayouts,
  saveLayouts,
  setBreakpoint,
} from "../../../../../state/layouts/actions";
import { GridLayoutItem } from "../item/GridLayoutItem";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import "../styles.scss";
import { CircularProgress } from "@material-ui/core";
import { FullscreenCard } from "../../card/FullscreenCard";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const GridLayoutContainer: FC = () => {
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState(false);
  const [canUpdateLayouts, setCanUpdateLayouts] = useState(true);
  const [localBreakpoint, setLocalBreakpoint] = useState<string>("md");
  const [fsDashboard, setFsDashboard] =
    useState<TDashboardComponent | undefined>(undefined);

  const currentBreakpoint = useSelector<IState, string>(
    (state) => state.layouts.breakpoint
  );

  const layouts = useSelector<IState, Layouts>(
    (state) => state.layouts.layouts
  );

  const toolbox = useSelector<IState, Layouts>(
    (state) => state.layouts.toolbox
  );

  useEffect(() => {
    dispatch(getLayouts("1"));
    setMounted(true);
  }, []);

  const onBreakpointChange = (breakpoint: string) => {
    dispatch(setBreakpoint(breakpoint));
    setLocalBreakpoint(breakpoint);

    //setCanUpdateLayouts(false);
  };

  const onLayoutChange = (newLayout: Layout[], allLayouts: Layouts) => {
    if (!canUpdateLayouts) {
      setCanUpdateLayouts(true);
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

    //setCanUpdateLayouts(false);

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

  return (
    <>
      {getLayoutsStatus === "LOADING" && (
        <CircularProgress style={{ marginLeft: "50%", position: "relative" }} />
      )}

      {getLayoutsStatus === "SUCCESS" && (
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
            {layouts[localBreakpoint].map((l, key) => {
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
    </>
  );
};

export default GridLayoutContainer;
