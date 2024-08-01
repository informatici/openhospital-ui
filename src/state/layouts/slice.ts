import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
import { isEmpty } from "lodash";
import { Layouts } from "react-grid-layout";
import {
  decodeLayoutConfig,
  encodeLayout,
  toolboxDashboards,
} from "../../components/accessories/dashboard/layouts/consts";

export const layoutSlice = createSlice({
  name: "layouts",
  initialState: initial,
  reducers: {
    resetLayouts: (state) => {
      /**
       * @todo Reset layout via API
       */
      state.resetLayouts.status = "SUCCESS";
    },
    setBreakpoint: (state, { payload }: PayloadAction<string>) => {
      state.breakpoint = payload;
    },
    breakpointReset: (state) => {
      state.breakpoint = initial.breakpoint;
    },
    getLayoutsReset: (state) => {
      state.getLayouts = initial.getLayouts;
    },
    saveLayoutsReset: (state) => {
      state.saveLayouts = initial.saveLayouts;
    },
    resetLayoutsReset: (state) => {
      state.resetLayouts = initial.resetLayouts;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Layouts
      .addCase(thunks.getLayouts.pending, (state) => {
        state.getLayouts = ApiResponse.loading();
      })
      .addCase(thunks.getLayouts.fulfilled, (state, { payload }) => {
        let layout: Layouts;
        let toolbox: Layouts;
        let savedConfig: string | undefined;

        state.getLayouts.status = "SUCCESS";

        savedConfig = payload.configValue;
        if (savedConfig && atob(savedConfig) !== null) {
          let decodedConfig = decodeLayoutConfig(savedConfig);
          if (decodedConfig) {
            layout = decodedConfig.layout;
            toolbox = toolboxDashboards(
              decodedConfig.layout,
              decodedConfig.toolbox
            );
          } else {
            layout = {};
            toolbox = toolboxDashboards(layout, {});
          }
        } else {
          //layout = randomLayout(4);
          layout = {};
          toolbox = toolboxDashboards(layout, {});
        }

        state.getLayouts.data = {
          ...payload,
          configValue: encodeLayout({ layout, toolbox }),
        };
      })
      .addCase(thunks.getLayouts.rejected, (state, action) => {
        state.getLayouts = ApiResponse.error(action.payload);
      })
      // Save Layouts
      .addCase(thunks.saveLayouts.pending, (state) => {
        state.saveLayouts = ApiResponse.loading();
      })
      .addCase(thunks.saveLayouts.fulfilled, (state, action) => {
        state.saveLayouts.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.layouts = action.payload.layout!;
        state.toolbox = action.payload.toolbox!;
        state.getLayouts.data = action.payload.data;
        state.saveLayouts.data = action.payload.data;
      })
      .addCase(thunks.saveLayouts.rejected, (state, action) => {
        state.saveLayouts = ApiResponse.error(action.payload);
      }),
});

export const {
  getLayoutsReset,
  saveLayoutsReset,
  breakpointReset,
  resetLayouts,
  resetLayoutsReset,
  setBreakpoint,
} = layoutSlice.actions;
