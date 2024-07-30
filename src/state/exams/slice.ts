import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { isEmpty } from "lodash";

export const examSlice = createSlice({
  name: "exams",
  initialState: initial,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // Get Exams
      .addCase(thunks.getExams.pending, (state) => {
        state.examList.status = "LOADING";
      })
      .addCase(thunks.getExams.fulfilled, (state, action) => {
        state.examList.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.examList.data = action.payload;
      })
      .addCase(thunks.getExams.rejected, (state, action) => {
        state.examList.status = "FAIL";
        state.examList.error = action.payload;
      })
      // Get Exams Rows
      .addCase(thunks.getExamRows.pending, (state) => {
        state.examRowsByExamCode.status = "LOADING";
      })
      .addCase(thunks.getExamRows.fulfilled, (state, action) => {
        state.examRowsByExamCode.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.examRowsByExamCode.data = action.payload;
      })
      .addCase(thunks.getExamRows.rejected, (state, action) => {
        state.examRowsByExamCode.status = "FAIL";
        state.examRowsByExamCode.error = action.payload;
      }),
});
