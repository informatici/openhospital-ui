import isEmpty from "lodash.isempty";
import moment from "moment";
import { Dispatch } from "redux";
import { OpdDTO, OpdWithOperationRowDTO, PageOpdDTO } from "../../generated";
import { OpdsApi } from "../../generated/apis/OpdsApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";

import {
  CREATE_OPD_FAIL,
  CREATE_OPD_LOADING,
  CREATE_OPD_RESET,
  CREATE_OPD_SUCCESS,
  DELETE_OPD_FAIL,
  DELETE_OPD_LOADING,
  DELETE_OPD_RESET,
  DELETE_OPD_SUCCESS,
  GET_LAST_OPD_FAIL,
  GET_LAST_OPD_LOADING,
  GET_LAST_OPD_SUCCESS,
  GET_OPD_FAIL,
  GET_OPD_LOADING,
  GET_OPD_RESET,
  GET_OPD_SUCCESS,
  GET_OPD_SUCCESS_EMPTY,
  SEARCH_OPD_FAIL,
  SEARCH_OPD_LOADING,
  SEARCH_OPD_RESET,
  SEARCH_OPD_SUCCESS,
  SEARCH_OPD_SUCCESS_EMPTY,
  UPDATE_OPD_FAIL,
  UPDATE_OPD_LOADING,
  UPDATE_OPD_RESET,
  UPDATE_OPD_SUCCESS,
} from "./consts";

const opdsApi = new OpdsApi(customConfiguration());

/**
 *
 * @param opdDTO
 * @param operationRows the list of operations rows to save
 * @returns
 * @deprecated
 */

export const createOpd =
  (opdDTO: OpdDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_OPD_LOADING,
    });
    opdsApi.newOpd({ opdDTO }).subscribe(
      (payload) => {
        dispatch({
          type: CREATE_OPD_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_OPD_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createOpdWithOperationsRows =
  (opdWithOperationRowDTO: OpdWithOperationRowDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_OPD_LOADING,
    });
    opdsApi.newOpdWithOperationRow({ opdWithOperationRowDTO }).subscribe(
      (payload) => {
        dispatch({
          type: CREATE_OPD_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_OPD_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createOpdReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_OPD_RESET,
    });
  };

export const updateOpdReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_OPD_RESET,
    });
  };

export const getOpds =
  (code: number | undefined) =>
  (dispatch: Dispatch<IAction<OpdDTO[], {}>>): void => {
    dispatch({
      type: GET_OPD_LOADING,
    });

    if (code) {
      opdsApi
        .getOpdByPatient({
          pcode: code,
        })
        .subscribe(
          (payload) => {
            if (Array.isArray(payload) && payload.length > 0) {
              dispatch({
                type: GET_OPD_SUCCESS,
                payload: payload,
              });
            } else {
              dispatch({
                type: GET_OPD_SUCCESS_EMPTY,
                payload: [],
              });
            }
          },
          (error) => {
            dispatch({
              type: GET_OPD_FAIL,
              error,
            });
          }
        );
    } else {
      dispatch({
        type: GET_OPD_FAIL,
        error: "patient code should not be empty",
      });
    }
  };

export const getOpdsWithOperationRows =
  (code: number | undefined) =>
  (dispatch: Dispatch<IAction<OpdWithOperationRowDTO[], {}>>): void => {
    dispatch({
      type: GET_OPD_LOADING,
    });

    if (code) {
      opdsApi
        .getOpdByPatient({
          pcode: code,
        })
        .subscribe(
          (payload) => {
            //map the response object as the api is not ready
            // to be removed when the api will be ready
            if (Array.isArray(payload) && payload.length > 0) {
              dispatch({
                type: GET_OPD_SUCCESS,
                payload: payload.map((item) =>
                  item.opdDTO
                    ? item
                    : ({ opdDTO: item } as OpdWithOperationRowDTO)
                ),
              });
            } else {
              dispatch({
                type: GET_OPD_SUCCESS_EMPTY,
                payload: [],
              });
            }
          },
          (error) => {
            dispatch({
              type: GET_OPD_FAIL,
              error,
            });
          }
        );
    } else {
      dispatch({
        type: GET_OPD_FAIL,
        error: "patient code should not be empty",
      });
    }
  };

export const getLastOpd =
  (code: number | undefined) =>
  (dispatch: Dispatch<IAction<OpdDTO, {}>>): void => {
    dispatch({
      type: GET_LAST_OPD_LOADING,
    });

    if (code) {
      opdsApi
        .getLastOpd({
          patientCode: code,
        })
        .subscribe(
          (payload) => {
            dispatch({
              type: GET_LAST_OPD_SUCCESS,
              payload: payload,
            });
          },
          (error) => {
            dispatch({
              type: GET_LAST_OPD_FAIL,
              error,
            });
          }
        );
    } else {
      dispatch({
        type: GET_LAST_OPD_FAIL,
        error: "patient code should not be empty",
      });
    }
  };

export const searchOpds =
  (query: any) =>
  (dispatch: Dispatch<IAction<PageOpdDTO, {}>>): void => {
    dispatch({
      type: SEARCH_OPD_LOADING,
    });

    opdsApi
      .getOpdByDates({
        sex: query.sex,
        newPatient: query.newPatient,
        dateFrom: query.dateFrom ?? moment().add("-30", "days").toISOString(),
        dateTo: query.dateTo ?? moment().toISOString(),
        ageFrom: isNaN(query.ageFrom) ? null : query.ageFrom,
        ageTo: isNaN(query.ageTo) ? null : query.ageTo,
        diseaseCode: query.diseaseCode,
        diseaseTypeCode: query.diseaseTypeCode,
        patientCode: isNaN(query.patientCode) ? null : query.patientCode,
        wardCode: isEmpty(query.wardCode) ? null : query.wardCode,
        paged: false,
        page: isNaN(query.page) ? null : query.page,
        size: isNaN(query.size) ? null : query.size,
      })
      .subscribe(
        (payload) => {
          dispatch({
            type: SEARCH_OPD_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: SEARCH_OPD_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const getOpdsReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: GET_OPD_RESET,
    });
  };
export const searchOpdsReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: SEARCH_OPD_RESET,
    });
  };
/**
 *
 * @param code the code of the opd to be edited
 * @param opdDTO the opd payload
 * @returns
 * @deprecated
 */
export const updateOpd =
  (code: number, opdDTO: OpdDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_OPD_LOADING,
    });
    opdsApi.updateOpd({ code, opdDTO }).subscribe(
      (payload) => {
        dispatch({
          type: UPDATE_OPD_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: UPDATE_OPD_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const updateOpdWithOperationRows =
  (code: number, opdWithOperationRowDTO: OpdWithOperationRowDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_OPD_LOADING,
    });
    opdsApi
      .updateOpdWithOperationRow({ code, opdWithOperationRowDTO })
      .subscribe(
        (payload) => {
          dispatch({
            type: UPDATE_OPD_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: UPDATE_OPD_FAIL,
            error: error?.response,
          });
        }
      );
  };
export const deleteOpdReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_OPD_RESET,
    });
  };

export const deleteOpd =
  (code: number | undefined) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    if (code) {
      dispatch({
        type: DELETE_OPD_LOADING,
      });
      opdsApi.deleteOpd({ code }).subscribe(
        () => {
          dispatch({
            type: DELETE_OPD_SUCCESS,
            payload: code,
          });
        },
        (error) => {
          dispatch({
            type: DELETE_OPD_FAIL,
            error: error?.response,
          });
        }
      );
    } else {
      dispatch({
        type: DELETE_OPD_FAIL,
        error: "OPD code should not be empty",
      });
    }
  };
