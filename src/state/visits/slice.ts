import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
import { isEmpty } from "lodash";

export const visitSlice = createSlice({
  name: "visits",
  initialState: initial,
  reducers: {
    createVisitReset: (state) => {
      state.createVisit = initial.createVisit;
    },
    updateVisitReset: (state) => {
      state.updateVisit = initial.updateVisit;
    },
    deleteVisitReset: (state) => {
      state.deleteVisit = initial.deleteVisit;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Visits
      .addCase(thunks.getVisits.pending, (state) => {
        state.getVisits = ApiResponse.loading();
      })
      .addCase(thunks.getVisits.fulfilled, (state, action) => {
        state.getVisits = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getVisits.rejected, (state, action) => {
        state.getVisits = ApiResponse.error(action.payload);
      })
      // Create Visit
      .addCase(thunks.createVisit.pending, (state) => {
        state.createVisit = ApiResponse.loading();
      })
      .addCase(thunks.createVisit.fulfilled, (state, action) => {
        state.createVisit = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createVisit.rejected, (state, action) => {
        state.createVisit = ApiResponse.error(action.payload);
      })
      // Update Visit
      .addCase(thunks.updateVisit.pending, (state) => {
        state.updateVisit = ApiResponse.loading();
      })
      .addCase(thunks.updateVisit.fulfilled, (state, action) => {
        state.updateVisit = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateVisit.rejected, (state, action) => {
        state.updateVisit = ApiResponse.error(action.payload);
      })
      // Delete Visit
      .addCase(thunks.deleteVisit.pending, (state) => {
        state.deleteVisit = ApiResponse.loading();
      })
      .addCase(thunks.deleteVisit.fulfilled, (state, action) => {
        state.deleteVisit.status = "SUCCESS";
      })
      .addCase(thunks.deleteVisit.rejected, (state, action) => {
        state.deleteVisit = ApiResponse.error(action.payload);
      }),
});

export const { createVisitReset, updateVisitReset, deleteVisitReset } =
  visitSlice.actions;
