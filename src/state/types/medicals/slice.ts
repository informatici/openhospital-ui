import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
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
        state.getAll.status = "LOADING";
      })
      .addCase(thunks.getMedicalTypes.fulfilled, (state, action) => {
        state.getAll.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getAll.data = action.payload;
      })
      .addCase(thunks.getMedicalTypes.rejected, (state, action) => {
        state.getAll.status = "FAIL";
        state.getAll.error = action.payload;
      })
      // Create Medical Type
      .addCase(thunks.createMedicalType.pending, (state) => {
        state.create.status = "LOADING";
      })
      .addCase(thunks.createMedicalType.fulfilled, (state, action) => {
        state.create.status = "SUCCESS";
        state.create.data = action.payload;
      })
      .addCase(thunks.createMedicalType.rejected, (state, action) => {
        state.create.status = "FAIL";
        state.create.error = action.payload;
      })
      // Update Medical Type
      .addCase(thunks.updateMedicalType.pending, (state) => {
        state.update.status = "LOADING";
      })
      .addCase(thunks.updateMedicalType.fulfilled, (state, action) => {
        state.update.status = "SUCCESS";
        state.update.data = action.payload;
      })
      .addCase(thunks.updateMedicalType.rejected, (state, action) => {
        state.update.status = "FAIL";
        state.update.error = action.payload;
      })
      // Delete Medical Type
      .addCase(thunks.deleteMedicalType.pending, (state) => {
        state.delete.status = "LOADING";
      })
      .addCase(thunks.deleteMedicalType.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
        state.getAll.data = state.getAll.data?.filter((e) => {
          return e.code !== action.payload.code;
        });
      })
      .addCase(thunks.deleteMedicalType.rejected, (state, action) => {
        state.delete.status = "FAIL";
        state.delete.error = action.payload;
      }),
});

export const {
  createMedicalTypeReset,
  updateMedicalTypeReset,
  deleteMedicalTypeReset,
} = medicalTypeSlice.actions;
