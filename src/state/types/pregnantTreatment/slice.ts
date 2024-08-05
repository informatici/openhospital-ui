import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
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
        state.getAll = ApiResponse.loading();
      })
      .addCase(thunks.getPregnantTreatmentTypes.fulfilled, (state, action) => {
        state.getAll = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getPregnantTreatmentTypes.rejected, (state, action) => {
        state.getAll = ApiResponse.error(action.payload);
      })
      // Create Pregnant Treatment Type
      .addCase(thunks.createPregnantTreatmentType.pending, (state) => {
        state.create = ApiResponse.loading();
      })
      .addCase(
        thunks.createPregnantTreatmentType.fulfilled,
        (state, action) => {
          state.create.status = "SUCCESS";
          state.create.data = action.payload;
        }
      )
      .addCase(thunks.createPregnantTreatmentType.rejected, (state, action) => {
        state.create = ApiResponse.error(action.payload);
      })
      // Update Pregnant Treatment Type
      .addCase(thunks.updatePregnantTreatmentType.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(
        thunks.updatePregnantTreatmentType.fulfilled,
        (state, action) => {
          state.update.status = "SUCCESS";
          state.update.data = action.payload;
        }
      )
      .addCase(thunks.updatePregnantTreatmentType.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      })
      // Delete Pregnant Treatment Type
      .addCase(thunks.deletePregnantTreatmentType.pending, (state) => {
        state.delete = ApiResponse.loading();
      })
      .addCase(
        thunks.deletePregnantTreatmentType.fulfilled,
        (state, action) => {
          state.delete.status = "SUCCESS";
          state.getAll.data = state.getAll.data?.filter((e) => {
            return e.code !== action.payload.code;
          });
        }
      )
      .addCase(thunks.deletePregnantTreatmentType.rejected, (state, action) => {
        state.delete = ApiResponse.error(action.payload);
      }),
});

export const {
  createPregnantTreatmentTypeReset,
  updatePregnantTreatmentTypeReset,
  deletePregnantTreatmentTypeReset,
} = pregnantTreatmentTypeSlice.actions;
