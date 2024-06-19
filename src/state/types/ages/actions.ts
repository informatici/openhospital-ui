import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { AgeTypeDTO, AgeTypesApi } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";
import { IAction } from "../../types";
import {
  GET_AGE_TYPES_FAIL,
  GET_AGE_TYPES_LOADING,
  GET_AGE_TYPES_SUCCESS,
  GET_AGE_TYPES_SUCCESS_EMPTY,
  UPDATE_AGE_TYPES_FAIL,
  UPDATE_AGE_TYPES_LOADING,
  UPDATE_AGE_TYPES_RESET,
  UPDATE_AGE_TYPES_SUCCESS,
} from "./consts";

const ageTypesApi = new AgeTypesApi(customConfiguration());

export const getAgeTypes =
  () =>
  (dispatch: Dispatch<IAction<AgeTypeDTO[], {}>>): void => {
    dispatch({
      type: GET_AGE_TYPES_LOADING,
    });
    ageTypesApi.getAllAgeTypes({}).subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_AGE_TYPES_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_AGE_TYPES_SUCCESS_EMPTY,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_AGE_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const updateAgeType =
  (updateAgeType: AgeTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_AGE_TYPES_LOADING,
    });
    ageTypesApi.updateAgeType({ ageTypeDTO: updateAgeType }).subscribe(
      (payload) => {
        dispatch({
          type: UPDATE_AGE_TYPES_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: UPDATE_AGE_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const updateAgeTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_AGE_TYPES_RESET,
    });
  };
