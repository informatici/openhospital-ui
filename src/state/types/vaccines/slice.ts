import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { isEmpty } from "lodash";

export const vaccineTypeSlice = createSlice({
  name: "vaccineTypes",
  initialState: initial,
  reducers: {
    createVaccineTypeReset: (state) => {
      state.create = initial.create;
    },
    updateVaccineTypeReset: (state) => {
      state.update = initial.update;
    },
    deleteVaccineTypeReset: (state) => {
      state.delete = initial.delete;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Vaccine Types
      .addCase(thunks.getVaccineTypes.pending, (state) => {
        state.getVaccineTypes.status = "LOADING";
      })
      .addCase(thunks.getVaccineTypes.fulfilled, (state, action) => {
        state.getVaccineTypes.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getVaccineTypes.data = action.payload;
      })
      .addCase(thunks.getVaccineTypes.rejected, (state, action) => {
        state.getVaccineTypes.status = "FAIL";
        state.getVaccineTypes.error = action.payload;
      })
      // Create Vaccine Type
      .addCase(thunks.createVaccineType.pending, (state) => {
        state.create.status = "LOADING";
      })
      .addCase(thunks.createVaccineType.fulfilled, (state, action) => {
        state.create.status = "SUCCESS";
        state.create.data = action.payload;
      })
      .addCase(thunks.createVaccineType.rejected, (state, action) => {
        state.create.status = "FAIL";
        state.create.error = action.payload;
      })
      // Update Vaccine Type
      .addCase(thunks.updateVaccineType.pending, (state) => {
        state.update.status = "LOADING";
      })
      .addCase(thunks.updateVaccineType.fulfilled, (state, action) => {
        state.update.status = "SUCCESS";
        state.update.data = action.payload;
      })
      .addCase(thunks.updateVaccineType.rejected, (state, action) => {
        state.update.status = "FAIL";
        state.update.error = action.payload;
      })
      // Delete Vaccine Type
      .addCase(thunks.deleteVaccineType.pending, (state) => {
        state.delete.status = "LOADING";
      })
      .addCase(thunks.deleteVaccineType.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
      })
      .addCase(thunks.deleteVaccineType.rejected, (state, action) => {
        state.delete.status = "FAIL";
        state.delete.error = action.payload;
      }),
});

export const {
  createVaccineTypeReset,
  updateVaccineTypeReset,
  deleteVaccineTypeReset,
} = vaccineTypeSlice.actions;
