import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { isEmpty } from "lodash";

export const admissionTypeSlice = createSlice({
  name: "admissionTypes",
  initialState: initial,
  reducers: {
    createAdmissionTypeReset: (state) => {
      state.create = initial.create;
    },
    updateAdmissionTypeReset: (state) => {
      state.update = initial.update;
    },
    deleteAdmissionTypeReset: (state) => {
      state.delete = initial.delete;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Admission Types
      .addCase(thunks.getAdmissionTypes.pending, (state) => {
        state.getAll.status = "LOADING";
      })
      .addCase(thunks.getAdmissionTypes.fulfilled, (state, action) => {
        state.getAll.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getAll.data = action.payload;
      })
      .addCase(thunks.getAdmissionTypes.rejected, (state, action) => {
        state.getAll.status = "FAIL";
        state.getAll.error = action.payload;
      })
      // Create Admission Type
      .addCase(thunks.createAdmissionType.pending, (state) => {
        state.create.status = "LOADING";
      })
      .addCase(thunks.createAdmissionType.fulfilled, (state, action) => {
        state.create.status = "SUCCESS";
        state.create.data = action.payload;
      })
      .addCase(thunks.createAdmissionType.rejected, (state, action) => {
        state.create.status = "FAIL";
        state.create.error = action.payload;
      })
      // Update Admission Type
      .addCase(thunks.updateAdmissionType.pending, (state) => {
        state.update.status = "LOADING";
      })
      .addCase(thunks.updateAdmissionType.fulfilled, (state, action) => {
        state.update.status = "SUCCESS";
        state.update.data = action.payload;
      })
      .addCase(thunks.updateAdmissionType.rejected, (state, action) => {
        state.update.status = "FAIL";
        state.update.error = action.payload;
      })
      // Delete Admission Type
      .addCase(thunks.deleteAdmissionType.pending, (state) => {
        state.delete.status = "LOADING";
      })
      .addCase(thunks.deleteAdmissionType.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
      })
      .addCase(thunks.deleteAdmissionType.rejected, (state, action) => {
        state.delete.status = "FAIL";
        state.delete.error = action.payload;
      }),
});

export const {
  createAdmissionTypeReset,
  updateAdmissionTypeReset,
  deleteAdmissionTypeReset,
} = admissionTypeSlice.actions;
