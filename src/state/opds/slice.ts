import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
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
        state.getOpds.status = "LOADING";
      })
      .addCase(thunks.getOpds.fulfilled, (state, action) => {
        state.getOpds.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getOpds.data = action.payload;
      })
      .addCase(thunks.getOpds.rejected, (state, action) => {
        state.getOpds.status = "FAIL";
        state.getOpds.error = action.payload;
      })
      // Get Opds With Operation Rows
      .addCase(thunks.getOpdsWithOperationRows.pending, (state) => {
        state.getOpds.status = "LOADING";
      })
      .addCase(thunks.getOpdsWithOperationRows.fulfilled, (state, action) => {
        state.getOpds.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getOpds.data = action.payload;
      })
      .addCase(thunks.getOpdsWithOperationRows.rejected, (state, action) => {
        state.getOpds.status = "FAIL";
        state.getOpds.error = action.payload;
      })
      // Search Opds
      .addCase(thunks.searchOpds.pending, (state) => {
        state.searchOpds.status = "LOADING";
      })
      .addCase(thunks.searchOpds.fulfilled, (state, action) => {
        state.searchOpds.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.searchOpds.data = action.payload;
      })
      .addCase(thunks.searchOpds.rejected, (state, action) => {
        state.searchOpds.status = "FAIL";
        state.searchOpds.error = action.payload;
      })
      // Get Last Opd
      .addCase(thunks.getLastOpd.pending, (state) => {
        state.lastOpd.status = "LOADING";
      })
      .addCase(thunks.getLastOpd.fulfilled, (state, action) => {
        state.lastOpd.status = "SUCCESS";
        state.lastOpd.data = action.payload;
      })
      .addCase(thunks.getLastOpd.rejected, (state, action) => {
        state.lastOpd.status = "FAIL";
        state.lastOpd.error = action.payload;
      })
      // Create Opd
      .addCase(thunks.createOpd.pending, (state) => {
        state.createOpd.status = "LOADING";
      })
      .addCase(thunks.createOpd.fulfilled, (state, action) => {
        state.createOpd.status = "SUCCESS";
        state.createOpd.data = { opdDTO: action.payload };
      })
      .addCase(thunks.createOpd.rejected, (state, action) => {
        state.createOpd.status = "FAIL";
        state.createOpd.error = action.payload;
      })
      // Create Opd With Operation Row
      .addCase(thunks.createOpdWithOperationsRow.pending, (state) => {
        state.createOpd.status = "LOADING";
      })
      .addCase(thunks.createOpdWithOperationsRow.fulfilled, (state, action) => {
        state.createOpd.status = "SUCCESS";
        state.createOpd.data = action.payload;
      })
      .addCase(thunks.createOpdWithOperationsRow.rejected, (state, action) => {
        state.createOpd.status = "FAIL";
        state.createOpd.error = action.payload;
      })
      // Update Opd
      .addCase(thunks.updateOpd.pending, (state) => {
        state.updateOpd.status = "LOADING";
      })
      .addCase(thunks.updateOpd.fulfilled, (state, action) => {
        state.updateOpd.status = "SUCCESS";
        state.updateOpd.data = { opdDTO: action.payload };
      })
      .addCase(thunks.updateOpd.rejected, (state, action) => {
        state.updateOpd.status = "FAIL";
        state.updateOpd.error = action.payload;
      })
      // Update Opd With OperationRow
      .addCase(thunks.updateOpdWithOperationRow.pending, (state) => {
        state.updateOpd.status = "LOADING";
      })
      .addCase(thunks.updateOpdWithOperationRow.fulfilled, (state, action) => {
        state.updateOpd.status = "SUCCESS";
        state.updateOpd.data = action.payload;
      })
      .addCase(thunks.updateOpdWithOperationRow.rejected, (state, action) => {
        state.updateOpd.status = "FAIL";
        state.updateOpd.error = action.payload;
      })
      // Delete Opd
      .addCase(thunks.deleteOpd.pending, (state) => {
        state.deleteOpd.status = "LOADING";
      })
      .addCase(thunks.deleteOpd.fulfilled, (state, action) => {
        state.deleteOpd.status = "SUCCESS";
      })
      .addCase(thunks.deleteOpd.rejected, (state, action) => {
        state.deleteOpd.status = "FAIL";
        state.deleteOpd.error = action.payload;
      }),
});

export const {
  getOpdsReset,
  searchOpdsReset,
  createOpdReset,
  updateOpdReset,
  deleteOpdReset,
} = opdSlice.actions;
