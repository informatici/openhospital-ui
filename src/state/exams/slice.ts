import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
import { isEmpty } from "lodash";

export const examSlice = createSlice({
  name: "exams",
  initialState: initial,
  reducers: {
    createExamReset: (state) => {
      state.examCreate = initial.examCreate;
    },
    updateExamReset: (state) => {
      state.examUpdate = initial.examUpdate;
    },
    deleteExamReset: (state) => {
      state.examDelete = initial.examDelete;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Exams
      .addCase(thunks.getExams.pending, (state) => {
        state.examList = ApiResponse.loading();
      })
      .addCase(thunks.getExams.fulfilled, (state, action) => {
        state.examList = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getExams.rejected, (state, action) => {
        state.examList = ApiResponse.error(action.payload);
      })
      // Get Exams Rows
      .addCase(thunks.getExamRows.pending, (state) => {
        state.examRowsByExamCode = ApiResponse.loading();
      })
      .addCase(thunks.getExamRows.fulfilled, (state, action) => {
        state.examRowsByExamCode = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getExamRows.rejected, (state, action) => {
        state.examRowsByExamCode = ApiResponse.error(action.payload);
      })
      // Create Exam
      .addCase(thunks.createExam.pending, (state) => {
        state.examCreate = ApiResponse.loading();
      })
      .addCase(thunks.createExam.fulfilled, (state, action) => {
        state.examCreate = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createExam.rejected, (state, action) => {
        state.examCreate = ApiResponse.error(action.payload);
      })
      // Update Exam
      .addCase(thunks.updateExam.pending, (state) => {
        state.examUpdate = ApiResponse.loading();
      })
      .addCase(thunks.updateExam.fulfilled, (state, action) => {
        state.examUpdate = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateExam.rejected, (state, action) => {
        state.examUpdate = ApiResponse.error(action.payload);
      })
      // Delete Exam
      .addCase(thunks.deleteExam.pending, (state) => {
        state.examDelete = ApiResponse.loading();
      })
      .addCase(thunks.deleteExam.fulfilled, (state, action) => {
        state.examDelete = ApiResponse.value(action.payload);
      })
      .addCase(thunks.deleteExam.rejected, (state, action) => {
        state.examDelete = ApiResponse.error(action.payload);
      }),
});

export const { createExamReset, updateExamReset, deleteExamReset } =
  examSlice.actions;
