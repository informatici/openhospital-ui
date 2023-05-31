import moment from "moment";
import { Dispatch } from "redux";
import {
  LaboratoryControllerApi,
  LaboratoryDTO,
  LabWithRowsDTO,
} from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  CREATE_LAB_FAIL,
  CREATE_LAB_LOADING,
  CREATE_LAB_RESET,
  CREATE_LAB_SUCCESS,
  CREATE_LAB_REQUEST_FAIL,
  CREATE_LAB_REQUEST_LOADING,
  CREATE_LAB_REQUEST_SUCCESS,
  DELETE_LAB_FAIL,
  DELETE_LAB_LOADING,
  DELETE_LAB_RESET,
  DELETE_LAB_SUCCESS,
  GET_LABS_FAIL,
  GET_LABS_LOADING,
  GET_LABS_RESET,
  GET_LABS_SUCCESS,
  GET_LABS_SUCCESS_EMPTY,
  GET_LABWROW_FAIL,
  GET_LABWROW_LOADING,
  GET_LABWROW_RESET,
  GET_LABWROW_SUCCESS,
  GET_LAB_FAIL,
  GET_LAB_LOADING,
  GET_LAB_RESET,
  GET_LAB_SUCCESS,
  GET_MATERIALS_FAIL,
  GET_MATERIALS_LOADING,
  GET_MATERIALS_SUCCESS,
  SEARCH_LAB_FAIL,
  SEARCH_LAB_LOADING,
  SEARCH_LAB_RESET,
  SEARCH_LAB_SUCCESS,
  SEARCH_LAB_SUCCESS_EMPTY,
  UPDATE_LAB_FAIL,
  UPDATE_LAB_LOADING,
  UPDATE_LAB_RESET,
  UPDATE_LAB_SUCCESS,
  CREATE_LAB_REQUEST_RESET,
  GET_LABS_REQUEST_LOADING,
  GET_LABS_REQUEST_SUCCESS,
  GET_LABS_REQUEST_SUCCESS_EMPTY,
  GET_LABS_REQUEST_FAIL,
  CANCEL_LAB_LOADING,
  CANCEL_LAB_SUCCESS,
  CANCEL_LAB_FAIL,
  CANCEL_LAB_RESET,
} from "./consts";

const labControllerApi = new LaboratoryControllerApi(customConfiguration());

export const createLab =
  (labWithRowsDTO: LabWithRowsDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_LAB_LOADING,
    });

    labControllerApi.newLaboratoryUsingPOST({ labWithRowsDTO }).subscribe(
      (payload) => {
        dispatch({
          type: CREATE_LAB_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_LAB_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createLabRequest =
  (laboratoryDTO: LaboratoryDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_LAB_REQUEST_LOADING,
    });

    labControllerApi.newExamRequestUsingPOST({ laboratoryDTO }).subscribe(
      (payload) => {
        dispatch({
          type: CREATE_LAB_REQUEST_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_LAB_REQUEST_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createLabRequestReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_LAB_REQUEST_RESET,
    });
  };

export const createLabReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_LAB_RESET,
    });
  };

export const updateLabStatus =
  (code: number, status: string) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_LAB_LOADING,
    });
    labControllerApi.updateExamRequestUsingPUT({ code, status }).subscribe(
      (payload) => {
        dispatch({
          type: UPDATE_LAB_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: UPDATE_LAB_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const updateLabStatusReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_LAB_RESET,
    });
  };

export const updateLabReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_LAB_RESET,
    });
  };

export const deleteLabReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_LAB_RESET,
    });
  };

export const cancelLabReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CANCEL_LAB_RESET,
    });
  };

export const searchLabsReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: SEARCH_LAB_RESET,
    });
  };

export const getLabsReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: GET_LABS_RESET,
    });
  };

export const getLabByCodeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: GET_LAB_RESET,
    });
  };

export const getLabWithRowsByCodeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: GET_LABWROW_RESET,
    });
  };

