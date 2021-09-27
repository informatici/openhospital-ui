import { Dispatch } from "redux";
import { map, catchError, switchMap } from "rxjs/operators";
import { of, Observable, forkJoin } from "rxjs";
import isEmpty from "lodash.isempty";
import {
  Configuration,
  BillControllerApi,
  BillDTO,
  FullBillDTO,
  BillItemsDTO,
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
      .pipe(switchMap((bills) => getPayments(bills)))
      .pipe(switchMap((payments) => getItems(payments)))
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
      .pipe(switchMap((bills) => getPayments(bills)))
      .pipe(switchMap((payments) => getItems(payments)))
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

const getPayments = (bills: BillDTO[]): Observable<FullBillDTO[]> => {
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
          } as FullBillDTO;
        }),
        catchError((error) => of({ billDTO: bill } as FullBillDTO))
      );
    })
  );
  return fbills;
};

const getItems = (bills: FullBillDTO[]): Observable<FullBillDTO[]> => {
  const fbills = forkJoin(
    bills.map((fbill: FullBillDTO) => {
      const obs = billControllerApi.getItemsUsingGET({
        billId: fbill?.billDTO?.id ? fbill.billDTO.id : 0,
      });
      return obs.pipe(
        map((items) => {
          return {
            billDTO: fbill.billDTO,
            billItemsDTO: items,
            billPaymentsDTO: fbill.billPaymentsDTO,
          } as FullBillDTO;
        }),
        catchError((error) => of({ ...fbill }))
      );
    })
  );
  return fbills;
};
