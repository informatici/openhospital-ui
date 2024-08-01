import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { isEmpty } from "lodash";

export const examTypeSlice = createSlice({
  name: "examTypes",
  initialState: initial,
  reducers: {
    createExamTypeReset: (state) => {
      state.create = initial.create;
    },
    updateExamTypeReset: (state) => {
      state.update = initial.update;
    },
    deleteExamTypeReset: (state) => {
      state.delete = initial.delete;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Exam Types
      .addCase(thunks.getExamTypes.pending, (state) => {
        state.getAll.status = "LOADING";
      })
      .addCase(thunks.getExamTypes.fulfilled, (state, action) => {
        state.getAll.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getAll.data = action.payload;
      })
      .addCase(thunks.getExamTypes.rejected, (state, action) => {
        state.getAll.status = "FAIL";
        state.getAll.error = action.payload;
      })
      // Create Exam Type
      .addCase(thunks.createExamType.pending, (state) => {
        state.create.status = "LOADING";
      })
      .addCase(thunks.createExamType.fulfilled, (state, action) => {
        state.create.status = "SUCCESS";
        state.create.data = action.payload;
      })
      .addCase(thunks.createExamType.rejected, (state, action) => {
        state.create.status = "FAIL";
        state.create.error = action.payload;
      })
      // Update Exam Type
      .addCase(thunks.updateExamType.pending, (state) => {
        state.update.status = "LOADING";
      })
      .addCase(thunks.updateExamType.fulfilled, (state, action) => {
        state.update.status = "SUCCESS";
        state.update.data = action.payload;
      })
      .addCase(thunks.updateExamType.rejected, (state, action) => {
        state.update.status = "FAIL";
        state.update.error = action.payload;
      })
      // Delete Exam Type
      .addCase(thunks.deleteExamType.pending, (state) => {
        state.delete.status = "LOADING";
      })
      .addCase(thunks.deleteExamType.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
        state.getAll.data = state.getAll.data?.filter((e) => {
          return e.code !== action.payload.code;
        });
      })
      .addCase(thunks.deleteExamType.rejected, (state, action) => {
        state.delete.status = "FAIL";
        state.delete.error = action.payload;
      }),
});

export const { createExamTypeReset, updateExamTypeReset, deleteExamTypeReset } =
  examTypeSlice.actions;
