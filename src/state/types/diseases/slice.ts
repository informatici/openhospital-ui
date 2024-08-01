import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
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
        state.getAll.status = "LOADING";
      })
      .addCase(thunks.getDiseaseTypes.fulfilled, (state, action) => {
        state.getAll.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getAll.data = action.payload;
      })
      .addCase(thunks.getDiseaseTypes.rejected, (state, action) => {
        state.getAll.status = "FAIL";
        state.getAll.error = action.payload;
      })
      // Create Disease Type
      .addCase(thunks.createDiseaseType.pending, (state) => {
        state.create.status = "LOADING";
      })
      .addCase(thunks.createDiseaseType.fulfilled, (state, action) => {
        state.create.status = "SUCCESS";
        state.create.data = action.payload;
      })
      .addCase(thunks.createDiseaseType.rejected, (state, action) => {
        state.create.status = "FAIL";
        state.create.error = action.payload;
      })
      // Update Disease Type
      .addCase(thunks.updateDiseaseType.pending, (state) => {
        state.update.status = "LOADING";
      })
      .addCase(thunks.updateDiseaseType.fulfilled, (state, action) => {
        state.update.status = "SUCCESS";
        state.update.data = action.payload;
      })
      .addCase(thunks.updateDiseaseType.rejected, (state, action) => {
        state.update.status = "FAIL";
        state.update.error = action.payload;
      })
      // Delete Disease Type
      .addCase(thunks.deleteDiseaseType.pending, (state) => {
        state.delete.status = "LOADING";
      })
      .addCase(thunks.deleteDiseaseType.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
        state.getAll.data = state.getAll.data?.filter((e) => {
          return e.code !== action.payload.code;
        });
      })
      .addCase(thunks.deleteDiseaseType.rejected, (state, action) => {
        state.delete.status = "FAIL";
        state.delete.error = action.payload;
      }),
});

export const {
  createDiseaseTypeReset,
  updateDiseaseTypeReset,
  deleteDiseaseTypeReset,
} = diseaseTypeSlice.actions;
