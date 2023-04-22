import React from "react";
import { FC, createRef, useEffect, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../types";
import {
  defaultGridLayoutBreakpoints,
  defaultGridLayoutCols,
  defaultLayoutConfig,
} from "../consts";
import { TDashboardComponent } from "../types";
import {
  saveLayouts,
  setBreakpoint,
  setToolbox,
} from "../../../../../state/layouts/actions";
import { GridLayoutItem } from "../item/GridLayoutItem";

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import "../styles.scss";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const GridLayoutContainer: FC = () => {
  const dispatch = useDispatch();
  const ref = createRef<HTMLDivElement>();

  const [mounted, setMounted] = useState(false);
  const [localBreakpoint, setLocalBreakpoint] = useState<string>("md");

  const currentBreakpoint = useSelector<IState, string>(
    (state) => state.layouts.breakpoint
  );

  const layouts = useSelector<IState, Layouts>(
    (state) => state.layouts.getLayouts.data ?? defaultLayoutConfig
  );
  const toolbox = useSelector<IState, Layouts>(
    (state) => state.layouts.toolbox ?? {}
  );

  useEffect(() => {
    setMounted(true);
    //Load Layout config from Backend
    //dispatch(getLayouts());
  }, []);

  useEffect(() => {
    console.log(layouts);
  }, [layouts]);

  useEffect(() => {
    setLocalBreakpoint(currentBreakpoint);
    console.log("breakpoint change: " + currentBreakpoint);
  }, [currentBreakpoint]);

  const onBreakpointChange = (breakpoint: string) => {
    //console.log(currentBreakpoint);
    //console.log(breakpoint);

    dispatch(setBreakpoint(breakpoint));
    setLocalBreakpoint(breakpoint);
  };

  const onLayoutChange = (newLayout: Layout[]) => {
    let layoutsTmp = { ...layouts, [localBreakpoint]: newLayout };
    dispatch(saveLayouts(layoutsTmp));
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

    dispatch(setToolbox(toolboxTmp));
    dispatch(saveLayouts(layoutsTmp));
  };

  return (
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
      {console.log(
        currentBreakpoint + " local " + localBreakpoint,
        layouts[currentBreakpoint]
      )}
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
  );
};

export default GridLayoutContainer;
