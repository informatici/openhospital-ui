import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { isEmpty } from "lodash";

export const hospitalSlice = createSlice({
  name: "hospitals",
  initialState: initial,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // Get Hospital
      .addCase(thunks.getHospital.pending, (state) => {
        state.getHospital.status = "LOADING";
      })
      .addCase(thunks.getHospital.fulfilled, (state, action) => {
        state.getHospital.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getHospital.data = action.payload;
      })
      .addCase(thunks.getHospital.rejected, (state, action) => {
        state.getHospital.status = "FAIL";
        state.getHospital.error = action.payload;
      }),
});
