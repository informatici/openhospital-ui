import { Dispatch } from "redux";
import { IAction } from "../types";
import {
  GET_LAYOUTS_FAIL,
  GET_LAYOUTS_LOADING,
  GET_LAYOUTS_RESET,
  GET_LAYOUTS_SUCCESS,
  RESET_LAYOUTS_BREAKPOINT,
  RESET_LAYOUTS_RESET,
  RESET_LAYOUTS_SUCCESS,
  SAVE_LAYOUTS_FAIL,
  SAVE_LAYOUTS_LOADING,
  SAVE_LAYOUTS_RESET,
  SAVE_LAYOUTS_SUCCESS,
  SET_LAYOUTS_BREAKPOINT,
} from "./consts";
import {
  decodeLayoutConfig,
  randomLayout,
  toolboxDashboards,
} from "../../components/accessories/dashboard/layouts/consts";
import { Layouts } from "react-grid-layout";
import { UserSettingControllerApi, UserSettingDTO } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const userSettingControllerApi = new UserSettingControllerApi(
  customConfiguration()
);

export const getLayouts =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: GET_LAYOUTS_LOADING,
    });

    let layout: Layouts;
    let toolbox: Layouts;
    let savedConfig: string | undefined;

    userSettingControllerApi.getUserSettingDashboardUsingGET().subscribe(
      (payload) => {
        savedConfig = payload?.configValue;
        if (savedConfig && atob(savedConfig) !== null) {
          let decodedConfig = decodeLayoutConfig(savedConfig);
          if (decodedConfig) {
            layout = decodedConfig.layout;
            toolbox = toolboxDashboards(
              decodedConfig.layout,
              decodedConfig.toolbox
            );
          } else {
            layout = randomLayout(4);
            toolbox = toolboxDashboards(layout, {});
          }
        } else {
          layout = randomLayout(4);
          toolbox = toolboxDashboards(layout, {});
        }

        dispatch({
          type: GET_LAYOUTS_SUCCESS,
          payload: { layout, toolbox },
        });
      },
      (error) => {
        dispatch({
          type: GET_LAYOUTS_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const saveLayouts =
  (layoutConfig: string) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: SAVE_LAYOUTS_LOADING,
    });

    let setting: UserSettingDTO = {
      configName: "dashboard",
      configValue: layoutConfig,
    };

    userSettingControllerApi
      .newUserSettingUsingPOST({ userSettingDTO: setting })
      .subscribe(
        (payload) => {
          let decodedConfig = decodeLayoutConfig(layoutConfig);

          dispatch({
            type: SAVE_LAYOUTS_SUCCESS,
            payload: decodedConfig,
          });
        },
        (error) => {
          dispatch({
            type: SAVE_LAYOUTS_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const resetLayouts =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    /**
     * @todo Reset layout via API
     */
    dispatch({
      type: RESET_LAYOUTS_SUCCESS,
    });
  };

export const setBreakpoint =
  (breakpoint: string) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: SET_LAYOUTS_BREAKPOINT,
      payload: breakpoint,
    });
  };

export const breakpointReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: RESET_LAYOUTS_BREAKPOINT,
    });
  };

export const getLayoutsReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: GET_LAYOUTS_RESET,
    });
  };

export const saveLayoutsReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: SAVE_LAYOUTS_RESET,
    });
  };

export const resetLayoutsReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: RESET_LAYOUTS_RESET,
    });
  };
