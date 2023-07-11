import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import { forkJoin, Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { TFilterValues } from "../../components/accessories/billTable/types";
import {
  BillDTO,
  BillItemsDTO,
  BillPaymentsDTO,
  FullBillDTO,
} from "../../generated";
import { BillControllerApi } from "../../generated/apis/BillControllerApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  CLOSE_BILL_FAIL,
  CLOSE_BILL_LOADING,
  CLOSE_BILL_RESET,
  CLOSE_BILL_SUCCESS,
  DELETE_BILL_FAIL,
  DELETE_BILL_LOADING,
  DELETE_BILL_RESET,
  DELETE_BILL_SUCCESS,
  EDIT_BILL_FAIL,
  EDIT_BILL_LOADING,
  EDIT_BILL_RESET,
  EDIT_BILL_SUCCESS,
  GET_BILL_FAIL,
  GET_BILL_LOADING,
  GET_BILL_SUCCESS,
  NEW_BILL_FAIL,
  NEW_BILL_LOADING,
  NEW_BILL_RESET,
  NEW_BILL_SUCCESS,
  PENDING_BILL_FAIL,
  PENDING_BILL_LOADING,
  PENDING_BILL_SUCCESS,
  SEARCH_BILLS_BY_YEAR_FAIL,
  SEARCH_BILLS_BY_YEAR_LOADING,
  SEARCH_BILLS_BY_YEAR_SUCCESS,
  SEARCH_BILL_FAIL,
  SEARCH_BILL_LOADING,
  SEARCH_BILL_SUCCESS,
  SEARCH_PAYMENTS_FAIL,
  SEARCH_PAYMENTS_LOADING,
  SEARCH_PAYMENTS_SUCCESS,
  UPDATE_BILL_FAIL,
  UPDATE_BILL_LOADING,
  UPDATE_BILL_RESET,
  UPDATE_BILL_SUCCESS,
} from "./consts";

const billControllerApi = new BillControllerApi(customConfiguration());

export const newBill =
  (newBillDto: FullBillDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: NEW_BILL_LOADING,
    });

    billControllerApi.newBillUsingPOST({ newBillDto }).subscribe(
      (payload) => {
        dispatch({
          type: NEW_BILL_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: NEW_BILL_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const updateBill =
  (id: number, odBillDto: FullBillDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_BILL_LOADING,
    });

    billControllerApi.updateBillUsingPUT({ id, odBillDto }).subscribe(
      (payload) => {
        dispatch({
          type: UPDATE_BILL_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: UPDATE_BILL_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const newBillReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: NEW_BILL_RESET,
    });
  };
export const updateBillReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_BILL_RESET,
    });
  };

export const getBill =
  (code: number) =>
  (dispatch: Dispatch<IAction<BillDTO, {}>>): void => {
    dispatch({
      type: GET_BILL_LOADING,
    });
    billControllerApi.getBillUsingGET({ id: code }).subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_BILL_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_BILL_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_BILL_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const getPendingBills =
  (patientCode: number) =>
  (dispatch: Dispatch<IAction<BillDTO, {}>>): void => {
    dispatch({
      type: PENDING_BILL_LOADING,
    });
    billControllerApi
      .getPendingBillsUsingGET({
        patientCode,
      })
      .pipe(
        switchMap((bills) => getPayments(bills)),
        catchError((error) => of([]))
      )
      .pipe(
        switchMap((payments) => getItems(payments)),
        catchError((error) => of([]))
      )
      .subscribe(
        (payload) => {
          if (Array.isArray(payload) && payload.length > 0) {
            dispatch({
              type: PENDING_BILL_SUCCESS,
              payload: payload,
            });
          } else {
            dispatch({
              type: PENDING_BILL_SUCCESS,
              payload: [],
            });
          }
        },
        (error) => {
          dispatch({
            type: PENDING_BILL_FAIL,
            error: error?.response,
          });
        }
      );
  };
export const searchBills =
  (filter: TFilterValues) =>
  (dispatch: Dispatch<IAction<BillDTO, {}>>): void => {
    dispatch({
      type: SEARCH_BILL_LOADING,
    });
    billControllerApi
      .searchBillsUsingGET({
        datefrom: filter.fromDate,
        dateto: filter.toDate,
        patientCode: filter.patientCode,
      })
      .pipe(
        switchMap((bills) => getPayments(bills)),
        catchError((error) => of([]))
      )
      .pipe(
        switchMap((payments) => getItems(payments)),
        catchError((error) => of([]))
      )
      .subscribe(
        (payload) => {
          if (Array.isArray(payload) && payload.length > 0) {
            dispatch({
              type: SEARCH_BILL_SUCCESS,
              payload: payload,
            });
          } else {
            dispatch({
              type: SEARCH_BILL_SUCCESS,
              payload: [],
            });
          }
        },
        (error) => {
          dispatch({
            type: SEARCH_BILL_FAIL,
            error: error?.response,
          });
        }
      );
  };

const getPayments = (bills: BillDTO[]): Observable<FullBillDTO[]> => {
  if (bills.length === 0) return of([]);
  const fbills = forkJoin(
    bills.map((bill: BillDTO) => {
      const obs = billControllerApi.getPaymentsByBillIdUsingGET({
        billId: bill.id ? bill.id : 0,
      });
      return obs.pipe(
        map((payments) => {
          return {
            billDTO: bill,
            billItemsDTO: new Array<BillItemsDTO>(),
            billPaymentsDTO: payments,
          } as any as FullBillDTO;
        }),
        catchError((error) => of({ billDTO: bill } as any as FullBillDTO))
      );
    })
  );
  return fbills;
};

const getItems = (bills: FullBillDTO[]): Observable<FullBillDTO[]> => {
  if (bills.length === 0) return of([]);
  const fbills = forkJoin(
    bills.map((fbill: FullBillDTO) => {
      const obs = billControllerApi.getItemsUsingGET({
        billId: fbill?.bill?.id ? fbill.bill.id : 0,
      });
      return obs.pipe(
        map((items) => {
          return {
            billDTO: fbill.bill,
            billItemsDTO: items,
            billPaymentsDTO: fbill.billPayments,
          } as any as FullBillDTO;
        }),
        catchError((error) => of({ ...fbill }))
      );
    })
  );

  return fbills;
};

export const searchPayments =
  (filter: TFilterValues) =>
  (dispatch: Dispatch<IAction<BillDTO, {}>>): void => {
    dispatch({
      type: SEARCH_PAYMENTS_LOADING,
    });
    billControllerApi
      .searchBillsPaymentsUsingGET({
        datefrom: filter.fromDate,
        dateto: filter.toDate,
        patientCode: filter.patientCode,
      })
      .subscribe(
        (payload) => {
          if (Array.isArray(payload) && payload.length > 0) {
            dispatch({
              type: SEARCH_PAYMENTS_SUCCESS,
              payload: payload,
            });
          } else {
            dispatch({
              type: SEARCH_PAYMENTS_SUCCESS,
              payload: [],
            });
          }
        },
        (error) => {
          dispatch({
            type: SEARCH_PAYMENTS_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const deleteBill =
  (id: number | undefined) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_BILL_LOADING,
    });
    if (id) {
      billControllerApi.deleteBillUsingDELETE({ id }).subscribe(
        () => {
          dispatch({
            type: DELETE_BILL_SUCCESS,
            payload: id,
          });
        },
        (error) => {
          dispatch({
            type: DELETE_BILL_FAIL,
            error: error?.response,
          });
        }
      );
    } else {
      dispatch({
        type: DELETE_BILL_FAIL,
        error: "The id should not be empty",
      });
    }
  };

export const deleteBillReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_BILL_RESET,
    });
  };

export const payBillReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: EDIT_BILL_RESET,
    });
  };

