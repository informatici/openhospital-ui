import { Dispatch } from "redux";
import { AdmissionDTO, AgeTypeControllerApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  GET_AGETYPES_FAIL,
  GET_AGETYPES_LOADING,
  GET_AGETYPES_SUCCESS,
  GET_AGETYPES_SUCCESS_EMPTY,
} from "./consts";

const ageTypeControllerApi = new AgeTypeControllerApi(customConfiguration());

export const getAgeTypes =
  () =>
  (dispatch: Dispatch<IAction<AdmissionDTO[], {}>>): void => {
    dispatch({
      type: GET_AGETYPES_LOADING,
    });
    ageTypeControllerApi.getAllAgeTypesUsingGET().subscribe(
      (payload) => {
        if (Array.isArray(payload) && payload.length > 0) {
          dispatch({
            type: GET_AGETYPES_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_AGETYPES_SUCCESS_EMPTY,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_AGETYPES_FAIL,
          error,
        });
      }
    );
  };
