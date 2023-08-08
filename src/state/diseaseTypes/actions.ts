import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import { DiseaseTypeDTO } from "../../generated";
import { DiseaseTypesApi } from "../../generated/apis/DiseaseTypesApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  GET_DISEASETYPE_FAIL,
  GET_DISEASETYPE_LOADING,
  GET_DISEASETYPE_SUCCESS,
} from "./consts";

const desaseTypesApi = new DiseaseTypesApi(customConfiguration());

export const getDiseaseTypes =
  () =>
  (dispatch: Dispatch<IAction<DiseaseTypeDTO[], {}>>): void => {
    dispatch({
      type: GET_DISEASETYPE_LOADING,
    });
    desaseTypesApi.getAllDiseaseTypes().subscribe(
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
