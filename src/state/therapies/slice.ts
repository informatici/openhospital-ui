import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
import { isEmpty } from "lodash";

export const therapySlice = createSlice({
  name: "therapies",
  initialState: initial,
  reducers: {
    createTherapyReset: (state) => {
      state.createTherapy = initial.createTherapy;
    },
    updateTherapyReset: (state) => {
      state.updateTherapy = initial.updateTherapy;
    },
    deleteTherapyReset: (state) => {
      state.deleteTherapy = initial.deleteTherapy;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Patient Therapies
      .addCase(thunks.getTherapiesByPatientId.pending, (state) => {
        state.therapiesByPatientId = ApiResponse.loading();
      })
      .addCase(thunks.getTherapiesByPatientId.fulfilled, (state, action) => {
        state.therapiesByPatientId = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getTherapiesByPatientId.rejected, (state, action) => {
        state.therapiesByPatientId = ApiResponse.error(action.payload);
      })
      // Create Therapy
      .addCase(thunks.createTherapy.pending, (state) => {
        state.createTherapy = ApiResponse.loading();
      })
      .addCase(thunks.createTherapy.fulfilled, (state, action) => {
        state.createTherapy = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createTherapy.rejected, (state, action) => {
        state.createTherapy = ApiResponse.error(action.payload);
      })
      // Update Therapy
      .addCase(thunks.updateTherapy.pending, (state) => {
        state.updateTherapy = ApiResponse.loading();
      })
      .addCase(thunks.updateTherapy.fulfilled, (state, action) => {
        state.updateTherapy = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateTherapy.rejected, (state, action) => {
        state.updateTherapy = ApiResponse.error(action.payload);
      })
      // Delete Therapy
      .addCase(thunks.deleteTherapy.pending, (state) => {
        state.deleteTherapy = ApiResponse.loading();
      })
      .addCase(thunks.deleteTherapy.fulfilled, (state, action) => {
        state.deleteTherapy.status = "SUCCESS";
      })
      .addCase(thunks.deleteTherapy.rejected, (state, action) => {
        state.deleteTherapy = ApiResponse.error(action.payload);
      }),
});

export const { createTherapyReset, updateTherapyReset, deleteTherapyReset } =
  therapySlice.actions;