export const payBill =
  (payment: BillPaymentsDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: EDIT_BILL_LOADING,
    });
    if (payment.billId) {
      billControllerApi
        .updateBillUsingPUT({
          id: payment.billId,
          odBillDto: { billPayments: [payment] } as any,
        })
        .subscribe(
          (payload) => {
            dispatch({
              type: EDIT_BILL_SUCCESS,
              payload: payload,
            });
          },
          (error) => {
            dispatch({
              type: EDIT_BILL_FAIL,
              error: error,
            });
          }
        );
    }
  };

export const closeBillReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CLOSE_BILL_RESET,
    });
  };

export const closeBill =
  (id: number, bill: BillDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CLOSE_BILL_LOADING,
    });
    billControllerApi
      .updateBillUsingPUT({ id: id, odBillDto: { bill: bill } as any })
      .subscribe(
        (payload) => {
          dispatch({
            type: CLOSE_BILL_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: CLOSE_BILL_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const getBillsByYear =
  (year: number) =>
  (dispatch: Dispatch<IAction<BillDTO, {}>>): void => {
    dispatch({
      type: SEARCH_BILLS_BY_YEAR_LOADING,
    });
    billControllerApi
      .searchBillsUsingGET({
        datefrom: new Date(year, 0, 1).toISOString(),
        dateto: new Date(year, 11, 31).toISOString(),
        patientCode: 0,
      })
      .pipe(
        switchMap((bills) => getPayments(bills)),
        catchError((error) => of([]))
      )
      .pipe(
        switchMap((payments) => getItems(payments)),
        catchError((error) => of([]))
      )
      .subscribe(
        (payload) => {
          if (Array.isArray(payload) && payload.length > 0) {
            dispatch({
              type: SEARCH_BILLS_BY_YEAR_SUCCESS,
              payload: payload,
            });
          } else {
            dispatch({
              type: SEARCH_BILLS_BY_YEAR_SUCCESS,
              payload: [],
            });
          }
        },
        (error) => {
          dispatch({
            type: SEARCH_BILLS_BY_YEAR_FAIL,
            error: error?.response,
          });
        }
      );
  };
