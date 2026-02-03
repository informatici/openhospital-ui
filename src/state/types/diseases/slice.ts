import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
import { isEmpty } from "lodash";

export const diseaseTypeSlice = createSlice({
  name: "diseaseTypes",
  initialState: initial,
  reducers: {
    createDiseaseTypeReset: (state) => {
      state.create = initial.create;
    },
    updateDiseaseTypeReset: (state) => {
      state.update = initial.update;
    },
    deleteDiseaseTypeReset: (state) => {
      state.delete = initial.delete;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Disease Types
      .addCase(thunks.getDiseaseTypes.pending, (state) => {
        state.getAll = ApiResponse.loading();
      })
      .addCase(thunks.getDiseaseTypes.fulfilled, (state, action) => {
        state.getAll = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getDiseaseTypes.rejected, (state, action) => {
        state.getAll = ApiResponse.error(action.payload);
      })
      // Create Disease Type
      .addCase(thunks.createDiseaseType.pending, (state) => {
        state.create = ApiResponse.loading();
      })
      .addCase(thunks.createDiseaseType.fulfilled, (state, action) => {
        state.create = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createDiseaseType.rejected, (state, action) => {
        state.create = ApiResponse.error(action.payload);
      })
      // Update Disease Type
      .addCase(thunks.updateDiseaseType.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(thunks.updateDiseaseType.fulfilled, (state, action) => {
        state.update = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateDiseaseType.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      })
      // Delete Disease Type
      .addCase(thunks.deleteDiseaseType.pending, (state) => {
        state.delete = ApiResponse.loading();
      })
      .addCase(thunks.deleteDiseaseType.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
        state.getAll.data = state.getAll.data?.filter((e) => {
          return e.code !== action.payload.code;
        });
      })
      .addCase(thunks.deleteDiseaseType.rejected, (state, action) => {
        state.delete = ApiResponse.error(action.payload);
      }),
});

export const {
  createDiseaseTypeReset,
  updateDiseaseTypeReset,
  deleteDiseaseTypeReset,
} = diseaseTypeSlice.actions;
