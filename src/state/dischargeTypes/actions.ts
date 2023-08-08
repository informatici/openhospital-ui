import { Dispatch } from "redux";
import { AdmissionDTO } from "../../generated";
import { DischargeTypeApi } from "../../generated/apis/DischargeTypeApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  GET_DISCHARGETYPE_FAIL,
  GET_DISCHARGETYPE_LOADING,
  GET_DISCHARGETYPE_SUCCESS,
  GET_DISCHARGETYPE_SUCCESS_EMPTY,
} from "./consts";

const dischargeTypeApi = new DischargeTypeApi(customConfiguration());

export const getDischargeTypes =
  () =>
  (dispatch: Dispatch<IAction<AdmissionDTO[], {}>>): void => {
    dispatch({
      type: GET_DISCHARGETYPE_LOADING,
    });
    dischargeTypeApi.getDischargeTypes().subscribe(
      (payload) => {
        if (Array.isArray(payload) && payload.length > 0) {
          dispatch({
            type: GET_DISCHARGETYPE_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_DISCHARGETYPE_SUCCESS_EMPTY,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_DISCHARGETYPE_FAIL,
          error: error?.response,
        });
      }
    );
  };
