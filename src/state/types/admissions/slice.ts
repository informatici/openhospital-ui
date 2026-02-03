import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
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
        state.getAll = ApiResponse.loading();
      })
      .addCase(thunks.getAdmissionTypes.fulfilled, (state, action) => {
        state.getAll = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getAdmissionTypes.rejected, (state, action) => {
        state.getAll = ApiResponse.error(action.payload);
      })
      // Create Admission Type
      .addCase(thunks.createAdmissionType.pending, (state) => {
        state.create = ApiResponse.loading();
      })
      .addCase(thunks.createAdmissionType.fulfilled, (state, action) => {
        state.create = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createAdmissionType.rejected, (state, action) => {
        state.create = ApiResponse.error(action.payload);
      })
      // Update Admission Type
      .addCase(thunks.updateAdmissionType.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(thunks.updateAdmissionType.fulfilled, (state, action) => {
        state.update = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateAdmissionType.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      })
      // Delete Admission Type
      .addCase(thunks.deleteAdmissionType.pending, (state) => {
        state.delete = ApiResponse.loading();
      })
      .addCase(thunks.deleteAdmissionType.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
        state.getAll.data = state.getAll.data?.filter((e) => {
          return e.code !== action.payload.code;
        });
      })
      .addCase(thunks.deleteAdmissionType.rejected, (state, action) => {
        state.delete = ApiResponse.error(action.payload);
      }),
});

export const {
  createAdmissionTypeReset,
  updateAdmissionTypeReset,
  deleteAdmissionTypeReset,
} = admissionTypeSlice.actions;
