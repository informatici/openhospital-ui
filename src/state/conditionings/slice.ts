import { createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { ApiResponse } from "state/types";
import { initial } from "./initial";
import * as thunks from "./thunk";

export const conditioningSlice = createSlice({
  name: "conditionings",
  initialState: initial,
  reducers: {
    newConditioningReset: (state) => {
      state.newConditioning = initial.newConditioning;
    },
    updateConditioningReset: (state) => {
      state.updateConditioning = initial.updateConditioning;
    },
    getConditioningsByPatientCodeReset: (state) => {
      state.getConditioningByPatientCode = initial.getConditioningByPatientCode;
    },
  },
  extraReducers: (builder) =>
    builder

      .addCase(thunks.newConditioning.pending, (state) => {
        state.newConditioning = ApiResponse.loading();
      })
      .addCase(thunks.newConditioning.fulfilled, (state, action) => {
        state.newConditioning = ApiResponse.value(action.payload);
      })
      .addCase(thunks.newConditioning.rejected, (state, action) => {
        state.newConditioning = ApiResponse.error(action.payload);
      })
      .addCase(thunks.updateConditioning.pending, (state) => {
        state.updateConditioning = ApiResponse.loading();
      })
      .addCase(thunks.updateConditioning.fulfilled, (state, action) => {
        state.updateConditioning = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateConditioning.rejected, (state, action) => {
        state.updateConditioning = ApiResponse.error(action.payload);
      })
      .addCase(thunks.getConditioningByPatientCode.pending, (state) => {
        state.getConditioningByPatientCode = ApiResponse.loading();
      })
      .addCase(
        thunks.getConditioningByPatientCode.fulfilled,
        (state, action) => {
          state.getConditioningByPatientCode = isEmpty(action.payload)
            ? ApiResponse.empty()
            : ApiResponse.value(action.payload);
        }
      )
      .addCase(
        thunks.getConditioningByPatientCode.rejected,
        (state, action) => {
          state.getConditioningByPatientCode = ApiResponse.error(
            action.payload
          );
        }
      ),
});

export const {
  newConditioningReset,
  updateConditioningReset,
  getConditioningsByPatientCodeReset,
} = conditioningSlice.actions;
