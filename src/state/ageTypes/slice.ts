import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
import { isEmpty } from "lodash";

export const ageTypeSlice = createSlice({
  name: "ageTypes",
  initialState: initial,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // Get All Age Types
      .addCase(thunks.getAgeTypes.pending, (state) => {
        state.getAllAgeTypes = ApiResponse.loading();
      })
      .addCase(thunks.getAgeTypes.fulfilled, (state, action) => {
        state.getAllAgeTypes = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getAgeTypes.rejected, (state, action) => {
        state.getAllAgeTypes = ApiResponse.error(action.payload);
      }),
});
