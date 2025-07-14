import { createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { ApiResponse } from "state/types";
import { initial } from "./initial";
import * as thunks from "./thunk";

export const radiologySlice = createSlice({
  name: "radiology",
  initialState: initial,
  reducers: {
    getPatientStudiesReset: (state) => {
      state.studies = initial.studies;
    },
    getStudySeriesReset: (state) => {
      state.series = initial.series;
    },
    getStudySeriesWithInstancesReset: (state) => {
      state.seriesWithInstances = initial.seriesWithInstances;
    },
    getSerieInstancesReset: (state) => {
      state.instances = initial.instances;
    },
    getInstancePreviewReset: (state) => {
      state.preview = initial.preview;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Patient Studies
      .addCase(thunks.getPatientStudies.pending, (state) => {
        state.studies = ApiResponse.loading();
      })
      .addCase(thunks.getPatientStudies.fulfilled, (state, action) => {
        state.studies.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.studies.data = action.payload;
      })
      .addCase(thunks.getPatientStudies.rejected, (state, action) => {
        state.studies = ApiResponse.error(action.payload);
      })
      // Get Study Series
      .addCase(thunks.getStudySeries.pending, (state) => {
        state.series = ApiResponse.loading();
      })
      .addCase(thunks.getStudySeries.fulfilled, (state, action) => {
        state.series.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.series.data = action.payload;
      })
      .addCase(thunks.getStudySeries.rejected, (state, action) => {
        state.series = ApiResponse.error(action.payload);
      })
      // Get Study Series With Instances
      .addCase(thunks.getStudySeriesWithInstances.pending, (state) => {
        state.seriesWithInstances = ApiResponse.loading();
      })
      .addCase(
        thunks.getStudySeriesWithInstances.fulfilled,
        (state, action) => {
          state.seriesWithInstances.status = isEmpty(action.payload)
            ? "SUCCESS_EMPTY"
            : "SUCCESS";
          state.seriesWithInstances.data = action.payload;
        }
      )
      .addCase(thunks.getStudySeriesWithInstances.rejected, (state, action) => {
        state.seriesWithInstances = ApiResponse.error(action.payload);
      })
      // Get Serie Instances
      .addCase(thunks.getSerieInstances.pending, (state) => {
        state.instances = ApiResponse.loading();
      })
      .addCase(thunks.getSerieInstances.fulfilled, (state, action) => {
        state.instances.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.instances.data = action.payload;
      })
      .addCase(thunks.getSerieInstances.rejected, (state, action) => {
        state.instances = ApiResponse.error(action.payload);
      })
      // Get Instance Preview
      .addCase(thunks.getInstancePreview.pending, (state) => {
        state.preview = ApiResponse.loading();
      })
      .addCase(thunks.getInstancePreview.fulfilled, (state, action) => {
        state.preview = ApiResponse.value(action.payload.data);
      })
      .addCase(thunks.getInstancePreview.rejected, (state, action) => {
        state.preview = ApiResponse.error(action.payload);
      }),
});

export const {
  getPatientStudiesReset,
  getStudySeriesReset,
  getSerieInstancesReset,
  getInstancePreviewReset,
  getStudySeriesWithInstancesReset,
} = radiologySlice.actions;
