import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
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
        state.getVisits.status = "LOADING";
      })
      .addCase(thunks.getVisits.fulfilled, (state, action) => {
        state.getVisits.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getVisits.data = action.payload;
      })
      .addCase(thunks.getVisits.rejected, (state, action) => {
        state.getVisits.status = "FAIL";
        state.getVisits.error = action.payload;
      })
      // Create Visit
      .addCase(thunks.createVisit.pending, (state) => {
        state.createVisit.status = "LOADING";
      })
      .addCase(thunks.createVisit.fulfilled, (state, action) => {
        state.createVisit.status = "SUCCESS";
        state.createVisit.data = action.payload;
      })
      .addCase(thunks.createVisit.rejected, (state, action) => {
        state.createVisit.status = "FAIL";
        state.createVisit.error = action.payload;
      })
      // Update Visit
      .addCase(thunks.updateVisit.pending, (state) => {
        state.updateVisit.status = "LOADING";
      })
      .addCase(thunks.updateVisit.fulfilled, (state, action) => {
        state.updateVisit.status = "SUCCESS";
        state.updateVisit.data = action.payload;
      })
      .addCase(thunks.updateVisit.rejected, (state, action) => {
        state.updateVisit.status = "FAIL";
        state.updateVisit.error = action.payload;
      })
      // Delete Visit
      .addCase(thunks.deleteVisit.pending, (state) => {
        state.deleteVisit.status = "LOADING";
      })
      .addCase(thunks.deleteVisit.fulfilled, (state, action) => {
        state.deleteVisit.status = "SUCCESS";
      })
      .addCase(thunks.deleteVisit.rejected, (state, action) => {
        state.deleteVisit.status = "FAIL";
        state.deleteVisit.error = action.payload;
      }),
});

export const { createVisitReset, updateVisitReset, deleteVisitReset } =
  visitSlice.actions;
