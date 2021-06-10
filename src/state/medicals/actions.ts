import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import {
  Configuration,
  GetMedicalsUsingGETSortByEnum,
  MedicalControllerApi,
  MedicalDTO,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import {
  GET_MEDICAL_FAIL,
  GET_MEDICAL_LOADING,
  GET_MEDICAL_SUCCESS,
} from "./consts";

const medicalControllerApi = new MedicalControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

export const getMedicals =
  () =>
  (dispatch: Dispatch<IAction<MedicalDTO[], {}>>): void => {
    dispatch({
      type: GET_MEDICAL_LOADING,
    });
    medicalControllerApi
      .getMedicalsUsingGET({
        sortBy: GetMedicalsUsingGETSortByEnum.NAME,
      })
      .subscribe(
        (payload) => {
          if (typeof payload === "object" && !isEmpty(payload)) {
            dispatch({
              type: GET_MEDICAL_SUCCESS,
              payload: payload,
            });
          } else {
            dispatch({
              type: GET_MEDICAL_SUCCESS,
              payload: [],
            });
          }
        },
        (error) => {
          dispatch({
            type: GET_MEDICAL_FAIL,
            error,
          });
        }
      );
  };
