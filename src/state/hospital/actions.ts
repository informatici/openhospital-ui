import { Dispatch } from "redux";
import { HospitalDTO } from "../../generated";
import { HospitalControllerApi } from "../../generated/apis/HospitalControllerApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  GET_HOSPITAL_FAIL,
  GET_HOSPITAL_LOADING,
  GET_HOSPITAL_SUCCESS,
} from "./consts";

const hospitalControllerApi = new HospitalControllerApi(
  customConfiguration(false)
);

export const getHospital =
  () =>
  (dispatch: Dispatch<IAction<HospitalDTO, {}>>): void => {
    dispatch({
      type: GET_HOSPITAL_LOADING,
    });
    hospitalControllerApi.getHospitalUsingGET().subscribe(
      (payload) => {
        dispatch({
          type: GET_HOSPITAL_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: GET_HOSPITAL_FAIL,
          error: error?.response,
        });
      }
    );
  };
