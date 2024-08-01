import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
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
        state.getAll = ApiResponse.loading();
      })
      .addCase(thunks.getExamTypes.fulfilled, (state, action) => {
        state.getAll = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getExamTypes.rejected, (state, action) => {
        state.getAll = ApiResponse.error(action.payload);
      })
      // Create Exam Type
      .addCase(thunks.createExamType.pending, (state) => {
        state.create = ApiResponse.loading();
      })
      .addCase(thunks.createExamType.fulfilled, (state, action) => {
        state.create = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createExamType.rejected, (state, action) => {
        state.create = ApiResponse.error(action.payload);
      })
      // Update Exam Type
      .addCase(thunks.updateExamType.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(thunks.updateExamType.fulfilled, (state, action) => {
        state.update = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateExamType.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      })
      // Delete Exam Type
      .addCase(thunks.deleteExamType.pending, (state) => {
        state.delete = ApiResponse.loading();
      })
      .addCase(thunks.deleteExamType.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
        state.getAll.data = state.getAll.data?.filter((e) => {
          return e.code !== action.payload.code;
        });
      })
      .addCase(thunks.deleteExamType.rejected, (state, action) => {
        state.delete = ApiResponse.error(action.payload);
      }),
});

export const { createExamTypeReset, updateExamTypeReset, deleteExamTypeReset } =
  examTypeSlice.actions;
