import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
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
        state.therapiesByPatientId.status = "LOADING";
      })
      .addCase(thunks.getTherapiesByPatientId.fulfilled, (state, action) => {
        state.therapiesByPatientId.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.therapiesByPatientId.data = action.payload;
      })
      .addCase(thunks.getTherapiesByPatientId.rejected, (state, action) => {
        state.therapiesByPatientId.status = "FAIL";
        state.therapiesByPatientId.error = action.payload;
      })
      // Create Therapy
      .addCase(thunks.createTherapy.pending, (state) => {
        state.createTherapy.status = "LOADING";
      })
      .addCase(thunks.createTherapy.fulfilled, (state, action) => {
        state.createTherapy.status = "SUCCESS";
        state.createTherapy.data = action.payload;
      })
      .addCase(thunks.createTherapy.rejected, (state, action) => {
        state.createTherapy.status = "FAIL";
        state.createTherapy.error = action.payload;
      })
      // Update Therapy
      .addCase(thunks.updateTherapy.pending, (state) => {
        state.updateTherapy.status = "LOADING";
      })
      .addCase(thunks.updateTherapy.fulfilled, (state, action) => {
        state.updateTherapy.status = "SUCCESS";
        state.updateTherapy.data = action.payload;
      })
      .addCase(thunks.updateTherapy.rejected, (state, action) => {
        state.updateTherapy.status = "FAIL";
        state.updateTherapy.error = action.payload;
      })
      // Delete Therapy
      .addCase(thunks.deleteTherapy.pending, (state) => {
        state.deleteTherapy.status = "LOADING";
      })
      .addCase(thunks.deleteTherapy.fulfilled, (state, action) => {
        state.deleteTherapy.status = "SUCCESS";
      })
      .addCase(thunks.deleteTherapy.rejected, (state, action) => {
        state.deleteTherapy.status = "FAIL";
        state.deleteTherapy.error = action.payload;
      }),
});

export const { createTherapyReset, updateTherapyReset, deleteTherapyReset } =
  therapySlice.actions;
