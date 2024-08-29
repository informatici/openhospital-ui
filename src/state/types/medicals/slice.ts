import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
import { isEmpty } from "lodash";

export const medicalTypeSlice = createSlice({
  name: "medicalTypes",
  initialState: initial,
  reducers: {
    createMedicalTypeReset: (state) => {
      state.create = initial.create;
    },
    updateMedicalTypeReset: (state) => {
      state.update = initial.update;
    },
    deleteMedicalTypeReset: (state) => {
      state.delete = initial.delete;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Medical Types
      .addCase(thunks.getMedicalTypes.pending, (state) => {
        state.getAll = ApiResponse.loading();
      })
      .addCase(thunks.getMedicalTypes.fulfilled, (state, action) => {
        state.getAll = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getMedicalTypes.rejected, (state, action) => {
        state.getAll = ApiResponse.error(action.payload);
      })
      // Create Medical Type
      .addCase(thunks.createMedicalType.pending, (state) => {
        state.create = ApiResponse.loading();
      })
      .addCase(thunks.createMedicalType.fulfilled, (state, action) => {
        state.create = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createMedicalType.rejected, (state, action) => {
        state.create = ApiResponse.error(action.payload);
      })
      // Update Medical Type
      .addCase(thunks.updateMedicalType.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(thunks.updateMedicalType.fulfilled, (state, action) => {
        state.update = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateMedicalType.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      })
      // Delete Medical Type
      .addCase(thunks.deleteMedicalType.pending, (state) => {
        state.delete = ApiResponse.loading();
      })
      .addCase(thunks.deleteMedicalType.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
        state.getAll.data = state.getAll.data?.filter((e) => {
          return e.code !== action.payload.code;
        });
      })
      .addCase(thunks.deleteMedicalType.rejected, (state, action) => {
        state.delete = ApiResponse.error(action.payload);
      }),
});

export const {
  createMedicalTypeReset,
  updateMedicalTypeReset,
  deleteMedicalTypeReset,
} = medicalTypeSlice.actions;
