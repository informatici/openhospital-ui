import { Dispatch } from "redux";
import { AdmissionDTO } from "../../generated";
import { AdmissionTypesApi } from "../../generated/apis/AdmissionTypesApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  GET_ADMISSIONTYPE_FAIL,
  GET_ADMISSIONTYPE_LOADING,
  GET_ADMISSIONTYPE_SUCCESS,
  GET_ADMISSIONTYPE_SUCCESS_EMPTY,
} from "./consts";

const admissionTypesApi = new AdmissionTypesApi(customConfiguration());

export const getAdmissionTypes =
  () =>
  (dispatch: Dispatch<IAction<AdmissionDTO[], {}>>): void => {
    dispatch({
      type: GET_ADMISSIONTYPE_LOADING,
    });
    admissionTypesApi.getAdmissionTypes().subscribe(
      (payload) => {
        if (Array.isArray(payload) && payload.length > 0) {
          dispatch({
            type: GET_ADMISSIONTYPE_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_ADMISSIONTYPE_SUCCESS_EMPTY,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_ADMISSIONTYPE_FAIL,
          error: error?.response,
        });
      }
    );
  };
