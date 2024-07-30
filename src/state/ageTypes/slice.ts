import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { isEmpty } from "lodash";

export const ageTypeSlice = createSlice({
  name: "ageTypes",
  initialState: initial,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // Get All Age Types
      .addCase(thunks.getAgeTypes.pending, (state) => {
        state.getAllAgeTypes.status = "LOADING";
      })
      .addCase(thunks.getAgeTypes.fulfilled, (state, action) => {
        state.getAllAgeTypes.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getAllAgeTypes.data = action.payload;
      })
      .addCase(thunks.getAgeTypes.rejected, (state, action) => {
        state.getAllAgeTypes.status = "FAIL";
        state.getAllAgeTypes.error = action.payload;
      }),
});