export const searchLabs =
  (query: any) =>
  (dispatch: Dispatch<IAction<LabWithRowsDTO[], {}>>): void => {
    dispatch({
      type: SEARCH_LAB_LOADING,
    });
    labControllerApi
      .getLaboratoryForPrintUsingGET({
        dateTo: query.dateTo ?? moment().add("-30", "days").toISOString(),
        dateFrom: query.dateFrom ?? moment().toISOString(),
        examName: query.examName,
        patientCode: !isNaN(query.patientCode) ? query.patientCode : undefined,
        status: query.status ?? undefined,
      })
      .subscribe(
        (payload) => {
          if (Array.isArray(payload) && payload.length > 0) {
            dispatch({
              type: SEARCH_LAB_SUCCESS,
              //to keep the method working since the api is not ready
              //has to be removed when the api is ready
              payload: payload.map((item) =>
                item.laboratoryDTO ? item : { laboratoryDTO: item }
              ),
            });
          } else {
            dispatch({
              type: SEARCH_LAB_SUCCESS_EMPTY,
              payload: [],
            });
          }
        },
        (error) => {
          dispatch({
            type: SEARCH_LAB_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const getLabsByPatientId =
  (patId: number | undefined) =>
  (dispatch: Dispatch<IAction<LabWithRowsDTO[], {}>>): void => {
    dispatch({
      type: GET_LABS_LOADING,
    });
    if (patId) {
      labControllerApi.getLaboratoryUsingGET({ patId }).subscribe(
        (payload) => {
          if (Array.isArray(payload) && payload.length > 0) {
            dispatch({
              type: GET_LABS_SUCCESS,
              //to keep the method working since the api is not ready
              //has to be removed when the api is ready
              payload: payload.map((item) =>
                item.laboratoryDTO ? item : { laboratoryDTO: item }
              ),
            });
          } else {
            dispatch({
              type: GET_LABS_SUCCESS_EMPTY,
              payload: [],
            });
          }
        },
        (error) => {
          dispatch({
            type: GET_LABS_FAIL,
            error: error?.response,
          });
        }
      );
    } else {
      dispatch({
        type: GET_LABS_FAIL,
        error: "The patient code should not be null",
      });
    }
  };

export const getLabsRequestByPatientId =
  (patId: number | undefined) =>
  (dispatch: Dispatch<IAction<LaboratoryDTO[], {}>>): void => {
    dispatch({
      type: GET_LABS_REQUEST_LOADING,
    });
    if (patId) {
      labControllerApi.getLaboratoryExamRequestUsingGET1({ patId }).subscribe(
        (payload) => {
          if (Array.isArray(payload) && payload.length > 0) {
            dispatch({
              type: GET_LABS_REQUEST_SUCCESS,
              payload: payload,
            });
          } else {
            dispatch({
              type: GET_LABS_REQUEST_SUCCESS_EMPTY,
              payload: [],
            });
          }
        },
        (error) => {
          dispatch({
            type: GET_LABS_REQUEST_FAIL,
            error: error?.response,
          });
        }
      );
    } else {
      dispatch({
        type: GET_LABS_REQUEST_FAIL,
        error: "The patient code should not be null",
      });
    }
  };

export const getLabByCode =
  (code: number | undefined) =>
  (dispatch: Dispatch<IAction<LaboratoryDTO, {}>>): void => {
    dispatch({
      type: GET_LAB_LOADING,
    });
    if (code) {
      labControllerApi.getLaboratoryByIdUsingGET({ code }).subscribe(
        (payload) => {
          dispatch({
            type: GET_LAB_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: GET_LAB_FAIL,
            error: error?.response,
          });
        }
      );
    } else {
      dispatch({
        type: GET_LAB_FAIL,
        error: "The laboratory exam code should not be null",
      });
    }
  };

export const getLabWithRowsByCode =
  (code: number | undefined) =>
  (dispatch: Dispatch<IAction<LabWithRowsDTO, {}>>): void => {
    dispatch({
      type: GET_LABWROW_LOADING,
    });
    if (code) {
      labControllerApi.getLabWithRowsByIdUsingGET({ code }).subscribe(
        (payload) => {
          dispatch({
            type: GET_LABWROW_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: GET_LABWROW_FAIL,
            error: error?.response,
          });
        }
      );
    } else {
      dispatch({
        type: GET_LABWROW_FAIL,
        error: "The laboratory exam code should not be null",
      });
    }
  };

export const getMaterials =
  () =>
  (dispatch: Dispatch<IAction<string[], {}>>): void => {
    dispatch({
      type: GET_MATERIALS_LOADING,
    });
    labControllerApi.getMaterialsUsingGET().subscribe(
      (payload) => {
        if (Array.isArray(payload) && payload.length > 0) {
          dispatch({
            type: GET_MATERIALS_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_MATERIALS_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_MATERIALS_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const updateLab =
  (code: number, labWithRowsDTO: LabWithRowsDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_LAB_LOADING,
    });
    labControllerApi
      .updateLaboratoryUsingPUT({ code, labWithRowsDTO })
      .subscribe(
        (payload) => {
          dispatch({
            type: UPDATE_LAB_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: UPDATE_LAB_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const deleteLab =
  (code: number | undefined) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_LAB_LOADING,
    });
    if (code) {
      labControllerApi.deleteExamUsingDELETE2({ code }).subscribe(
        () => {
          dispatch({
            type: DELETE_LAB_SUCCESS,
            payload: { code },
          });
        },
        (error) => {
          dispatch({
            type: DELETE_LAB_FAIL,
            error: error?.response,
          });
        }
      );
    } else {
      dispatch({
        type: DELETE_LAB_FAIL,
        error: "The code should not be empty",
      });
    }
  };

export const cancelLab =
  (code: number | undefined) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CANCEL_LAB_LOADING,
    });
    if (code) {
      labControllerApi.deleteExamRequestUsingDELETE({ code }).subscribe(
        () => {
          dispatch({
            type: CANCEL_LAB_SUCCESS,
            payload: { code },
          });
        },
        (error) => {
          dispatch({
            type: CANCEL_LAB_FAIL,
            error: error?.response,
          });
        }
      );
    } else {
      dispatch({
        type: CANCEL_LAB_FAIL,
        error: "The code should not be empty",
      });
    }
  };
