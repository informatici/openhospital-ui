import { TPermission } from "../../../types";

export interface IProps {
  config: TTabConfig;
  defaultRoute?: string;
}

export type TTabElement = {
  label: string;
  checkPermissions?: TPermission | TPermission[]; // if not set, doesn't check for permissions (assuming it's public)
  content: JSX.Element;
  path?: string;
};

export type TTabConfig = TTabElement[];
