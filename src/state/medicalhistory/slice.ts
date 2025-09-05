import { createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "state/types";
import { initial } from "./initial";
import * as thunks from "./thunk";

export const medicalHistorySlice = createSlice({
  name: "medicalHistory",
  initialState: initial,
  reducers: {
    createMedicalHistoryReset: (state) => {
      state.createMedicalHistory = initial.createMedicalHistory;
    },
    updateMedicalHistoryReset: (state) => {
      state.updateMedicalHistory = initial.updateMedicalHistory;
    },
    getMedicalHistoryByIdReset: (state) => {
      state.getMedicalHistoryById = initial.getMedicalHistoryById;
    },
    getMedicalHistoryByPatientCodeReset: (state) => {
      state.getMedicalHistoryByPatientCode =
        initial.getMedicalHistoryByPatientCode;
    },
  },
  extraReducers: (builder) =>
    builder
      // Create Medical history
      .addCase(thunks.createMedicalHistory.pending, (state) => {
        state.createMedicalHistory = ApiResponse.loading();
      })
      .addCase(thunks.createMedicalHistory.fulfilled, (state, action) => {
        state.createMedicalHistory = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createMedicalHistory.rejected, (state, action) => {
        state.createMedicalHistory = ApiResponse.error(action.payload);
      })
      // Update Medical history
      .addCase(thunks.updateMedicalHistory.pending, (state) => {
        state.updateMedicalHistory = ApiResponse.loading();
      })
      .addCase(thunks.updateMedicalHistory.fulfilled, (state, action) => {
        state.updateMedicalHistory = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateMedicalHistory.rejected, (state, action) => {
        state.updateMedicalHistory = ApiResponse.error(action.payload);
      })
      // Get Medical history by id
      .addCase(thunks.getMedicalHistoryById.pending, (state) => {
        state.getMedicalHistoryById = ApiResponse.loading();
      })
      .addCase(thunks.getMedicalHistoryById.fulfilled, (state, action) => {
        state.getMedicalHistoryById.status = "SUCCESS";
      })
      .addCase(thunks.getMedicalHistoryById.rejected, (state, action) => {
        state.getMedicalHistoryById = ApiResponse.error(action.payload);
      })
      // Get Medical histories by patient code
      .addCase(thunks.getMedicalHistoryByPatientCode.pending, (state) => {
        state.getMedicalHistoryByPatientCode = ApiResponse.loading();
      })
      .addCase(
        thunks.getMedicalHistoryByPatientCode.fulfilled,
        (state, action) => {
          state.getMedicalHistoryByPatientCode = ApiResponse.value(
            action.payload
          );
        }
      )
      .addCase(
        thunks.getMedicalHistoryByPatientCode.rejected,
        (state, action) => {
          state.getMedicalHistoryByPatientCode = ApiResponse.error(
            action.payload
          );
        }
      ),
});

export const {
  createMedicalHistoryReset,
  updateMedicalHistoryReset,
  getMedicalHistoryByIdReset,
  getMedicalHistoryByPatientCodeReset,
} = medicalHistorySlice.actions;
