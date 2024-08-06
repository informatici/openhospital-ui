import { createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { ApiResponse } from "state/types";
import { initial } from "./initial";
import * as thunks from "./thunk";

export const billSlice = createSlice({
  name: "bills",
  initialState: initial,
  reducers: {
    newBillReset: (state) => {
      state.newBill = initial.newBill;
    },
    updateBillReset: (state) => {
      state.updateBill = initial.updateBill;
    },
    payBillReset: (state) => {
      state.payBill = initial.payBill;
    },
    closeBillReset: (state) => {
      state.closeBill = initial.closeBill;
    },
    deleteBillReset: (state) => {
      state.delete = initial.delete;
    },
  },
  extraReducers: (builder) =>
    builder
      // Create Bill
      .addCase(thunks.newBill.pending, (state) => {
        state.newBill = ApiResponse.loading();
      })
      .addCase(thunks.newBill.fulfilled, (state, action) => {
        state.newBill = ApiResponse.value(action.payload);
      })
      .addCase(thunks.newBill.rejected, (state, action) => {
        state.newBill = ApiResponse.error(action.payload);
      })
      // Update Bill
      .addCase(thunks.updateBill.pending, (state) => {
        state.updateBill = ApiResponse.loading();
      })
      .addCase(thunks.updateBill.fulfilled, (state, action) => {
        state.updateBill = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateBill.rejected, (state, action) => {
        state.updateBill = ApiResponse.error(action.payload);
      })
      // Pay Bill
      .addCase(thunks.payBill.pending, (state) => {
        state.payBill = ApiResponse.loading();
      })
      .addCase(thunks.payBill.fulfilled, (state, action) => {
        state.payBill.status = "SUCCESS";
      })
      .addCase(thunks.payBill.rejected, (state, action) => {
        state.payBill = ApiResponse.error(action.payload);
      })
      // Close Bill
      .addCase(thunks.closeBill.pending, (state) => {
        state.closeBill = ApiResponse.loading();
      })
      .addCase(thunks.closeBill.fulfilled, (state, action) => {
        state.closeBill.status = "SUCCESS";
      })
      .addCase(thunks.closeBill.rejected, (state, action) => {
        state.closeBill = ApiResponse.error(action.payload);
      })
      // Delete Bill
      .addCase(thunks.deleteBill.pending, (state) => {
        state.delete = ApiResponse.loading();
      })
      .addCase(thunks.deleteBill.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
      })
      .addCase(thunks.deleteBill.rejected, (state, action) => {
        state.delete = ApiResponse.error(action.payload);
      })
      // Get Bill
      .addCase(thunks.getBill.pending, (state) => {
        state.getBill = ApiResponse.loading();
      })
      .addCase(thunks.getBill.fulfilled, (state, action) => {
        state.getBill.status = "SUCCESS";
      })
      .addCase(thunks.getBill.rejected, (state, action) => {
        state.getBill = ApiResponse.error(action.payload);
      })
      // Get Bills By Year
      .addCase(thunks.getBillsByYear.pending, (state) => {
        state.getBillsByYear = ApiResponse.loading();
      })
      .addCase(thunks.getBillsByYear.fulfilled, (state, action) => {
        state.getBillsByYear = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getBillsByYear.rejected, (state, action) => {
        state.getBillsByYear = ApiResponse.error(action.payload);
      })
      // Get Pending Bills
      .addCase(thunks.getPendingBills.pending, (state) => {
        state.getPendingBills = ApiResponse.loading();
      })
      .addCase(thunks.getPendingBills.fulfilled, (state, action) => {
        state.getPendingBills = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getPendingBills.rejected, (state, action) => {
        state.getPendingBills = ApiResponse.error(action.payload);
      })
      // Search Bills
      .addCase(thunks.searchBills.pending, (state) => {
        state.searchBills = ApiResponse.loading();
      })
      .addCase(thunks.searchBills.fulfilled, (state, action) => {
        state.searchBills = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.searchBills.rejected, (state, action) => {
        state.searchBills = ApiResponse.error(action.payload);
      })
      // Search Payments
      .addCase(thunks.searchPayments.pending, (state) => {
        state.searchPayments = ApiResponse.loading();
      })
      .addCase(thunks.searchPayments.fulfilled, (state, action) => {
        state.searchPayments = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.searchPayments.rejected, (state, action) => {
        state.searchPayments = ApiResponse.error(action.payload);
      }),
});

export const {
  newBillReset,
  updateBillReset,
  payBillReset,
  closeBillReset,
  deleteBillReset,
} = billSlice.actions;
