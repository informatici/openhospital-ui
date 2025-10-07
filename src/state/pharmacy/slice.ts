import { createSlice } from "@reduxjs/toolkit";
import { IPharmacyState } from "./types";
import { initial } from "./initial";
import { ApiResponse } from "state/types";
import { isEmpty } from "lodash";
import * as thunks from "./thunk";

export const pharmacySlice = createSlice({
    name: "pharmacy",
    initialState: initial,
    reducers: {
        createMovementReset: (state) => {
            state.createMovement = initial.createMovement;
        },
        updateMovementReset: (state) => {
            state.updateMovement = initial.updateMovement;
        },
        deleteMovementReset: (state) => {
            state.deleteMovement = initial.deleteMovement;
        },
    },
    extraReducers: (builder) => {
        builder
            // get movements list
            .addCase(thunks.getMovements.pending, (state) => {
                state.getMovements = ApiResponse.loading();
            })
            .addCase(thunks.getMovements.fulfilled, (state, action) => {
                state.getMovements = isEmpty(action.payload)
                    ? ApiResponse.empty()
                    : ApiResponse.value(action.payload);
            })
            .addCase(thunks.getMovements.rejected, (state, action) => {
                state.getMovements = ApiResponse.error(action.payload);
            })

            // get medical list
            .addCase(thunks.getMedicals.pending, (state) => {
                state.getMedicals = ApiResponse.loading();
            })
            .addCase(thunks.getMedicals.fulfilled, (state, action) => {
                state.getMedicals = isEmpty(action.payload)
                    ? ApiResponse.empty()
                    : ApiResponse.value(action.payload);
            })
            .addCase(thunks.getMedicals.rejected, (state, action) => {
                state.getMedicals = ApiResponse.error(action.payload);
            })

            // get medical movements list
            .addCase(thunks.getMedicalsMov.pending, (state) => {
                state.getMedicalsMov = ApiResponse.loading();
            })
            .addCase(thunks.getMedicalsMov.fulfilled, (state, action) => {
                state.getMedicalsMov = isEmpty(action.payload)
                    ? ApiResponse.empty()
                    : ApiResponse.value(action.payload);
            })
            .addCase(thunks.getMedicalsMov.rejected, (state, action) => {
                state.getMedicalsMov = ApiResponse.error(action.payload);
            })
    },
});