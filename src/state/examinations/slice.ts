import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
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
        state.examinationsByPatientId.status = "LOADING";
      })
      .addCase(thunks.examinationsByPatientId.fulfilled, (state, action) => {
        state.examinationsByPatientId.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.examinationsByPatientId.data = action.payload;
      })
      .addCase(thunks.examinationsByPatientId.rejected, (state, action) => {
        state.examinationsByPatientId.status = "FAIL";
        state.examinationsByPatientId.error = action.payload;
      })
      // Get Default Patient Examination
      .addCase(thunks.getDefaultPatientExamination.pending, (state) => {
        state.getDefaultPatientExamination.status = "LOADING";
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
        state.getLastByPatientId.status = "LOADING";
      })
      .addCase(thunks.getLastByPatientId.fulfilled, (state, action) => {
        state.getLastByPatientId.status = "SUCCESS";
        state.getLastByPatientId.data = action.payload;
      })
      .addCase(thunks.getLastByPatientId.rejected, (state, action) => {
        state.getLastByPatientId.status = "FAIL";
        state.getLastByPatientId.error = action.payload;
      })
      // Create Examination
      .addCase(thunks.createExamination.pending, (state) => {
        state.createExamination.status = "LOADING";
      })
      .addCase(thunks.createExamination.fulfilled, (state, action) => {
        state.createExamination.status = "SUCCESS";
        state.updateExamination.data = action.payload;
      })
      .addCase(thunks.createExamination.rejected, (state, action) => {
        state.createExamination.status = "FAIL";
        state.createExamination.error = action.payload;
      })
      // Update Examination
      .addCase(thunks.updateExamination.pending, (state) => {
        state.updateExamination.status = "LOADING";
      })
      .addCase(thunks.updateExamination.fulfilled, (state, action) => {
        state.updateExamination.status = "SUCCESS";
        state.updateExamination.data = action.payload;
      })
      .addCase(thunks.updateExamination.rejected, (state, action) => {
        state.updateExamination.status = "FAIL";
        state.updateExamination.error = action.payload;
      })
      // Update Examination
      .addCase(thunks.deleteExamination.pending, (state) => {
        state.deleteExamination.status = "LOADING";
      })
      .addCase(thunks.deleteExamination.fulfilled, (state, action) => {
        state.deleteExamination.status = "SUCCESS";
        state.deleteExamination.data = action.payload as any;
      })
      .addCase(thunks.deleteExamination.rejected, (state, action) => {
        state.deleteExamination.status = "FAIL";
        state.deleteExamination.error = action.payload;
      }),
});

export const {
  createExaminationReset,
  updateExaminationReset,
  deleteExaminationReset,
} = examinationSlice.actions;
