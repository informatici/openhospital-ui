import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
import { isEmpty } from "lodash";

export const priceSlice = createSlice({
  name: "prices",
  initialState: initial,
  reducers: {
    createPriceListReset: (state) => {
      state.createPriceList = initial.createPriceList;
    },
    updatePriceListReset: (state) => {
      state.updatePriceList = initial.updatePriceList;
    },
    deletePriceListReset: (state) => {
      state.deletePriceList = initial.deletePriceList;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Prices
      .addCase(thunks.getPrices.pending, (state) => {
        state.getPrices = ApiResponse.loading();
      })
      .addCase(thunks.getPrices.fulfilled, (state, action) => {
        state.getPrices = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getPrices.rejected, (state, action) => {
        state.getPrices = ApiResponse.error(action.payload);
      })
      // Get Price Lists
      .addCase(thunks.getPriceLists.pending, (state) => {
        state.getPriceLists = ApiResponse.loading();
      })
      .addCase(thunks.getPriceLists.fulfilled, (state, action) => {
        state.getPriceLists = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getPriceLists.rejected, (state, action) => {
        state.getPriceLists = ApiResponse.error(action.payload);
      })
      // Create Price List
      .addCase(thunks.createPriceList.pending, (state) => {
        state.createPriceList = ApiResponse.loading();
      })
      .addCase(thunks.createPriceList.fulfilled, (state, action) => {
        state.createPriceList = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createPriceList.rejected, (state, action) => {
        state.createPriceList = ApiResponse.error(action.payload);
      })
      // Update Price List
      .addCase(thunks.updatePriceList.pending, (state) => {
        state.updatePriceList = ApiResponse.loading();
      })
      .addCase(thunks.updatePriceList.fulfilled, (state, action) => {
        state.updatePriceList = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updatePriceList.rejected, (state, action) => {
        state.updatePriceList = ApiResponse.error(action.payload);
      })
      // Delete Price List
      .addCase(thunks.deletePriceList.pending, (state) => {
        state.deletePriceList = ApiResponse.loading();
      })
      .addCase(thunks.deletePriceList.fulfilled, (state, action) => {
        state.deletePriceList.status = "SUCCESS";
      })
      .addCase(thunks.deletePriceList.rejected, (state, action) => {
        state.deletePriceList = ApiResponse.error(action.payload);
      }),
});

export const {
  createPriceListReset,
  updatePriceListReset,
  deletePriceListReset,
} = priceSlice.actions;
