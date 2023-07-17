import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import { DiseaseDTO } from "../../generated";
import { WardControllerApi } from "../../generated/apis/WardControllerApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import { GET_WARD_FAIL, GET_WARD_LOADING, GET_WARD_SUCCESS } from "./consts";

const wardControllerApi = new WardControllerApi(customConfiguration());

export const getWards =
  () =>
  (dispatch: Dispatch<IAction<DiseaseDTO[], {}>>): void => {
    dispatch({
      type: GET_WARD_LOADING,
    });
    wardControllerApi.getWardsUsingGET().subscribe(
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
