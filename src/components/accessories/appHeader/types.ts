import { TUserCredentials } from "../../../state/main/types";

export type TBreadcrumbMap = Record<string, string>;

export interface IOwnProps {
  userCredentials: TUserCredentials;
  breadcrumbMap: TBreadcrumbMap;
}

export type TProps = IOwnProps;
