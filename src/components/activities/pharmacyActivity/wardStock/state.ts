import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { TWardStockFIlter } from "./types";

export type WardStockState = {
  filter: TWardStockFIlter;
};

const initialState: WardStockState = {
  filter: {},
};

const slice = createSlice({
  name: "ward-stock",
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<TWardStockFIlter>) => {
      state.filter = action.payload;
    },
    resetFilter: (state) => {
      state.filter = initialState.filter;
    },
  },
});

export const { updateFilter, resetFilter } = slice.actions;
export const { reducer, getInitialState } = slice;
