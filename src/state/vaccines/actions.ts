import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { VaccineDTO, VaccinesApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  GET_VACCINES_FAIL,
  GET_VACCINES_LOADING,
  GET_VACCINES_SUCCESS,
} from "./consts";

const vaccinesApi = new VaccinesApi(customConfiguration());

export const getVaccines =
  () =>
  (dispatch: Dispatch<IAction<VaccineDTO[], {}>>): void => {
    dispatch({
      type: GET_VACCINES_LOADING,
    });
    vaccinesApi.getVaccines().subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_VACCINES_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_VACCINES_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_VACCINES_FAIL,
          error: error?.response,
        });
      }
    );
  };
