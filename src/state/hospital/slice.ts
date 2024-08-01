import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
import { isEmpty } from "lodash";

export const hospitalSlice = createSlice({
  name: "hospitals",
  initialState: initial,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // Get Hospital
      .addCase(thunks.getHospital.pending, (state) => {
        state.getHospital = ApiResponse.loading();
      })
      .addCase(thunks.getHospital.fulfilled, (state, action) => {
        state.getHospital = ApiResponse.value(action.payload);
      })
      .addCase(thunks.getHospital.rejected, (state, action) => {
        state.getHospital = ApiResponse.error(action.payload);
      }),
});
