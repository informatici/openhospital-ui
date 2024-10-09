import { createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "state/types";
import { initial } from "./initial";
import * as thunks from "./thunk";

export const hospitalSlice = createSlice({
  name: "hospitals",
  initialState: initial,
  reducers: {
    updateHospitalReset: (state) => {
      state.updateHospital = initial.updateHospital;
    },
  },
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
      })
      // Update Hospital
      .addCase(thunks.updateHospital.pending, (state) => {
        state.updateHospital = ApiResponse.loading();
      })
      .addCase(thunks.updateHospital.fulfilled, (state, action) => {
        state.updateHospital = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateHospital.rejected, (state, action) => {
        state.updateHospital = ApiResponse.error(action.payload);
      }),
});

export const { updateHospitalReset } = hospitalSlice.actions;
