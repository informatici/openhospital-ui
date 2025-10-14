import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { ApiResponse } from "state/types";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { TWardStockFIlter } from "./types";

export const pharmacySlice = createSlice({
  name: "pharmacy",
  initialState: initial,
  reducers: {
    createMovementReset: (state) => {
      state.createMovement = initial.createMovement;
    },
    updateMovementReset: (state) => {
      state.updateMovement = initial.updateMovement;
    },
    deleteMovementReset: (state) => {
      state.deleteMovement = initial.deleteMovement;
    },
    resetWardMovements: (state) => {
      state.wardMovements = initial.wardMovements;
    },
    resetWardMedicals: (state) => {
      state.wardMedicals = initial.wardMedicals;
    },
    updateWardStockFIilter: (
      state,
      action: PayloadAction<TWardStockFIlter>
    ) => {
      state.wardStock.filter = action.payload;
    },
    resetWardStockFilter: (state) => {
      state.wardStock.filter = initial.wardStock.filter;
    },
  },
  extraReducers: (builder) => {
    builder
      // get movements list
      .addCase(thunks.getMovements.pending, (state) => {
        state.getMovements = ApiResponse.loading();
      })
      .addCase(thunks.getMovements.fulfilled, (state, action) => {
        state.getMovements = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getMovements.rejected, (state, action) => {
        state.getMovements = ApiResponse.error(action.payload);
      })
      // get ward movements list
      .addCase(thunks.getWardMovements.pending, (state) => {
        state.wardMovements = ApiResponse.loading();
      })
      .addCase(thunks.getWardMovements.fulfilled, (state, action) => {
        state.wardMovements = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getWardMovements.rejected, (state, action) => {
        state.wardMovements = ApiResponse.error(action.payload);
      })
      // get ward medicals list
      .addCase(thunks.getWardMedicals.pending, (state) => {
        state.wardMedicals = ApiResponse.loading();
      })
      .addCase(thunks.getWardMedicals.fulfilled, (state, action) => {
        state.wardMedicals = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getWardMedicals.rejected, (state, action) => {
        state.wardMedicals = ApiResponse.error(action.payload);
      });
  },
});

export const {
  createMovementReset,
  updateMovementReset,
  deleteMovementReset,
  resetWardMovements,
  resetWardMedicals,
  updateWardStockFIilter,
  resetWardStockFilter,
} = pharmacySlice.actions;
