import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { PermissionDTO } from "../../generated";
import { PermissionsApi } from "../../generated/apis/PermissionsApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  GET_PERMISSION_FAIL,
  GET_PERMISSION_LOADING,
  GET_PERMISSION_SUCCESS,
} from "./consts";

const permissionsApi = new PermissionsApi(customConfiguration());

export const getAllPermissions =
  () =>
  (dispatch: Dispatch<IAction<PermissionDTO[], {}>>): void => {
    dispatch({
      type: GET_PERMISSION_LOADING,
    });
    permissionsApi.retrieveAllPermissions().subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_PERMISSION_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_PERMISSION_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_PERMISSION_FAIL,
          error: error?.response,
        });
      }
    );
  };
