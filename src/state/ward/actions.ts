import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import { DiseaseDTO } from "../../generated";
import { WardsApi } from "../../generated/apis/WardsApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import { GET_WARD_FAIL, GET_WARD_LOADING, GET_WARD_SUCCESS } from "./consts";

const wardsApi = new WardsApi(customConfiguration());

export const getWards =
  () =>
  (dispatch: Dispatch<IAction<DiseaseDTO[], {}>>): void => {
    dispatch({
      type: GET_WARD_LOADING,
    });
    wardsApi.getWards().subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_WARD_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_WARD_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_WARD_FAIL,
          error: error?.response,
        });
      }
    );
  };
