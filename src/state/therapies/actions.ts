import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import {
  Configuration,
  TherapyControllerApi,
  TherapyRowDTO,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import {
  CREATE_THERAPY_FAIL,
  CREATE_THERAPY_LOADING,
  CREATE_THERAPY_RESET,
  CREATE_THERAPY_SUCCESS,
  SEARCH_THERAPY_FAIL,
  SEARCH_THERAPY_LOADING,
  SEARCH_THERAPY_SUCCESS,
} from "./consts";

const therapyControllerApi = new TherapyControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

export const createTherapy =
  (thRowDTO: TherapyRowDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_THERAPY_LOADING,
    });

    therapyControllerApi.newTherapyUsingPOST({ thRowDTO }).subscribe(
      (payload) => {
        dispatch({
          type: CREATE_THERAPY_SUCCESS,
          payload,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_THERAPY_FAIL,
          error,
        });
      }
    );
  };

export const createTherapyReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_THERAPY_RESET,
    });
  };

export const therapiesByPatientId =
  (codePatient: number) =>
  (dispatch: Dispatch<IAction<TherapyRowDTO[], {}>>): void => {
    dispatch({
      type: SEARCH_THERAPY_LOADING,
    });

    if (codePatient) {
      therapyControllerApi.getTherapyRowsUsingGET({ codePatient }).subscribe(
        (payload) => {
          if (typeof payload === "object" && !isEmpty(payload)) {
            dispatch({
              type: SEARCH_THERAPY_SUCCESS,
              payload: [payload],
            });
          } else {
            dispatch({
              type: SEARCH_THERAPY_SUCCESS,
              payload: [],
            });
          }
        },
        (error) => {
          dispatch({
            type: SEARCH_THERAPY_FAIL,
            error,
          });
        }
      );
    }
  };
