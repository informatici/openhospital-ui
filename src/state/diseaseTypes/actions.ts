import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import { DiseaseTypeControllerApi, DiseaseTypeDTO } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  GET_DISEASETYPE_FAIL,
  GET_DISEASETYPE_LOADING,
  GET_DISEASETYPE_SUCCESS,
} from "./consts";

const desaseTypeControllerApi = new DiseaseTypeControllerApi(
  customConfiguration()
);

export const getDiseaseTypes =
  () =>
  (dispatch: Dispatch<IAction<DiseaseTypeDTO[], {}>>): void => {
    dispatch({
      type: GET_DISEASETYPE_LOADING,
    });
    desaseTypeControllerApi.getAllDiseaseTypesUsingGET().subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_DISEASETYPE_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_DISEASETYPE_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_DISEASETYPE_FAIL,
          error: error?.response,
        });
      }
    );
  };
