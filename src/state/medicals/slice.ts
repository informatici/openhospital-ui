import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
import { isEmpty } from "lodash";

export const medicalSlice = createSlice({
  name: "medicals",
  initialState: initial,
  reducers: {
    createMedicalReset: (state) => {
      state.create = initial.create;
    },
    updateMedicalReset: (state) => {
      state.update = initial.update;
    },
    deleteMedicalReset: (state) => {
      state.delete = initial.delete;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get All Medicals
      .addCase(thunks.getMedicals.pending, (state) => {
        state.medicalsOrderByName = ApiResponse.loading();
      })
      .addCase(thunks.getMedicals.fulfilled, (state, action) => {
        state.medicalsOrderByName = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getMedicals.rejected, (state, action) => {
        state.medicalsOrderByName = ApiResponse.error(action.payload);
      })
      // Create Medical
      .addCase(thunks.createMedical.pending, (state) => {
        state.create = ApiResponse.loading();
      })
      .addCase(thunks.createMedical.fulfilled, (state, action) => {
        state.create = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createMedical.rejected, (state, action) => {
        state.create = ApiResponse.error(action.payload);
      })
      // Update Medical
      .addCase(thunks.updateMedical.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(thunks.updateMedical.fulfilled, (state, action) => {
        state.update = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateMedical.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      })
      // Delete Medical
      .addCase(thunks.deleteMedical.pending, (state) => {
        state.delete = ApiResponse.loading();
      })
      .addCase(thunks.deleteMedical.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
      })
      .addCase(thunks.deleteMedical.rejected, (state, action) => {
        state.delete = ApiResponse.error(action.payload);
      }),
});

export const { createMedicalReset, updateMedicalReset, deleteMedicalReset } =
  medicalSlice.actions;
