import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { DiseaseDTO } from "../../generated";
import { DiseasesApi } from "../../generated/apis/DiseasesApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  CREATE_DISEASE_FAIL,
  CREATE_DISEASE_LOADING,
  CREATE_DISEASE_RESET,
  CREATE_DISEASE_SUCCESS,
  GET_DISEASEIPDIN_FAIL,
  GET_DISEASEIPDIN_LOADING,
  GET_DISEASEIPDIN_SUCCESS,
  GET_DISEASEIPDOUT_FAIL,
  GET_DISEASEIPDOUT_LOADING,
  GET_DISEASEIPDOUT_SUCCESS,
  GET_DISEASES_FAIL,
  GET_DISEASES_LOADING,
  GET_DISEASES_SUCCESS,
  GET_DISEASE_FAIL,
  GET_DISEASE_LOADING,
  GET_DISEASE_SUCCESS,
  UPDATE_DISEASE_FAIL,
  UPDATE_DISEASE_LOADING,
  UPDATE_DISEASE_RESET,
  UPDATE_DISEASE_SUCCESS,
} from "./consts";

const diseasesApi = new DiseasesApi(customConfiguration());

export const getAllDiseases =
  () =>
  (dispatch: Dispatch<IAction<DiseaseDTO[], {}>>): void => {
    dispatch({
      type: GET_DISEASES_LOADING,
    });
    diseasesApi.getAllDiseases().subscribe(
      (payload) => {
        dispatch({
          type: GET_DISEASES_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: GET_DISEASES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const getDiseasesOpd =
  () =>
  (dispatch: Dispatch<IAction<DiseaseDTO[], {}>>): void => {
    dispatch({
      type: GET_DISEASE_LOADING,
    });
    diseasesApi.getDiseasesOpd().subscribe(
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
    diseasesApi.getDiseasesIpdIn().subscribe(
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
    diseasesApi.getDiseasesIpdOut().subscribe(
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

export const createDisease =
  (diseaseDTO: DiseaseDTO) =>
  (dispatch: Dispatch<IAction<DiseaseDTO, {}>>): void => {
    dispatch({
      type: CREATE_DISEASE_LOADING,
    });
    diseasesApi.newDisease({ diseaseDTO }).subscribe(
      (payload) => {
        dispatch({
          type: CREATE_DISEASE_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_DISEASE_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const updateDisease =
  (diseaseDTO: DiseaseDTO) =>
  (dispatch: Dispatch<IAction<DiseaseDTO, {}>>): void => {
    dispatch({
      type: UPDATE_DISEASE_LOADING,
    });
    diseasesApi.updateDisease({ diseaseDTO }).subscribe(
      (payload) => {
        dispatch({
          type: UPDATE_DISEASE_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: UPDATE_DISEASE_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createDiseaseReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_DISEASE_RESET,
    });
  };

export const updateDiseaseReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_DISEASE_RESET,
    });
  };
