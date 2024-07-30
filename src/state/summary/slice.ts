import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";

export const summarySlice = createSlice({
  name: "symmary",
  initialState: initial,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // Load Summary Data
      .addCase(thunks.loadSummaryData.pending, (state) => {
        state.summaryApisCall.status = "LOADING";
      })
      .addCase(thunks.loadSummaryData.fulfilled, (state, action) => {
        state.summaryApisCall.status = "SUCCESS";
        state.summaryApisCall.data = action.payload;
      })
      .addCase(thunks.loadSummaryData.rejected, (state, action) => {
        state.summaryApisCall.status = "FAIL";
        state.summaryApisCall.error = action.payload;
      }),
});
