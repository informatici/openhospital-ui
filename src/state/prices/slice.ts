import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
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
        state.getPrices.status = "LOADING";
      })
      .addCase(thunks.getPrices.fulfilled, (state, action) => {
        state.getPrices.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getPrices.data = action.payload;
      })
      .addCase(thunks.getPrices.rejected, (state, action) => {
        state.getPrices.status = "FAIL";
        state.getPrices.error = action.payload;
      })
      // Get Price Lists
      .addCase(thunks.getPriceLists.pending, (state) => {
        state.getPriceLists.status = "LOADING";
      })
      .addCase(thunks.getPriceLists.fulfilled, (state, action) => {
        state.getPriceLists.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getPriceLists.data = action.payload;
      })
      .addCase(thunks.getPriceLists.rejected, (state, action) => {
        state.getPriceLists.status = "FAIL";
        state.getPriceLists.error = action.payload;
      })
      // Create Price List
      .addCase(thunks.createPriceList.pending, (state) => {
        state.createPriceList.status = "LOADING";
      })
      .addCase(thunks.createPriceList.fulfilled, (state, action) => {
        state.createPriceList.status = "SUCCESS";
        state.createPriceList.data = action.payload;
      })
      .addCase(thunks.createPriceList.rejected, (state, action) => {
        state.createPriceList.status = "FAIL";
        state.createPriceList.error = action.payload;
      })
      // Update Price List
      .addCase(thunks.updatePriceList.pending, (state) => {
        state.updatePriceList.status = "LOADING";
      })
      .addCase(thunks.updatePriceList.fulfilled, (state, action) => {
        state.updatePriceList.status = "SUCCESS";
        state.updatePriceList.data = action.payload;
      })
      .addCase(thunks.updatePriceList.rejected, (state, action) => {
        state.updatePriceList.status = "FAIL";
        state.updatePriceList.error = action.payload;
      })
      // Delete Price List
      .addCase(thunks.deletePriceList.pending, (state) => {
        state.deletePriceList.status = "LOADING";
      })
      .addCase(thunks.deletePriceList.fulfilled, (state, action) => {
        state.deletePriceList.status = "SUCCESS";
      })
      .addCase(thunks.deletePriceList.rejected, (state, action) => {
        state.deletePriceList.status = "FAIL";
        state.deletePriceList.error = action.payload;
      }),
});

export const {
  createPriceListReset,
  updatePriceListReset,
  deletePriceListReset,
} = priceSlice.actions;
