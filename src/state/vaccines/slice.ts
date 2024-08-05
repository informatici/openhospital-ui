import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
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
        state.vaccineList = ApiResponse.loading();
      })
      .addCase(thunks.getVaccines.fulfilled, (state, action) => {
        state.vaccineList = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getVaccines.rejected, (state, action) => {
        state.vaccineList = ApiResponse.error(action.payload);
      })
      // Create Vaccine
      .addCase(thunks.createVaccine.pending, (state) => {
        state.create = ApiResponse.loading();
      })
      .addCase(thunks.createVaccine.fulfilled, (state, action) => {
        state.create = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createVaccine.rejected, (state, action) => {
        state.create = ApiResponse.error(action.payload);
      })
      // Update Vaccine
      .addCase(thunks.updateVaccine.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(thunks.updateVaccine.fulfilled, (state, action) => {
        state.update = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateVaccine.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      })
      // Delete Vaccine
      .addCase(thunks.deleteVaccine.pending, (state) => {
        state.delete = ApiResponse.loading();
      })
      .addCase(thunks.deleteVaccine.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
      })
      .addCase(thunks.deleteVaccine.rejected, (state, action) => {
        state.delete = ApiResponse.error(action.payload);
      }),
});

export const { createVaccineReset, updateVaccineReset, deleteVaccineReset } =
  vaccineSlice.actions;
