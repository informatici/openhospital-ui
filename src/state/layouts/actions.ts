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
  encodeLayout,
  randomLayout,
  toolboxDashboards,
} from "../../components/accessories/dashboard/layouts/consts";
import { Layouts } from "react-grid-layout";
import { UserSettingDTO, UsersApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const userSettingsApi = new UsersApi(customConfiguration());

export const getLayouts =
  (user: string) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: GET_LAYOUTS_LOADING,
    });

    let layout: Layouts;
    let toolbox: Layouts;
    let savedConfig: string | undefined;

    userSettingsApi
      .getUserSettingByUser({ configName: "dashboard", userName: user })
      .subscribe(
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
              layout = {};
              toolbox = toolboxDashboards(layout, {});
            }
          } else {
            //layout = randomLayout(4);
            layout = {};
            toolbox = toolboxDashboards(layout, {});
          }

          if (!payload) {
            payload = {
              configName: "dashboard",
              configValue: encodeLayout({ layout, toolbox }),
              user,
            } as UserSettingDTO;
          } else {
            payload.configValue = encodeLayout({ layout, toolbox });
          }

          dispatch({
            type: GET_LAYOUTS_SUCCESS,
            payload: {
              layout,
              toolbox: toolboxDashboards(layout, toolbox),
              data: payload,
            },
          });
        },
        (error) => {
          // If dashboard customization is not found, init an empty
          // customization
          if (error.status === 404) {
            let layout: Layouts = {};
            let toolbox: Layouts = toolboxDashboards({}, {});
            let setting = {
              configName: "dashboard",
              configValue: encodeLayout({ layout, toolbox }),
              user,
            } as UserSettingDTO;

            dispatch({
              type: GET_LAYOUTS_SUCCESS,
              payload: {
                layout,
                toolbox,
                data: setting,
              },
            });
          } else {
            dispatch({
              type: GET_LAYOUTS_FAIL,
              error: error?.response,
            });
          }
        }
      );
  };

export const saveLayouts =
  (setting: UserSettingDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: SAVE_LAYOUTS_LOADING,
    });

    let saveUserRequest;

    if (setting.id > 0) {
      saveUserRequest = userSettingsApi.updateUserSettings({
        id: setting.id,
        userSettingDTO: setting,
      });
    } else {
      saveUserRequest = userSettingsApi.newUserSettings({
        userSettingDTO: setting,
      });
    }

    saveUserRequest.subscribe(
      (payload) => {
        let decodedConfig = decodeLayoutConfig(setting.configValue);

        dispatch({
          type: SAVE_LAYOUTS_SUCCESS,
          payload: { ...decodedConfig, data: payload },
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
