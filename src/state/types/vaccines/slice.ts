import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
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
        state.getVaccineTypes = ApiResponse.loading();
      })
      .addCase(thunks.getVaccineTypes.fulfilled, (state, action) => {
        state.getVaccineTypes = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getVaccineTypes.rejected, (state, action) => {
        state.getVaccineTypes = ApiResponse.error(action.payload);
      })
      // Create Vaccine Type
      .addCase(thunks.createVaccineType.pending, (state) => {
        state.create = ApiResponse.loading();
      })
      .addCase(thunks.createVaccineType.fulfilled, (state, action) => {
        state.create = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createVaccineType.rejected, (state, action) => {
        state.create = ApiResponse.error(action.payload);
      })
      // Update Vaccine Type
      .addCase(thunks.updateVaccineType.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(thunks.updateVaccineType.fulfilled, (state, action) => {
        state.update = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateVaccineType.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      })
      // Delete Vaccine Type
      .addCase(thunks.deleteVaccineType.pending, (state) => {
        state.delete = ApiResponse.loading();
      })
      .addCase(thunks.deleteVaccineType.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
        state.getVaccineTypes.data = state.getVaccineTypes.data?.filter((e) => {
          return e.code !== action.payload.code;
        });
      })
      .addCase(thunks.deleteVaccineType.rejected, (state, action) => {
        state.delete = ApiResponse.error(action.payload);
      }),
});

export const {
  createVaccineTypeReset,
  updateVaccineTypeReset,
  deleteVaccineTypeReset,
} = vaccineTypeSlice.actions;
