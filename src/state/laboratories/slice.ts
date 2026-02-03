import { createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { ApiResponse } from "state/types";
import { initial } from "./initial";
import * as thunks from "./thunk";

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
        state.searchLabs = ApiResponse.loading();
      })
      .addCase(thunks.searchLabs.fulfilled, (state, action) => {
        state.searchLabs = ApiResponse.value(action.payload);
      })
      .addCase(thunks.searchLabs.rejected, (state, action) => {
        state.searchLabs = ApiResponse.error(action.payload);
      })
      // Get Labs By Patient ID
      .addCase(thunks.getLabsByPatientId.pending, (state) => {
        state.labsByPatientId = ApiResponse.loading();
      })
      .addCase(thunks.getLabsByPatientId.fulfilled, (state, action) => {
        state.labsByPatientId.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.labsByPatientId.data = action.payload as any;
      })
      .addCase(thunks.getLabsByPatientId.rejected, (state, action) => {
        state.labsByPatientId = ApiResponse.error(action.payload);
      })
      // Get Lab Requests By Patient ID
      .addCase(thunks.getLabsRequestByPatientId.pending, (state) => {
        state.labsRequestByPatientId = ApiResponse.loading();
      })
      .addCase(thunks.getLabsRequestByPatientId.fulfilled, (state, action) => {
        state.labsRequestByPatientId.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.labsRequestByPatientId.data = action.payload as any;
      })
      .addCase(thunks.getLabsRequestByPatientId.rejected, (state, action) => {
        state.labsRequestByPatientId = ApiResponse.error(action.payload);
      })
      // Get Lab By Code
      .addCase(thunks.getLabByCode.pending, (state) => {
        state.getLabByCode = ApiResponse.loading();
      })
      .addCase(thunks.getLabByCode.fulfilled, (state, action) => {
        state.getLabByCode.status = "SUCCESS";
        state.getLabByCode.data = action.payload?.[0]?.laboratoryDTO;
      })
      .addCase(thunks.getLabByCode.rejected, (state, action) => {
        state.getLabByCode = ApiResponse.error(action.payload);
      })
      // Get Lab With Row By Code
      .addCase(thunks.getLabWithRowsByCode.pending, (state) => {
        state.getLabWithRowsByCode = ApiResponse.loading();
      })
      .addCase(thunks.getLabWithRowsByCode.fulfilled, (state, action) => {
        state.getLabWithRowsByCode = ApiResponse.value(action.payload);
      })
      .addCase(thunks.getLabWithRowsByCode.rejected, (state, action) => {
        state.getLabWithRowsByCode = ApiResponse.error(action.payload);
      })
      // Create Lab
      .addCase(thunks.createLab.pending, (state) => {
        state.createLab = ApiResponse.loading();
      })
      .addCase(thunks.createLab.fulfilled, (state, action) => {
        state.createLab = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createLab.rejected, (state, action) => {
        state.createLab = ApiResponse.error(action.payload);
      })
      // Create Lab Request
      .addCase(thunks.createLabRequest.pending, (state) => {
        state.createLabRequest = ApiResponse.loading();
      })
      .addCase(thunks.createLabRequest.fulfilled, (state, action) => {
        state.createLabRequest = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createLabRequest.rejected, (state, action) => {
        state.createLabRequest = ApiResponse.error(action.payload);
      })
      // Update Lab Status
      .addCase(thunks.updateLabStatus.pending, (state) => {
        state.updateLab = ApiResponse.loading();
      })
      .addCase(thunks.updateLabStatus.fulfilled, (state, action) => {
        state.updateLab.status = "SUCCESS";
      })
      .addCase(thunks.updateLabStatus.rejected, (state, action) => {
        state.updateLab = ApiResponse.error(action.payload);
      })
      // Update Lab
      .addCase(thunks.updateLab.pending, (state) => {
        state.updateLab = ApiResponse.loading();
      })
      .addCase(thunks.updateLab.fulfilled, (state, action) => {
        state.updateLab = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateLab.rejected, (state, action) => {
        state.updateLab = ApiResponse.error(action.payload);
      })
      // Cancel Lab
      .addCase(thunks.cancelLab.pending, (state) => {
        state.cancelLab = ApiResponse.loading();
      })
      .addCase(thunks.cancelLab.fulfilled, (state, action) => {
        state.cancelLab.status = "SUCCESS";
      })
      .addCase(thunks.cancelLab.rejected, (state, action) => {
        state.cancelLab = ApiResponse.error(action.payload);
      })
      // Delete Lab
      .addCase(thunks.deleteLab.pending, (state) => {
        state.deleteLab = ApiResponse.loading();
      })
      .addCase(thunks.deleteLab.fulfilled, (state, action) => {
        state.deleteLab.status = "SUCCESS";
      })
      .addCase(thunks.deleteLab.rejected, (state, action) => {
        state.deleteLab = ApiResponse.error(action.payload);
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
