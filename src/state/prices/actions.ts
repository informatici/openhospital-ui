import { Dispatch } from "redux";
import isEmpty from "lodash.isempty";
import { Configuration } from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import {
  GET_PRICE_LOADING,
  GET_PRICE_SUCCESS,
  GET_PRICE_FAIL,
  GET_PRICELISTS_LOADING,
  GET_PRICELISTS_SUCCESS,
  GET_PRICELISTS_FAIL,
} from "./consts";
import { PriceListControllerApi } from "../../generated/apis/PriceListControllerApi";
import { PriceDTO } from "../../generated/models/PriceDTO";

const priceControllerApi = new PriceListControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

export const getPrices =
  () =>
  (dispatch: Dispatch<IAction<PriceDTO[], {}>>): void => {
    dispatch({
      type: GET_PRICE_LOADING,
    });
    priceControllerApi.getPricesUsingGET({}).subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_PRICE_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_PRICE_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_PRICE_FAIL,
          error,
        });
      }
    );
  };

export const getPriceLists =
  () =>
  (dispatch: Dispatch<IAction<PriceDTO[], {}>>): void => {
    dispatch({
      type: GET_PRICELISTS_LOADING,
    });
    priceControllerApi.getPriceListsUsingGET({}).subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_PRICELISTS_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_PRICELISTS_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_PRICELISTS_FAIL,
          error,
        });
      }
    );
  };
