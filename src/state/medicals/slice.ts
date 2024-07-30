import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
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
        state.medicalsOrderByName.status = "LOADING";
      })
      .addCase(thunks.getMedicals.fulfilled, (state, action) => {
        state.medicalsOrderByName.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.medicalsOrderByName.data = action.payload;
      })
      .addCase(thunks.getMedicals.rejected, (state, action) => {
        state.medicalsOrderByName.status = "FAIL";
        state.medicalsOrderByName.error = action.payload;
      })
      // Create Medical
      .addCase(thunks.createMedical.pending, (state) => {
        state.create.status = "LOADING";
      })
      .addCase(thunks.createMedical.fulfilled, (state, action) => {
        state.create.status = "SUCCESS";
        state.create.data = action.payload;
      })
      .addCase(thunks.createMedical.rejected, (state, action) => {
        state.create.status = "FAIL";
        state.create.error = action.payload;
      })
      // Update Medical
      .addCase(thunks.updateMedical.pending, (state) => {
        state.update.status = "LOADING";
      })
      .addCase(thunks.updateMedical.fulfilled, (state, action) => {
        state.update.status = "SUCCESS";
        state.update.data = action.payload;
      })
      .addCase(thunks.updateMedical.rejected, (state, action) => {
        state.update.status = "FAIL";
        state.update.error = action.payload;
      })
      // Delete Medical
      .addCase(thunks.deleteMedical.pending, (state) => {
        state.delete.status = "LOADING";
      })
      .addCase(thunks.deleteMedical.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
      })
      .addCase(thunks.deleteMedical.rejected, (state, action) => {
        state.delete.status = "FAIL";
        state.delete.error = action.payload;
      }),
});

export const { createMedicalReset, updateMedicalReset, deleteMedicalReset } =
  medicalSlice.actions;
