import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { isEmpty } from "lodash";

export const laboratorySlice = createSlice({
  name: "laboratories",
  initialState: initial,
  reducers: {
    createLabReset: (state) => {
      state.createLab = initial.createLab;
    },
    createLabRequestReset: (state) => {
      state.createLabRequest = initial.createLabRequest;
    },
    updateLabReset: (state) => {
      state.updateLab = initial.updateLab;
    },
    updateLabStatusReset: (state) => {
      state.updateLab = initial.updateLab;
    },
    deleteLabReset: (state) => {
      state.deleteLab = initial.deleteLab;
    },
    cancelLabReset: (state) => {
      state.cancelLab = initial.cancelLab;
    },
    searchLabsReset: (state) => {
      state.searchLabs = initial.searchLabs;
    },
    getLabsReset: (state) => {
      state.labsByPatientId = initial.labsByPatientId;
    },
    getLabByCodeReset: (state) => {
      state.getLabByCode = initial.getLabByCode;
    },
    getLabWithRowsByCodeReset: (state) => {
      state.getLabWithRowsByCode = initial.getLabWithRowsByCode;
    },
  },
  extraReducers: (builder) =>
    builder
      // Search labs
      .addCase(thunks.searchLabs.pending, (state) => {
        state.searchLabs.status = "LOADING";
      })
      .addCase(thunks.searchLabs.fulfilled, (state, action) => {
        state.searchLabs.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.searchLabs.data = action.payload;
      })
      .addCase(thunks.searchLabs.rejected, (state, action) => {
        state.searchLabs.status = "FAIL";
        state.searchLabs.error = action.payload;
      })
      // Get Labs By Patient ID
      .addCase(thunks.getLabsByPatientId.pending, (state) => {
        state.labsByPatientId.status = "LOADING";
      })
      .addCase(thunks.getLabsByPatientId.fulfilled, (state, action) => {
        state.labsByPatientId.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.labsByPatientId.data = action.payload as any;
      })
      .addCase(thunks.getLabsByPatientId.rejected, (state, action) => {
        state.labsByPatientId.status = "FAIL";
        state.labsByPatientId.error = action.payload;
      })
      // Get Lab By Code
      .addCase(thunks.getLabByCode.pending, (state) => {
        state.getLabByCode.status = "LOADING";
      })
      .addCase(thunks.getLabByCode.fulfilled, (state, action) => {
        state.getLabByCode.status = "SUCCESS";
        state.getLabByCode.data = action.payload?.[0]?.laboratoryDTO;
      })
      .addCase(thunks.getLabByCode.rejected, (state, action) => {
        state.getLabByCode.status = "FAIL";
        state.getLabByCode.error = action.payload;
      })
      // Get Lab With Row By Code
      .addCase(thunks.getLabWithRowsByCode.pending, (state) => {
        state.getLabWithRowsByCode.status = "LOADING";
      })
      .addCase(thunks.getLabWithRowsByCode.fulfilled, (state, action) => {
        state.getLabWithRowsByCode.status = "SUCCESS";
        state.getLabWithRowsByCode.data = action.payload;
      })
      .addCase(thunks.getLabWithRowsByCode.rejected, (state, action) => {
        state.getLabWithRowsByCode.status = "FAIL";
        state.getLabWithRowsByCode.error = action.payload;
      })
      // Create Lab
      .addCase(thunks.createLab.pending, (state) => {
        state.createLab.status = "LOADING";
      })
      .addCase(thunks.createLab.fulfilled, (state, action) => {
        state.createLab.status = "SUCCESS";
        state.createLab.data = action.payload;
      })
      .addCase(thunks.createLab.rejected, (state, action) => {
        state.createLab.status = "FAIL";
        state.createLab.error = action.payload;
      })
      // Create Lab Request
      .addCase(thunks.createLabRequest.pending, (state) => {
        state.createLabRequest.status = "LOADING";
      })
      .addCase(thunks.createLabRequest.fulfilled, (state, action) => {
        state.createLabRequest.status = "SUCCESS";
        state.createLabRequest.data = action.payload;
      })
      .addCase(thunks.createLabRequest.rejected, (state, action) => {
        state.createLabRequest.status = "FAIL";
        state.createLabRequest.error = action.payload;
      })
      // Update Lab Status
      .addCase(thunks.updateLabStatus.pending, (state) => {
        state.updateLab.status = "LOADING";
      })
      .addCase(thunks.updateLab.fulfilled, (state, action) => {
        state.updateLab.status = "SUCCESS";
        state.updateLab.data = action.payload;
      })
      .addCase(thunks.updateLab.rejected, (state, action) => {
        state.updateLab.status = "FAIL";
        state.updateLab.error = action.payload;
      })
      // Update Lab
      .addCase(thunks.updateLab.pending, (state) => {
        state.updateLab.status = "LOADING";
      })
      .addCase(thunks.updateLab.fulfilled, (state, action) => {
        state.updateLab.status = "SUCCESS";
        state.updateLab.data = action.payload;
      })
      .addCase(thunks.updateLab.rejected, (state, action) => {
        state.updateLab.status = "FAIL";
        state.updateLab.error = action.payload;
      })
      // Cancel Lab
      .addCase(thunks.cancelLab.pending, (state) => {
        state.cancelLab.status = "LOADING";
      })
      .addCase(thunks.cancelLab.fulfilled, (state, action) => {
        state.cancelLab.status = "SUCCESS";
      })
      .addCase(thunks.cancelLab.rejected, (state, action) => {
        state.cancelLab.status = "FAIL";
        state.cancelLab.error = action.payload;
      })
      // Delete Lab
      .addCase(thunks.deleteLab.pending, (state) => {
        state.deleteLab.status = "LOADING";
      })
      .addCase(thunks.deleteLab.fulfilled, (state, action) => {
        state.deleteLab.status = "SUCCESS";
      })
      .addCase(thunks.deleteLab.rejected, (state, action) => {
        state.deleteLab.status = "FAIL";
        state.deleteLab.error = action.payload;
      }),
});

export const {
  createLabReset,
  createLabRequestReset,
  updateLabReset,
  updateLabStatusReset,
  cancelLabReset,
  deleteLabReset,
  searchLabsReset,
  getLabsReset,
  getLabByCodeReset,
  getLabWithRowsByCodeReset,
} = laboratorySlice.actions;
