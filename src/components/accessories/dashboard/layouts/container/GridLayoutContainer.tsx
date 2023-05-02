import React from "react";
import { FC, createRef, useEffect, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../types";
import {
  defaultGridLayoutBreakpoints,
  defaultGridLayoutCols,
  encodeLayout,
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

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const GridLayoutContainer: FC = () => {
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState(false);
  const [canUpdateLayouts, setCanUpdateLayouts] = useState(false);
  const [localBreakpoint, setLocalBreakpoint] = useState<string>("md");

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
  };

  const onLayoutChange = (newLayout: Layout[], allLayouts: Layouts) => {
    if (!canUpdateLayouts) {
      setCanUpdateLayouts(true);
      return;
    }

    dispatch(saveLayouts(encodeLayout({ layout: allLayouts, toolbox })));
  };

  const onItemRemove = (item: Layout) => {
    let toolboxTmp = {
      ...toolbox,
      [localBreakpoint]: [...(toolbox[localBreakpoint] || []), item],
    };
    let layoutsTmp = {
      ...layouts,
      [localBreakpoint]: layouts[localBreakpoint].filter(
        ({ i }) => i !== item.i
      ),
    };

    setCanUpdateLayouts(false);

    dispatch(
      saveLayouts(encodeLayout({ layout: layoutsTmp, toolbox: toolboxTmp }))
    );
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
                />
              </div>
            );
          })}
        </ResponsiveReactGridLayout>
      )}
    </>
  );
};

export default GridLayoutContainer;
