import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import {
  Configuration,
  DiseaseDTO,
  VisitsControllerApi,
  VisitDTO,
  WardDTO,
  PatientDTO,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { visitDataFormatter } from "../../libraries/formatUtils/dataFormatting";
import { IAction } from "../types";
import {
  CREATE_VISIT_RESET,
  CREATE_VISIT_LOADING,
  CREATE_VISIT_SUCCESS,
  CREATE_VISIT_FAIL,
  GET_VISIT_FAIL,
  GET_VISIT_LOADING,
  GET_VISIT_SUCCESS,
  GET_VISIT_SUCCESS_EMPTY,
  UPDATE_VISIT_LOADING,
  UPDATE_VISIT_SUCCESS,
  UPDATE_VISIT_FAIL,
  UPDATE_VISIT_RESET,
  DELETE_VISIT_LOADING,
  DELETE_VISIT_SUCCESS,
  DELETE_VISIT_FAIL,
  DELETE_VISIT_RESET,
  DELETE_VISITS_RESET,
  DELETE_VISITS_SUCCESS,
  DELETE_VISITS_LOADING,
  DELETE_VISITS_FAIL,
} from "./consts";

const visitsControllerApi = new VisitsControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

export const createVisit =
  (
    visitValues: Record<string, any>,
    patients: PatientDTO[] | undefined,
    wards: WardDTO[] | undefined
  ) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_VISIT_LOADING,
    });
    const newVisit = visitDataFormatter(visitValues, patients, wards);
    visitsControllerApi.newVisitUsingPOST({ newVisit }).subscribe(
      () => {
        dispatch({
          type: CREATE_VISIT_SUCCESS,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_VISIT_FAIL,
          error,
        });
      }
    );
  };

export const createVisitReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_VISIT_RESET,
    });
  };

export const updateVisitReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_VISIT_RESET,
    });
  };

export const getVisits =
  (code: number) =>
  (dispatch: Dispatch<IAction<VisitDTO[], {}>>): void => {
    dispatch({
      type: GET_VISIT_LOADING,
    });
    visitsControllerApi
      .getVisitUsingGET({
        patID: code,
      })
      .subscribe(
        (payload) => {
          if (typeof payload === "object" && !isEmpty(payload)) {
            dispatch({
              type: GET_VISIT_SUCCESS,
              payload: [payload],
            });
          } else {
            dispatch({
              type: GET_VISIT_SUCCESS,
              payload: [],
            });
          }
        },
        (error) => {
          dispatch({
            type: GET_VISIT_FAIL,
            error,
          });
        }
      );
  };

export const updateVisit =
  (
    visitID: number,
    visitValues: Record<string, any>,
    patients: PatientDTO[] | undefined,
    wards: WardDTO[] | undefined
  ) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_VISIT_LOADING,
    });
    const updateVisit = visitDataFormatter(visitValues, patients, wards);
    visitsControllerApi.updateVisitUsingPUT({ visitID, updateVisit }).subscribe(
      () => {
        dispatch({
          type: UPDATE_VISIT_SUCCESS,
        });
      },
      (error) => {
        dispatch({
          type: UPDATE_VISIT_FAIL,
          error,
        });
      }
    );
  };
export const deleteVisitReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_VISIT_RESET,
    });
  };

export const deleteVisit =
  (visitID: number | undefined) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    if (visitID) {
      dispatch({
        type: DELETE_VISIT_LOADING,
      });
      visitsControllerApi.deleteVisitUsingDELETE({ visitID }).subscribe(
        () => {
          dispatch({
            type: DELETE_VISIT_SUCCESS,
          });
        },
        (error) => {
          dispatch({
            type: DELETE_VISIT_FAIL,
            error,
          });
        }
      );
    } else {
      dispatch({
        type: DELETE_VISIT_FAIL,
        error: "Visit code should not be empty",
      });
    }
  };

export const deleteVisitsReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_VISITS_RESET,
    });
  };

export const deleteVisits =
  (patID: number | undefined) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    if (patID) {
      dispatch({
        type: DELETE_VISITS_LOADING,
      });
      visitsControllerApi
        .deleteVisitsRelatedToPatientUsingDELETE({ patID })
        .subscribe(
          () => {
            dispatch({
              type: DELETE_VISITS_SUCCESS,
            });
          },
          (error) => {
            dispatch({
              type: DELETE_VISITS_FAIL,
              error,
            });
          }
        );
    } else {
      dispatch({
        type: DELETE_VISITS_FAIL,
        error: "Patient code should not be empty",
      });
    }
  };
