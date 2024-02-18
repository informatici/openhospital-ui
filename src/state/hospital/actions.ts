import { Dispatch } from "redux";
import { HospitalDTO } from "../../generated";
import { HospitalsApi } from "../../generated/apis/HospitalsApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  GET_HOSPITAL_FAIL,
  GET_HOSPITAL_LOADING,
  GET_HOSPITAL_SUCCESS,
} from "./consts";

const hospitalsApi = new HospitalsApi(customConfiguration(false));

export const getHospital =
  () =>
  (dispatch: Dispatch<IAction<HospitalDTO, {}>>): void => {
    dispatch({
      type: GET_HOSPITAL_LOADING,
    });
    hospitalsApi.getHospital().subscribe(
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
