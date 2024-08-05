import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
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
        state.allDiseases = ApiResponse.loading();
      })
      .addCase(thunks.getAllDiseases.fulfilled, (state, action) => {
        state.allDiseases = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getAllDiseases.rejected, (state, action) => {
        state.allDiseases = ApiResponse.error(action.payload);
      })
      // Get Diseases OPD
      .addCase(thunks.getDiseasesOpd.pending, (state) => {
        state.diseasesOpd = ApiResponse.loading();
      })
      .addCase(thunks.getDiseasesOpd.fulfilled, (state, action) => {
        state.diseasesOpd = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getDiseasesOpd.rejected, (state, action) => {
        state.diseasesOpd = ApiResponse.error(action.payload);
      })
      // Get Diseases IPD IN
      .addCase(thunks.getDiseasesIpdIn.pending, (state) => {
        state.diseasesIpdIn = ApiResponse.loading();
      })
      .addCase(thunks.getDiseasesIpdIn.fulfilled, (state, action) => {
        state.diseasesIpdIn = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getDiseasesIpdIn.rejected, (state, action) => {
        state.diseasesIpdIn = ApiResponse.error(action.payload);
      })
      // Get Diseases IPD OUT
      .addCase(thunks.getDiseasesIpdOut.pending, (state) => {
        state.diseasesIpdOut = ApiResponse.loading();
      })
      .addCase(thunks.getDiseasesIpdOut.fulfilled, (state, action) => {
        state.diseasesIpdOut = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getDiseasesIpdOut.rejected, (state, action) => {
        state.diseasesIpdOut = ApiResponse.error(action.payload);
      })
      // Create Disease
      .addCase(thunks.createDisease.pending, (state) => {
        state.create = ApiResponse.loading();
      })
      .addCase(thunks.createDisease.fulfilled, (state, action) => {
        state.create = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createDisease.rejected, (state, action) => {
        state.create = ApiResponse.error(action.payload);
      })
      // Update Disease
      .addCase(thunks.updateDisease.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(thunks.updateDisease.fulfilled, (state, action) => {
        state.update = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateDisease.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      }),
});

export const { createDiseaseReset, updateDiseaseReset } = diseaseSlice.actions;
