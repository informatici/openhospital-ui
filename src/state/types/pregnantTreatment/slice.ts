import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { isEmpty } from "lodash";

export const pregnantTreatmentTypeSlice = createSlice({
  name: "pregnantTreatmentTypes",
  initialState: initial,
  reducers: {
    createPregnantTreatmentTypeReset: (state) => {
      state.create = initial.create;
    },
    updatePregnantTreatmentTypeReset: (state) => {
      state.update = initial.update;
    },
    deletePregnantTreatmentTypeReset: (state) => {
      state.delete = initial.delete;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Pregnant Treatment Types
      .addCase(thunks.getPregnantTreatmentTypes.pending, (state) => {
        state.getAll.status = "LOADING";
      })
      .addCase(thunks.getPregnantTreatmentTypes.fulfilled, (state, action) => {
        state.getAll.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getAll.data = action.payload;
      })
      .addCase(thunks.getPregnantTreatmentTypes.rejected, (state, action) => {
        state.getAll.status = "FAIL";
        state.getAll.error = action.payload;
      })
      // Create Pregnant Treatment Type
      .addCase(thunks.createPregnantTreatmentType.pending, (state) => {
        state.create.status = "LOADING";
      })
      .addCase(
        thunks.createPregnantTreatmentType.fulfilled,
        (state, action) => {
          state.create.status = "SUCCESS";
          state.create.data = action.payload;
        }
      )
      .addCase(thunks.createPregnantTreatmentType.rejected, (state, action) => {
        state.create.status = "FAIL";
        state.create.error = action.payload;
      })
      // Update Pregnant Treatment Type
      .addCase(thunks.updatePregnantTreatmentType.pending, (state) => {
        state.update.status = "LOADING";
      })
      .addCase(
        thunks.updatePregnantTreatmentType.fulfilled,
        (state, action) => {
          state.update.status = "SUCCESS";
          state.update.data = action.payload;
        }
      )
      .addCase(thunks.updatePregnantTreatmentType.rejected, (state, action) => {
        state.update.status = "FAIL";
        state.update.error = action.payload;
      })
      // Delete Pregnant Treatment Type
      .addCase(thunks.deletePregnantTreatmentType.pending, (state) => {
        state.delete.status = "LOADING";
      })
      .addCase(
        thunks.deletePregnantTreatmentType.fulfilled,
        (state, action) => {
          state.delete.status = "SUCCESS";
        }
      )
      .addCase(thunks.deletePregnantTreatmentType.rejected, (state, action) => {
        state.delete.status = "FAIL";
        state.delete.error = action.payload;
      }),
});

export const {
  createPregnantTreatmentTypeReset,
  updatePregnantTreatmentTypeReset,
  deletePregnantTreatmentTypeReset,
} = pregnantTreatmentTypeSlice.actions;
