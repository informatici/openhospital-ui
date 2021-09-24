import { Dispatch } from "redux";
import { map, catchError, toArray, switchMap, concatMap } from "rxjs/operators";
import { of, Observable } from "rxjs";
import isEmpty from "lodash.isempty";
import {
  Configuration,
  BillControllerApi,
  BillDTO,
  FullBillDTO,
  BillPaymentsDTO,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import {
  NEW_BILL_FAIL,
  NEW_BILL_LOADING,
  NEW_BILL_SUCCESS,
  NEW_BILL_RESET,
  SEARCH_BILL_FAIL,
  SEARCH_BILL_LOADING,
  SEARCH_BILL_SUCCESS,
  GET_BILL_LOADING,
  GET_BILL_SUCCESS,
  GET_BILL_FAIL,
} from "./consts";
import { concat } from "lodash";

const billControllerApi = new BillControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

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
          error: error,
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
          error,
        });
      }
    );
  };

export const getPendingBills =
  (patientCode: number) =>
  (dispatch: Dispatch<IAction<BillDTO, {}>>): void => {
    dispatch({
      type: SEARCH_BILL_LOADING,
    });
    billControllerApi
      .getPendingBillsUsingGET({
        patientCode,
      })
      .pipe(
        map((bills: BillDTO[]) => getBillAndPayments(bills)),
        catchError((err) => of([]))
      )
      .pipe(
        map((payments: FullBillDTO[]) => getBillAndItems(payments)),
        catchError((err) => of([]))
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
            error,
          });
        }
      );
  };
export const searchBills =
  (datefrom: string, dateto: string, patientCode: number) =>
  (dispatch: Dispatch<IAction<BillDTO, {}>>): void => {
    dispatch({
      type: SEARCH_BILL_LOADING,
    });
    billControllerApi
      .searchBillsUsingGET({
        datefrom,
        dateto,
        patientCode,
      })
      .pipe(switchMap((bills) => getBillAndPayments(bills)))
      .pipe(switchMap((payments) => getBillAndItems(payments)))
      .subscribe(
        (payload) => {
          if (Array.isArray(payload)) {
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
            error,
          });
        }
      );
  };

const getBillAndPayments = (bills: BillDTO[]): any[] => {
  const fbills: any[] = [];
  bills.map((bill: BillDTO) => {
    billControllerApi
      .getPaymentsByBillIdUsingGET({ billId: bill.id ? bill.id : 0 })
      .subscribe(
        (payload) => {
          fbills.push({
            billDTO: bill,
            billItemsDTO: [],
            billPaymentsDTO: payload,
          });
        },
        (error) => {
          fbills.push({
            billDTO: bill,
            billItemsDTO: [],
            billPaymentsDTO: [],
          });
        }
      );
  });

  return fbills;
};

const getBillAndItems = (bills: any[]): any[] => {
  const fbills: any[] = [];
  bills.map((fbill: any) => {
    billControllerApi
      .getItemsUsingGET({ billId: fbill?.billDTO?.id ? fbill.billDTO.id : 0 })
      .subscribe(
        (payload) => {
          const b = fbill;
          b.billItemsDTO = payload;
          fbills.push(b);
        },
        (error) => {
          const b = fbill;
          fbills.push(b);
        }
      );
  });

  return fbills;
};
