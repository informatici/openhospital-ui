import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
import { isEmpty } from "lodash";

export const examinationSlice = createSlice({
  name: "examinations",
  initialState: initial,
  reducers: {
    createExaminationReset: (state) => {
      state.createExamination = initial.createExamination;
    },
    updateExaminationReset: (state) => {
      state.updateExamination = initial.updateExamination;
    },
    deleteExaminationReset: (state) => {
      state.deleteExamination = initial.deleteExamination;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Examinations By Patient ID
      .addCase(thunks.examinationsByPatientId.pending, (state) => {
        state.examinationsByPatientId = ApiResponse.loading();
      })
      .addCase(thunks.examinationsByPatientId.fulfilled, (state, action) => {
        state.examinationsByPatientId = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.examinationsByPatientId.rejected, (state, action) => {
        state.examinationsByPatientId = ApiResponse.error(action.payload);
      })
      // Get Default Patient Examination
      .addCase(thunks.getDefaultPatientExamination.pending, (state) => {
        state.getDefaultPatientExamination = ApiResponse.loading();
      })
      .addCase(
        thunks.getDefaultPatientExamination.fulfilled,
        (state, action) => {
          state.getDefaultPatientExamination.status = "SUCCESS";
          state.getDefaultPatientExamination.data = action.payload;
        }
      )
      .addCase(
        thunks.getDefaultPatientExamination.rejected,
        (state, action) => {
          state.getDefaultPatientExamination.status = "FAIL";
          state.getDefaultPatientExamination.error = action.payload;
        }
      )
      // Get Last Examination By Patient ID
      .addCase(thunks.getLastByPatientId.pending, (state) => {
        state.getLastByPatientId = ApiResponse.loading();
      })
      .addCase(thunks.getLastByPatientId.fulfilled, (state, action) => {
        state.getLastByPatientId = ApiResponse.value(action.payload);
      })
      .addCase(thunks.getLastByPatientId.rejected, (state, action) => {
        state.getLastByPatientId = ApiResponse.error(action.payload);
      })
      // Create Examination
      .addCase(thunks.createExamination.pending, (state) => {
        state.createExamination = ApiResponse.loading();
      })
      .addCase(thunks.createExamination.fulfilled, (state, action) => {
        state.createExamination = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createExamination.rejected, (state, action) => {
        state.createExamination = ApiResponse.error(action.payload);
      })
      // Update Examination
      .addCase(thunks.updateExamination.pending, (state) => {
        state.updateExamination = ApiResponse.loading();
      })
      .addCase(thunks.updateExamination.fulfilled, (state, action) => {
        state.updateExamination = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateExamination.rejected, (state, action) => {
        state.updateExamination = ApiResponse.error(action.payload);
      })
      // Update Examination
      .addCase(thunks.deleteExamination.pending, (state) => {
        state.deleteExamination = ApiResponse.loading();
      })
      .addCase(thunks.deleteExamination.fulfilled, (state, action) => {
        state.deleteExamination.status = "SUCCESS";
        state.deleteExamination.data = action.payload as any;
      })
      .addCase(thunks.deleteExamination.rejected, (state, action) => {
        state.deleteExamination = ApiResponse.error(action.payload);
      }),
});

export const {
  createExaminationReset,
  updateExaminationReset,
  deleteExaminationReset,
} = examinationSlice.actions;
