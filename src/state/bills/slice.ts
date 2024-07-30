import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { isEmpty } from "lodash";
import { FullBillDTO } from "../../generated";

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
        state.newBill.status = "LOADING";
      })
      .addCase(thunks.newBill.fulfilled, (state, action) => {
        state.newBill.status = "SUCCESS";
        state.newBill.data = action.payload;
      })
      .addCase(thunks.newBill.rejected, (state, action) => {
        state.newBill.status = "FAIL";
        state.newBill.error = action.payload;
      })
      // Update Bill
      .addCase(thunks.updateBill.pending, (state) => {
        state.updateBill.status = "LOADING";
      })
      .addCase(thunks.updateBill.fulfilled, (state, action) => {
        state.updateBill.status = "SUCCESS";
        state.updateBill.data = action.payload;
      })
      .addCase(thunks.updateBill.rejected, (state, action) => {
        state.updateBill.status = "FAIL";
        state.updateBill.error = action.payload;
      })
      // Pay Bill
      .addCase(thunks.payBill.pending, (state) => {
        state.payBill.status = "LOADING";
      })
      .addCase(thunks.payBill.fulfilled, (state, action) => {
        state.payBill.status = "SUCCESS";
      })
      .addCase(thunks.payBill.rejected, (state, action) => {
        state.payBill.status = "FAIL";
        state.payBill.error = action.payload;
      })
      // Close Bill
      .addCase(thunks.closeBill.pending, (state) => {
        state.closeBill.status = "LOADING";
      })
      .addCase(thunks.closeBill.fulfilled, (state, action) => {
        state.closeBill.status = "SUCCESS";
      })
      .addCase(thunks.closeBill.rejected, (state, action) => {
        state.closeBill.status = "FAIL";
        state.closeBill.error = action.payload;
      })
      // Delete Bill
      .addCase(thunks.deleteBill.pending, (state) => {
        state.delete.status = "LOADING";
      })
      .addCase(thunks.deleteBill.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
      })
      .addCase(thunks.deleteBill.rejected, (state, action) => {
        state.delete.status = "FAIL";
        state.delete.error = action.payload;
      })
      // Get Bill
      .addCase(thunks.getBill.pending, (state) => {
        state.getBill.status = "LOADING";
      })
      .addCase(thunks.getBill.fulfilled, (state, action) => {
        state.getBill.status = "SUCCESS";
      })
      .addCase(thunks.getBill.rejected, (state, action) => {
        state.getBill.status = "FAIL";
        state.getBill.error = action.payload;
      })
      // Get Bills By Year
      .addCase(thunks.getBillsByYear.pending, (state) => {
        state.getBillsByYear.status = "LOADING";
      })
      .addCase(thunks.getBillsByYear.fulfilled, (state, action) => {
        state.getBillsByYear.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getBillsByYear.data = action.payload;
      })
      .addCase(thunks.getBillsByYear.rejected, (state, action) => {
        state.getBillsByYear.status = "FAIL";
        state.getBillsByYear.error = action.payload;
      })
      // Get Pending Bills
      .addCase(thunks.getPendingBills.pending, (state) => {
        state.getPendingBills.status = "LOADING";
      })
      .addCase(thunks.getPendingBills.fulfilled, (state, action) => {
        state.getPendingBills.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getPendingBills.data = action.payload;
      })
      .addCase(thunks.getPendingBills.rejected, (state, action) => {
        state.getPendingBills.status = "FAIL";
        state.getPendingBills.error = action.payload;
      })
      // Search Bills
      .addCase(thunks.searchBills.pending, (state) => {
        state.searchBills.status = "LOADING";
      })
      .addCase(thunks.searchBills.fulfilled, (state, action) => {
        state.searchBills.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.searchBills.data = action.payload;
      })
      .addCase(thunks.searchBills.rejected, (state, action) => {
        state.searchBills.status = "FAIL";
        state.searchBills.error = action.payload;
      })
      // Search Payments
      .addCase(thunks.searchPayments.pending, (state) => {
        state.searchPayments.status = "LOADING";
      })
      .addCase(thunks.searchPayments.fulfilled, (state, action) => {
        state.searchPayments.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.searchPayments.data = action.payload;
      })
      .addCase(thunks.searchPayments.rejected, (state, action) => {
        state.searchPayments.status = "FAIL";
        state.searchPayments.error = action.payload;
      }),
});

export const {
  newBillReset,
  updateBillReset,
  payBillReset,
  closeBillReset,
  deleteBillReset,
} = billSlice.actions;
