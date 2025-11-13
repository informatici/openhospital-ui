import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { ApiResponse } from "state/types";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { TWardStockFIlter } from "./types";

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
    resetMovementTypes: (state) => {
      state.movementTypes = initial.movementTypes;
    },
    resetWardMovements: (state) => {
      state.wardMovements = initial.wardMovements;
    },
    resetWardMedicals: (state) => {
      state.wardMedicals = initial.wardMedicals;
    },
    updateWardStockFIilter: (
      state,
      action: PayloadAction<TWardStockFIlter>
    ) => {
      state.wardStock.filter = action.payload;
    },
    resetWardStockFilter: (state) => {
      state.wardStock.filter = initial.wardStock.filter;
    },
    resetChargeMovements: (state) => {
      state.chargeMovements = initial.chargeMovements;
    },
    resetDischargeMovements: (state) => {
      state.dischargeMovements = initial.dischargeMovements;
    },
    resetMedicals: (state) => {
      state.getMedicals = initial.getMedicals;
    },
    resetMedicalTypes: (state) => {
      state.getMedicalTypes = initial.getMedicalTypes;
    },
    resetNewMedical: (state) => {
      state.newMedical = initial.newMedical;
    },
  },
  extraReducers: (builder) => {
    builder
      // get movement types list
      .addCase(thunks.getMovementTypes.pending, (state) => {
        state.movementTypes = ApiResponse.loading();
      })
      .addCase(thunks.getMovementTypes.fulfilled, (state, action) => {
        state.movementTypes = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getMovementTypes.rejected, (state, action) => {
        state.movementTypes = ApiResponse.error(action.payload);
      })
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
      // get ward movements list
      .addCase(thunks.getWardMovements.pending, (state) => {
        state.wardMovements = ApiResponse.loading();
      })
      .addCase(thunks.getWardMovements.fulfilled, (state, action) => {
        state.wardMovements = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getWardMovements.rejected, (state, action) => {
        state.wardMovements = ApiResponse.error(action.payload);
      })
      // get medicals list
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
      // get ward medicals list
      .addCase(thunks.getWardMedicals.pending, (state) => {
        state.wardMedicals = ApiResponse.loading();
      })
      .addCase(thunks.getWardMedicals.fulfilled, (state, action) => {
        state.wardMedicals = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getWardMedicals.rejected, (state, action) => {
        state.wardMedicals = ApiResponse.error(action.payload);
      })
      // Charge movements
      .addCase(thunks.chargeMovements.pending, (state) => {
        state.chargeMovements = ApiResponse.loading();
      })
      .addCase(thunks.chargeMovements.fulfilled, (state, action) => {
        state.chargeMovements = ApiResponse.value(action.payload);
      })
      .addCase(thunks.chargeMovements.rejected, (state, action) => {
        state.chargeMovements = ApiResponse.error(action.payload);
      })
      // Discharge movements
      .addCase(thunks.dischargeMovements.pending, (state) => {
        state.dischargeMovements = ApiResponse.loading();
      })
      .addCase(thunks.dischargeMovements.fulfilled, (state, action) => {
        state.dischargeMovements = ApiResponse.value(action.payload);
      })
      .addCase(thunks.dischargeMovements.rejected, (state, action) => {
        state.dischargeMovements = ApiResponse.error(action.payload);
      })
      // get medical types list
      .addCase(thunks.getMedicalTypes.pending, (state) => {
        state.getMedicalTypes = ApiResponse.loading();
      })
      .addCase(thunks.getMedicalTypes.fulfilled, (state, action) => {
        const data = action.payload.response || action.payload;
        state.getMedicalTypes = ApiResponse.value(data);
      })
      .addCase(thunks.getMedicalTypes.rejected, (state, action) => {
        state.getMedicalTypes = ApiResponse.error(action.payload);
      })
      // new medical
      .addCase(thunks.newMedical.pending, (state) => {
        state.newMedical = ApiResponse.loading();
      })
      .addCase(thunks.newMedical.fulfilled, (state, action) => {
        state.newMedical = ApiResponse.value(action.payload);
      })
      .addCase(thunks.newMedical.rejected, (state, action) => {
        state.newMedical = ApiResponse.error(action.payload);
      })
  },
});

export const {
  createMovementReset,
  updateMovementReset,
  deleteMovementReset,
  resetWardMovements,
  resetWardMedicals,
  updateWardStockFIilter,
  resetWardStockFilter,
  resetChargeMovements,
  resetMovementTypes,
  resetDischargeMovements,
  resetMedicals,
  resetMedicalTypes,
  resetNewMedical,
} = pharmacySlice.actions;
