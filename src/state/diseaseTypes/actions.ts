import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import {
  Configuration,
  DiseaseControllerApi,
  DiseaseDTO,
  DiseaseTypeControllerApi,
  DiseaseTypeDTO,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import {
  GET_DISEASETYPE_FAIL,
  GET_DISEASETYPE_LOADING,
  GET_DISEASETYPE_SUCCESS,
} from "./consts";

const desaseTypeControllerApi = new DiseaseTypeControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
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
          error,
        });
      }
    );
  };
