import { TPermission } from "../../../types";

export interface IProps {
  // tabs
  config: TTabConfig;

  // if requested path is not valid, redirect to deafultRoute
  defaultRoute?: string;
}

export type TTabElement = {
  // if not set, doesn't check for permissions (assuming it's public)
  checkPermissions?: TPermission | TPermission[];

  // tab content
  content: JSX.Element;

  // tab label
  label: string;

  // url fragment to tab
  path?: string;
};

export type TTabConfig = TTabElement[];
