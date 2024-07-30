import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { isEmpty } from "lodash";

export const diseaseSlice = createSlice({
  name: "diseases",
  initialState: initial,
  reducers: {
    createDiseaseReset: (state) => {
      state.create = initial.create;
    },
    updateDiseaseReset: (state) => {
      state.update = initial.update;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get All Diseases
      .addCase(thunks.getAllDiseases.pending, (state) => {
        state.allDiseases.status = "LOADING";
      })
      .addCase(thunks.getAllDiseases.fulfilled, (state, action) => {
        state.allDiseases.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.allDiseases.data = action.payload;
      })
      .addCase(thunks.getAllDiseases.rejected, (state, action) => {
        state.allDiseases.status = "FAIL";
        state.allDiseases.error = action.payload;
      })
      // Get Diseases OPD
      .addCase(thunks.getDiseasesOpd.pending, (state) => {
        state.diseasesOpd.status = "LOADING";
      })
      .addCase(thunks.getDiseasesOpd.fulfilled, (state, action) => {
        state.diseasesOpd.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.diseasesOpd.data = action.payload;
      })
      .addCase(thunks.getDiseasesOpd.rejected, (state, action) => {
        state.diseasesOpd.status = "FAIL";
        state.diseasesOpd.error = action.payload;
      })
      // Get Diseases IPD IN
      .addCase(thunks.getDiseasesIpdIn.pending, (state) => {
        state.diseasesIpdIn.status = "LOADING";
      })
      .addCase(thunks.getDiseasesIpdIn.fulfilled, (state, action) => {
        state.diseasesIpdIn.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.diseasesIpdIn.data = action.payload;
      })
      .addCase(thunks.getDiseasesIpdIn.rejected, (state, action) => {
        state.diseasesIpdIn.status = "FAIL";
        state.diseasesIpdIn.error = action.payload;
      })
      // Get Diseases IPD OUT
      .addCase(thunks.getDiseasesIpdOut.pending, (state) => {
        state.diseasesIpdOut.status = "LOADING";
      })
      .addCase(thunks.getDiseasesIpdOut.fulfilled, (state, action) => {
        state.diseasesIpdOut.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.diseasesIpdOut.data = action.payload;
      })
      .addCase(thunks.getDiseasesIpdOut.rejected, (state, action) => {
        state.diseasesIpdOut.status = "FAIL";
        state.diseasesIpdOut.error = action.payload;
      })
      // Create Disease
      .addCase(thunks.createDisease.pending, (state) => {
        state.create.status = "LOADING";
      })
      .addCase(thunks.createDisease.fulfilled, (state, action) => {
        state.create.status = "SUCCESS";
        state.create.data = action.payload;
      })
      .addCase(thunks.createDisease.rejected, (state, action) => {
        state.create.status = "FAIL";
        state.create.error = action.payload;
      })
      // Update Disease
      .addCase(thunks.updateDisease.pending, (state) => {
        state.update.status = "LOADING";
      })
      .addCase(thunks.updateDisease.fulfilled, (state, action) => {
        state.update.status = "SUCCESS";
        state.update.data = action.payload;
      })
      .addCase(thunks.updateDisease.rejected, (state, action) => {
        state.update.status = "FAIL";
        state.update.error = action.payload;
      }),
});

export const { createDiseaseReset, updateDiseaseReset } = diseaseSlice.actions;
