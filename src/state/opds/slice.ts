import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
import { isEmpty } from "lodash";

export const opdSlice = createSlice({
  name: "opds",
  initialState: initial,
  reducers: {
    searchOpdsReset: (state) => {
      state.searchOpds = initial.searchOpds;
    },
    getOpdsReset: (state) => {
      state.getOpds = initial.getOpds;
    },
    createOpdReset: (state) => {
      state.createOpd = initial.createOpd;
    },
    updateOpdReset: (state) => {
      state.updateOpd = initial.updateOpd;
    },
    deleteOpdReset: (state) => {
      state.deleteOpd = initial.deleteOpd;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Opds
      .addCase(thunks.getOpds.pending, (state) => {
        state.getOpds = ApiResponse.loading();
      })
      .addCase(thunks.getOpds.fulfilled, (state, action) => {
        state.getOpds = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getOpds.rejected, (state, action) => {
        state.getOpds = ApiResponse.error(action.payload);
      })
      // Get Opds With Operation Rows
      .addCase(thunks.getOpdsWithOperationRows.pending, (state) => {
        state.getOpds = ApiResponse.loading();
      })
      .addCase(thunks.getOpdsWithOperationRows.fulfilled, (state, action) => {
        state.getOpds = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getOpdsWithOperationRows.rejected, (state, action) => {
        state.getOpds = ApiResponse.error(action.payload);
      })
      // Search Opds
      .addCase(thunks.searchOpds.pending, (state) => {
        state.searchOpds = ApiResponse.loading();
      })
      .addCase(thunks.searchOpds.fulfilled, (state, action) => {
        state.searchOpds = ApiResponse.value(action.payload);
      })
      .addCase(thunks.searchOpds.rejected, (state, action) => {
        state.searchOpds = ApiResponse.error(action.payload);
      })
      // Get Last Opd
      .addCase(thunks.getLastOpd.pending, (state) => {
        state.lastOpd = ApiResponse.loading();
      })
      .addCase(thunks.getLastOpd.fulfilled, (state, action) => {
        state.lastOpd = ApiResponse.value(action.payload);
      })
      .addCase(thunks.getLastOpd.rejected, (state, action) => {
        state.lastOpd = ApiResponse.error(action.payload);
      })
      // Create Opd
      .addCase(thunks.createOpd.pending, (state) => {
        state.createOpd = ApiResponse.loading();
      })
      .addCase(thunks.createOpd.fulfilled, (state, action) => {
        state.createOpd.status = "SUCCESS";
        state.createOpd.data = { opdDTO: action.payload };
      })
      .addCase(thunks.createOpd.rejected, (state, action) => {
        state.createOpd = ApiResponse.error(action.payload);
      })
      // Create Opd With Operation Row
      .addCase(thunks.createOpdWithOperationsRow.pending, (state) => {
        state.createOpd = ApiResponse.loading();
      })
      .addCase(thunks.createOpdWithOperationsRow.fulfilled, (state, action) => {
        state.createOpd = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createOpdWithOperationsRow.rejected, (state, action) => {
        state.createOpd = ApiResponse.error(action.payload);
      })
      // Update Opd
      .addCase(thunks.updateOpd.pending, (state) => {
        state.updateOpd = ApiResponse.loading();
      })
      .addCase(thunks.updateOpd.fulfilled, (state, action) => {
        state.updateOpd.status = "SUCCESS";
        state.updateOpd.data = { opdDTO: action.payload };
      })
      .addCase(thunks.updateOpd.rejected, (state, action) => {
        state.updateOpd = ApiResponse.error(action.payload);
      })
      // Update Opd With OperationRow
      .addCase(thunks.updateOpdWithOperationRow.pending, (state) => {
        state.updateOpd = ApiResponse.loading();
      })
      .addCase(thunks.updateOpdWithOperationRow.fulfilled, (state, action) => {
        state.updateOpd = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateOpdWithOperationRow.rejected, (state, action) => {
        state.updateOpd = ApiResponse.error(action.payload);
      })
      // Delete Opd
      .addCase(thunks.deleteOpd.pending, (state) => {
        state.deleteOpd = ApiResponse.loading();
      })
      .addCase(thunks.deleteOpd.fulfilled, (state, action) => {
        state.deleteOpd.status = "SUCCESS";
      })
      .addCase(thunks.deleteOpd.rejected, (state, action) => {
        state.deleteOpd = ApiResponse.error(action.payload);
      }),
});

export const {
  getOpdsReset,
  searchOpdsReset,
  createOpdReset,
  updateOpdReset,
  deleteOpdReset,
} = opdSlice.actions;
