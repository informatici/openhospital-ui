import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { DiseaseDTO } from "../../generated";
import { DiseasesApi } from "../../generated/apis/DiseasesApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  GET_DISEASEIPDIN_FAIL,
  GET_DISEASEIPDIN_LOADING,
  GET_DISEASEIPDIN_SUCCESS,
  GET_DISEASEIPDOUT_FAIL,
  GET_DISEASEIPDOUT_LOADING,
  GET_DISEASEIPDOUT_SUCCESS,
  GET_DISEASE_FAIL,
  GET_DISEASE_LOADING,
  GET_DISEASE_SUCCESS,
} from "./consts";

const desasesApi = new DiseasesApi(customConfiguration());

export const getDiseasesOpd =
  () =>
  (dispatch: Dispatch<IAction<DiseaseDTO[], {}>>): void => {
    dispatch({
      type: GET_DISEASE_LOADING,
    });
    desasesApi.getDiseasesOpd().subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_DISEASE_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_DISEASE_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_DISEASE_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const getDiseasesIpdIn =
  () =>
  (dispatch: Dispatch<IAction<DiseaseDTO[], {}>>): void => {
    dispatch({
      type: GET_DISEASEIPDIN_LOADING,
    });
    desasesApi.getDiseasesIpdIn().subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_DISEASEIPDIN_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_DISEASEIPDIN_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_DISEASEIPDIN_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const getDiseasesIpdOut =
  () =>
  (dispatch: Dispatch<IAction<DiseaseDTO[], {}>>): void => {
    dispatch({
      type: GET_DISEASEIPDOUT_LOADING,
    });
    desasesApi.getDiseasesIpdOut().subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_DISEASEIPDOUT_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_DISEASEIPDOUT_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_DISEASEIPDOUT_FAIL,
          error: error?.response,
        });
      }
    );
  };
