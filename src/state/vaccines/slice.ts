import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { isEmpty } from "lodash";

export const vaccineSlice = createSlice({
  name: "vaccines",
  initialState: initial,
  reducers: {
    createVaccineReset: (state) => {
      state.create = initial.create;
    },
    updateVaccineReset: (state) => {
      state.update = initial.update;
    },
    deleteVaccineReset: (state) => {
      state.delete = initial.delete;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Vaccines
      .addCase(thunks.getVaccines.pending, (state) => {
        state.vaccineList.status = "LOADING";
      })
      .addCase(thunks.getVaccines.fulfilled, (state, action) => {
        state.vaccineList.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.vaccineList.data = action.payload;
      })
      .addCase(thunks.getVaccines.rejected, (state, action) => {
        state.vaccineList.status = "FAIL";
        state.vaccineList.error = action.payload;
      })
      // Create Vaccine
      .addCase(thunks.createVaccine.pending, (state) => {
        state.create.status = "LOADING";
      })
      .addCase(thunks.createVaccine.fulfilled, (state, action) => {
        state.create.status = "SUCCESS";
        state.create.data = action.payload;
      })
      .addCase(thunks.createVaccine.rejected, (state, action) => {
        state.create.status = "FAIL";
        state.create.error = action.payload;
      })
      // Update Vaccine
      .addCase(thunks.updateVaccine.pending, (state) => {
        state.update.status = "LOADING";
      })
      .addCase(thunks.updateVaccine.fulfilled, (state, action) => {
        state.update.status = "SUCCESS";
        state.update.data = action.payload;
      })
      .addCase(thunks.updateVaccine.rejected, (state, action) => {
        state.update.status = "FAIL";
        state.update.error = action.payload;
      })
      // Delete Vaccine
      .addCase(thunks.deleteVaccine.pending, (state) => {
        state.delete.status = "LOADING";
      })
      .addCase(thunks.deleteVaccine.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
      })
      .addCase(thunks.deleteVaccine.rejected, (state, action) => {
        state.delete.status = "FAIL";
        state.delete.error = action.payload;
      }),
});

export const { createVaccineReset, updateVaccineReset, deleteVaccineReset } =
  vaccineSlice.actions;
