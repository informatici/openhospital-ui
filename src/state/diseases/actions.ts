import { format } from "date-fns";
import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import {
  Configuration,
  DiseaseControllerApi,
  DiseaseDTO,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import {
  GET_DISEASE_FAIL,
  GET_DISEASE_LOADING,
  GET_DISEASE_SUCCESS,
} from "./consts";

const desaseControllerApi = new DiseaseControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

export const getDiseasesOpd =
  () =>
  (dispatch: Dispatch<IAction<DiseaseDTO[], {}>>): void => {
    dispatch({
      type: GET_DISEASE_LOADING,
    });
    desaseControllerApi.getDiseasesOpdUsingGET().subscribe(
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
          error,
        });
      }
    );
  };
